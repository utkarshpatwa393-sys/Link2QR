import React from 'react';
import { QrCode, Link2, Shield } from 'lucide-react';

export default function Footer({ onOpenAbout, onOpenPrivacy }) {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-top-row">
          <div className="footer-brand-column">
            <a href="#hero" className="brand-logo" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}>
              <div className="logo-icon-wrapper">
                <QrCode className="logo-qr-icon" size={20} />
                <Link2 className="logo-link-icon" size={12} />
              </div>
              <div className="brand-text-group">
                <span className="brand-name">Link<span className="brand-accent">2</span>QR</span>
              </div>
            </a>
            <p className="footer-tagline">
              Fast, privacy-friendly QR code generator for links and websites. 100% client-side.
            </p>
          </div>

          <div className="footer-links-column">
            <h4 className="footer-column-title">Navigation</h4>
            <ul className="footer-links-list">
              <li>
                <button type="button" className="footer-link-btn" onClick={() => scrollToSection('hero')}>
                  Home
                </button>
              </li>
              <li>
                <button type="button" className="footer-link-btn" onClick={() => scrollToSection('how-it-works')}>
                  How It Works
                </button>
              </li>
              <li>
                <button type="button" className="footer-link-btn" onClick={() => scrollToSection('features')}>
                  Why Link2QR
                </button>
              </li>
              <li>
                <button type="button" className="footer-link-btn" onClick={() => scrollToSection('recent-history')}>
                  Recent History
                </button>
              </li>
            </ul>
          </div>

          <div className="footer-links-column">
            <h4 className="footer-column-title">Information</h4>
            <ul className="footer-links-list">
              <li>
                <button 
                  type="button" 
                  className="footer-link-btn" 
                  onClick={() => {
                    if (onOpenAbout) onOpenAbout();
                    else scrollToSection('about');
                  }}
                >
                  About
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  className="footer-link-btn" 
                  onClick={() => {
                    if (onOpenPrivacy) onOpenPrivacy();
                    else scrollToSection('about');
                  }}
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom-divider" />

        <div className="footer-bottom-row">
          <p className="footer-copyright">
            © 2026 Link2QR. Simple. Fast. Private.
          </p>
          <div className="footer-security-badge">
            <Shield size={14} />
            <span>Zero server storage • Client-side only</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
