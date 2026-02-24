import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <>
      {/* Back link */}
      <header className="app-header" style={{ textAlign: 'left', marginBottom: 0 }}>
        <Link to="/" className="back-link" aria-label="Back to Fast Image Compressor">
          ← Back to Fast Image Compressor
        </Link>
      </header>

      <main className="app-main policy-page">
        <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Privacy Policy</h1>
        <p className="policy-meta">Last updated: February 2026</p>

        <section className="policy-section">
          <h2>Overview</h2>
          <p>
            Fast Image Compressor ("we", "our", or "the site") is committed to protecting your
            privacy. This Privacy Policy explains how we handle information when you use our
            free online image compression service at{' '}
            <a href="https://fast-image-compressor.vercel.app" rel="noopener noreferrer">
              fast-image-compressor.vercel.app
            </a>.
          </p>
        </section>

        <section className="policy-section">
          <h2>No Image Uploads — Your Files Stay on Your Device</h2>
          <p>
            Fast Image Compressor performs all image compression <strong>entirely within your
            browser</strong> using the Web APIs (specifically the Canvas API and browser-image-compression
            library). <strong>Your images are never uploaded to any server.</strong> No image data,
            file names, or compressed outputs are transmitted over the internet or stored anywhere
            outside of your own device's temporary memory.
          </p>
          <p>
            When you close the browser tab, all compressed images are automatically discarded.
            We have no technical ability to access, view, or retain your images.
          </p>
        </section>

        <section className="policy-section">
          <h2>Information We Collect</h2>
          <p>We do <strong>not</strong> collect personally identifiable information (PII). However, like
          most websites, we may receive the following non-personal data automatically:</p>
          <ul>
            <li><strong>Browser type and version</strong> via standard HTTP request headers</li>
            <li><strong>General geographic region</strong> (country/city level, not precise location)</li>
            <li><strong>Pages visited and time spent</strong> via Google Analytics (if enabled)</li>
            <li><strong>Device type</strong> (desktop, mobile, tablet) for improving the UI</li>
          </ul>
          <p>This data is collected in aggregate and cannot be used to identify you personally.</p>
        </section>

        <section className="policy-section">
          <h2>Cookies and Local Storage</h2>
          <p>We use <strong>localStorage</strong> to remember your theme preference (dark/light mode)
          between sessions. This is stored locally in your browser and is never sent to us.</p>
          <p>
            We use <strong>Google AdSense</strong> to display advertisements on this site. AdSense
            may use cookies to serve ads based on your prior visits to this website or other websites.
            You can opt out of personalised advertising by visiting{' '}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
              Google's Ad Settings
            </a>. For more information about how Google uses data when you use our site, visit{' '}
            <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">
              Google's Privacy & Terms
            </a>.
          </p>
        </section>

        <section className="policy-section">
          <h2>Google AdSense</h2>
          <p>
            This website uses Google AdSense, a service provided by Google LLC, to display
            advertisements. AdSense uses the DoubleClick cookie to serve more relevant ads to
            users and to measure and improve the effectiveness of advertising campaigns.
          </p>
          <p>
            Third-party vendors, including Google, use cookies to serve ads based on a user's
            prior visits to our website or other websites. Users can opt out of personalised
            advertising by visiting <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">
            www.aboutads.info</a>.
          </p>
        </section>

        <section className="policy-section">
          <h2>Third-Party Services</h2>
          <p>We use the following third-party services:</p>
          <ul>
            <li>
              <strong>Google AdSense</strong> — Advertising service by Google LLC. See{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                Google Privacy Policy
              </a>.
            </li>
            <li>
              <strong>Vercel</strong> — Hosting provider. Vercel may log standard server-side
              access logs (IP address, request time, browser). See{' '}
              <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
                Vercel Privacy Policy
              </a>.
            </li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>Children's Privacy</h2>
          <p>
            Fast Image Compressor is not directed to children under the age of 13. We do not
            knowingly collect any personal information from children. If you are a parent or
            guardian and believe your child has provided us with personal information, please
            contact us and we will take steps to delete such information.
          </p>
        </section>

        <section className="policy-section">
          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be reflected by
            updating the "Last updated" date at the top of this page. Continued use of the site
            after any changes constitutes your acceptance of the new policy.
          </p>
        </section>

        <section className="policy-section">
          <h2>Contact</h2>
          <p>
            If you have any questions about this Privacy Policy or your data, you can reach us at:{' '}
            <a href="mailto:privacy@fast-image-compressor.com">privacy@fast-image-compressor.com</a>
          </p>
        </section>
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-links">
            <span>© {new Date().getFullYear()} Fast Image Compressor</span>
            <span className="footer-dot">·</span>
            <Link to="/">Home</Link>
            <span className="footer-dot">·</span>
            <Link to="/privacy-policy">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export default PrivacyPolicy;
