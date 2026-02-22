import React, { useEffect } from 'react';
import Compressor from './components/compressor';
import './App.css';

function App() {
  // Initialize AdSense ads after mount
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // AdSense not loaded (dev mode or blocker)
    }
  }, []);

  return (
    <>
      <header className="app-header">
        <h1>Lightning Fast Image Compressor</h1>
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
            data-ad-client="ca-pub-XXXXXXXXXX"
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