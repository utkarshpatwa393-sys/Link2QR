import React from 'react';
import { Info, Shield, CheckCircle, Lock, Cpu, Sparkles } from 'lucide-react';

export default function AboutSection() {
  return (
    <section className="section-container about-section" id="about">
      <div className="about-card">
        <div className="about-grid">
          <div className="about-content">
            <div className="section-badge">
              <Info size={14} />
              <span>About Link2QR</span>
            </div>
            <h2 className="about-heading">
              Purely Client-Side, Completely Private.
            </h2>
            <p className="about-description">
              <strong>Link2QR</strong> is a simple browser-based QR code generator that allows users to convert any URL into a scannable QR code instantly.
            </p>

            <div className="about-highlights-list">
              <div className="about-highlight-item">
                <CheckCircle size={18} className="highlight-icon" />
                <div>
                  <strong>No Account Required</strong> — Generate unlimited codes instantly without signing up.
                </div>
              </div>
              <div className="about-highlight-item">
                <CheckCircle size={18} className="highlight-icon" />
                <div>
                  <strong>100% Free to Use</strong> — No paywalls, subscriptions, or hidden limits.
                </div>
              </div>
              <div className="about-highlight-item">
                <CheckCircle size={18} className="highlight-icon" />
                <div>
                  <strong>Client-Side QR Generation</strong> — URLs are encoded directly in your browser with zero server latency or data collection.
                </div>
              </div>
            </div>
          </div>

          <div className="about-privacy-box">
            <div className="privacy-box-header">
              <Shield size={24} className="privacy-box-icon" />
              <h3 className="privacy-box-title">Our Privacy Guarantee</h3>
            </div>
            <p className="privacy-box-text">
              When you generate a QR code with Link2QR, the link is processed exclusively in your device's browser memory using JavaScript. We do not store, log, or transmit your URLs to any external server.
            </p>
            <div className="privacy-meta-tags">
              <span className="privacy-tag"><Lock size={12} /> Zero Tracking</span>
              <span className="privacy-tag"><Cpu size={12} /> Local Memory</span>
              <span className="privacy-tag"><Sparkles size={12} /> Direct Destination</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
