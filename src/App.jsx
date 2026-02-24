import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
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
        <h1>⚡ Fast Image Compressor</h1>
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
            data-ad-slot="2894794324"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>

        <section aria-label="Image compression tool">
          <Compressor />
        </section>

        {/* ===== HOW IT WORKS ===== */}
        <section className="content-section" aria-label="How it works">
          <h2 className="section-title">How It Works</h2>
          <div className="how-steps">
            <div className="how-step">
              <div className="how-step-icon">📂</div>
              <h3>1. Upload Your Image</h3>
              <p>Drag and drop or click to select JPEG, PNG, or WebP images directly from your device. No file size limit.</p>
            </div>
            <div className="how-step">
              <div className="how-step-icon">⚙️</div>
              <h3>2. Set Quality</h3>
              <p>Use the quality slider to balance file size vs. visual quality. Choose auto mode for instant results or manual for full control.</p>
            </div>
            <div className="how-step">
              <div className="how-step-icon">⬇️</div>
              <h3>3. Download</h3>
              <p>Preview before and after, then download your compressed image. Repeat for as many images as you need — it's always free.</p>
            </div>
          </div>
        </section>

        {/* ===== FEATURES ===== */}
        <section className="content-section" aria-label="Features">
          <h2 className="section-title">Why Use Fast Image Compressor?</h2>
          <div className="features-grid">
            <article className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>100% Private</h3>
              <p>Your images never leave your device. All compression is done locally in your browser — no server, no cloud, no data collection.</p>
            </article>
            <article className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Instant Results</h3>
              <p>Compress in seconds. No waiting for uploads or server processing. Works entirely offline once the page loads.</p>
            </article>
            <article className="feature-card">
              <div className="feature-icon">🖼️</div>
              <h3>Multiple Formats</h3>
              <p>Supports JPEG, PNG, and WebP. Compress photos, screenshots, product images, and more with a single tool.</p>
            </article>
            <article className="feature-card">
              <div className="feature-icon">🎚️</div>
              <h3>Quality Control</h3>
              <p>Manual quality slider lets you choose your target file size precisely. See before/after previews before downloading.</p>
            </article>
            <article className="feature-card">
              <div className="feature-icon">📋</div>
              <h3>Compression History</h3>
              <p>All your compressed files stay available in session history so you can re-download any previous result without reprocessing.</p>
            </article>
            <article className="feature-card">
              <div className="feature-icon">💸</div>
              <h3>Completely Free</h3>
              <p>No sign-up. No subscription. No hidden limits. Use it as many times as you need, for personal or commercial projects.</p>
            </article>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="content-section" aria-label="Frequently asked questions">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faq-list">
            <details className="faq-item">
              <summary className="faq-question">Does compressing an image reduce its quality?</summary>
              <p className="faq-answer">Lossy compression (JPEG, WebP) reduces quality slightly to achieve smaller file sizes. Using the quality slider at 70–85% typically reduces file size by 60–80% with no visible quality difference to the human eye. PNG compression is lossless by nature.</p>
            </details>
            <details className="faq-item">
              <summary className="faq-question">Are my images uploaded to any server?</summary>
              <p className="faq-answer">No. All compression happens directly in your browser using the Web APIs. Your images never leave your device and are never sent to any server. This makes Fast Image Compressor completely private and safe for sensitive images.</p>
            </details>
            <details className="faq-item">
              <summary className="faq-question">What image formats are supported?</summary>
              <p className="faq-answer">We support JPEG (.jpg, .jpeg), PNG (.png), and WebP (.webp). These cover the vast majority of images used on websites, apps, and social media.</p>
            </details>
            <details className="faq-item">
              <summary className="faq-question">How much can I reduce an image's file size?</summary>
              <p className="faq-answer">Typically 50–80% reduction is achievable for JPEG and WebP images. PNG files vary more depending on content. Use the manual mode to set a specific target size in megabytes.</p>
            </details>
            <details className="faq-item">
              <summary className="faq-question">Is there a file size limit?</summary>
              <p className="faq-answer">No. There is no file size limit since processing happens locally on your device. Large files may take a few extra seconds to process depending on your device's performance.</p>
            </details>
            <details className="faq-item">
              <summary className="faq-question">Can I compress multiple images at once?</summary>
              <p className="faq-answer">Currently you can compress images one at a time, but each compressed output is saved in the history panel so you can work through multiple images quickly and download them all.</p>
            </details>
          </div>
        </section>

        {/* ===== ARTICLE: WHY IMAGE COMPRESSION MATTERS ===== */}
        <section className="content-section article-section" aria-label="Article about image compression">
          <h2 className="section-title">Why Image Compression Matters for Your Website</h2>
          <p className="article-body">
            Images are the single largest contributor to page weight on the modern web. According
            to HTTP Archive data, images account for over <strong>50% of the total bytes</strong> loaded
            by the average webpage. This has a direct and measurable impact on your site's loading
            speed, user experience, and search engine ranking.
          </p>

          <h3 className="article-subheading">The Impact on Core Web Vitals</h3>
          <p className="article-body">
            Google's Core Web Vitals — particularly <strong>Largest Contentful Paint (LCP)</strong> — are
            heavily affected by how quickly your hero images and above-the-fold content load. A large,
            unoptimised JPEG hero image can easily push your LCP beyond the 2.5-second threshold,
            which Google considers "poor". Compressing that same image to under 200 KB can bring
            LCP down to under 1 second, dramatically improving both your ranking and user retention.
          </p>

          <h3 className="article-subheading">Lossy vs. Lossless Compression: What's the Difference?</h3>
          <p className="article-body">
            <strong>Lossless compression</strong> reduces file size without discarding any image data. The
            decoded image is bit-for-bit identical to the original. PNG compression is always lossless.
            This is ideal for logos, icons, and screenshots where every pixel must be preserved.
          </p>
          <p className="article-body">
            <strong>Lossy compression</strong>, used by JPEG and WebP, permanently removes some image data
            — specifically the subtle colour variations that the human eye has difficulty perceiving.
            At a quality setting of 75–85%, files can be reduced by 60–80% with no visible quality
            difference in most photographs. Fast Image Compressor lets you choose your target file
            size and mode so you can find the right balance for your use case.
          </p>

          <h3 className="article-subheading">WebP: The Modern Format for Web Images</h3>
          <p className="article-body">
            WebP is an image format developed by Google that provides superior compression for both
            lossy and lossless images on the web. WebP lossy images are typically <strong>25–34% smaller</strong>
            than comparable JPEG images at equivalent visual quality. All modern browsers (Chrome,
            Firefox, Safari, Edge) now support WebP natively, making it an excellent choice for web
            delivery. This tool supports compressing WebP images directly.
          </p>

          <h3 className="article-subheading">Privacy-First Compression: How Browser-Side Processing Works</h3>
          <p className="article-body">
            Traditional online image compressors require you to upload your photos to their servers,
            where they are processed, temporarily stored, and then returned to you for download. This
            raises legitimate privacy concerns, especially for sensitive images such as personal
            photos, business documents, or medical scans.
          </p>
          <p className="article-body">
            Fast Image Compressor takes a fundamentally different approach. By using the browser's
            built-in <strong>Canvas API</strong> and Web Workers, your images are compressed entirely
            within your own device. No data is ever transmitted — your images never touch any server.
            This makes it safe to compress any image, regardless of its sensitivity, with complete
            confidence in your privacy.
          </p>

          <h3 className="article-subheading">Best Practices for Image Optimisation</h3>
          <ul className="article-list">
            <li><strong>Use the right format:</strong> JPEG for photographs, PNG for graphics with transparency, WebP for the best of both worlds on the web.</li>
            <li><strong>Resize before compressing:</strong> If an image will be displayed at 600px wide, there's no benefit to serving it at 4000px wide. Resize dimensions first.</li>
            <li><strong>Aim for under 200 KB</strong> for most web images. Thumbnails and icons should be under 50 KB.</li>
            <li><strong>Use descriptive filenames:</strong> Rename images to reflect their content (e.g., <code>compressed-product-photo.jpg</code>) for SEO benefit.</li>
            <li><strong>Consider lazy loading:</strong> Use <code>loading="lazy"</code> on <code>&lt;img&gt;</code> tags to defer off-screen images and further improve page speed.</li>
          </ul>
        </section>

        {/* ===== BOTTOM AD ===== */}
        <div className="ad-container ad-bottom">
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-1507750871956391"
            data-ad-slot="7240040507"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>

      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <p className="footer-privacy">🔒 Your images never leave your device. All processing happens locally in your browser.</p>
          <div className="footer-links">
            <span>© {new Date().getFullYear()} Fast Image Compressor</span>
            <span className="footer-dot">·</span>
            <span>Free to use</span>
            <span className="footer-dot">·</span>
            <span>No sign-up required</span>
            <span className="footer-dot">·</span>
            <Link to="/privacy-policy" className="footer-policy-link">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;