import React, { useState } from 'react';
import { QrCode, Link2, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Header({ darkMode, onToggleTheme, onOpenAbout, historyCount = 0 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="site-header">
      <div className="header-container">
        {/* Brand Logo & Name */}
        <a href="#hero" className="brand-logo" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}>
          <div className="logo-icon-wrapper">
            <QrCode className="logo-qr-icon" size={22} />
            <Link2 className="logo-link-icon" size={13} />
          </div>
          <div className="brand-text-group">
            <span className="brand-name">Link<span className="brand-accent">2</span>QR</span>
            <span className="brand-badge">Fast & Private</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <button
            type="button"
            className="nav-link-btn"
            onClick={() => scrollToSection('hero')}
          >
            Home
          </button>
          <button
            type="button"
            className="nav-link-btn"
            onClick={() => scrollToSection('how-it-works')}
          >
            How It Works
          </button>
          <button
            type="button"
            className="nav-link-btn"
            onClick={() => scrollToSection('features')}
          >
            Features
          </button>
          <button
            type="button"
            className="nav-link-btn"
            onClick={() => scrollToSection('recent-history')}
          >
            History
            {historyCount > 0 && (
              <span className="nav-history-counter" title={`${historyCount} saved items`}>
                {historyCount}
              </span>
            )}
          </button>
          <button
            type="button"
            className="nav-link-btn"
            onClick={() => {
              if (onOpenAbout) onOpenAbout();
              else scrollToSection('about');
            }}
          >
            About
          </button>
        </nav>

        {/* Right Action Group */}
        <div className="header-actions">
          <ThemeToggle darkMode={darkMode} onToggle={onToggleTheme} />
          
          {/* Mobile Menu Button */}
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer" role="dialog" aria-modal="true">
          <nav className="mobile-nav-links">
            <button
              type="button"
              className="mobile-nav-item"
              onClick={() => scrollToSection('hero')}
            >
              Home
            </button>
            <button
              type="button"
              className="mobile-nav-item"
              onClick={() => scrollToSection('how-it-works')}
            >
              How It Works
            </button>
            <button
              type="button"
              className="mobile-nav-item"
              onClick={() => scrollToSection('features')}
            >
              Features
            </button>
            <button
              type="button"
              className="mobile-nav-item"
              onClick={() => scrollToSection('recent-history')}
            >
              History {historyCount > 0 && `(${historyCount})`}
            </button>
            <button
              type="button"
              className="mobile-nav-item"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenAbout) onOpenAbout();
                else scrollToSection('about');
              }}
            >
              About
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
