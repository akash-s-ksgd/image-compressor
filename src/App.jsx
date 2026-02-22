import React, { useEffect, useState, useCallback, useRef } from 'react';
import Compressor from './components/compressor';
import './App.css';

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  const cursorRingRef = useRef(null);
  const cursorDotRef = useRef(null);

  // Apply theme to DOM
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Custom cursor
  useEffect(() => {
    const ring = cursorRingRef.current;
    const dot = cursorDotRef.current;
    if (!ring || !dot) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
      ring.classList.add('visible');
      dot.classList.add('visible');
    };

    const onMouseLeave = () => {
      ring.classList.remove('visible');
      dot.classList.remove('visible');
    };

    const onMouseOver = (e) => {
      const tag = e.target.tagName;
      const isInteractive = tag === 'BUTTON' || tag === 'A' || tag === 'INPUT' ||
        e.target.classList.contains('dropzone') || e.target.closest('.dropzone') ||
        e.target.classList.contains('mode-btn') || e.target.classList.contains('history-download-btn');
      if (isInteractive) {
        ring.classList.add('hover');
      } else {
        ring.classList.remove('hover');
      }
    };

    // Smooth ring follow with requestAnimationFrame
    let animId;
    const animate = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      animId = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseover', onMouseOver);
    animId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Initialize AdSense ads after mount
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // AdSense not loaded (dev mode or blocker)
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  return (
    <>
      {/* Custom Cursor */}
      <div ref={cursorRingRef} className="cursor-ring" />
      <div ref={cursorDotRef} className="cursor-dot" />

      {/* Theme Toggle */}
      <button
        className="theme-toggle-btn"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        <span className="theme-icon">
          {theme === 'dark' ? '☀️' : '🌙'}
        </span>
      </button>

      <header className="app-header">
        <h1>⚡ Lightning Fast Image Compressor</h1>
        <p className="subtitle">
          Compress JPEG, PNG &amp; WebP images for free — directly in your browser. 100% private, no uploads.
        </p>
      </header>

      <main className="app-main">
        {/* Banner Ad */}
        <div className="ad-container ad-banner">
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-1507750871956391"
            data-ad-slot="XXXXXXXXXX"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>

        <section aria-label="Image compression tool">
          <Compressor />
        </section>
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <p className="footer-privacy">🔒 Your images never leave your device. All processing happens locally in your browser.</p>
          <div className="footer-links">
            <span>© {new Date().getFullYear()} Lightning Compressor</span>
            <span className="footer-dot">·</span>
            <span>Free to use</span>
            <span className="footer-dot">·</span>
            <span>No sign-up required</span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;