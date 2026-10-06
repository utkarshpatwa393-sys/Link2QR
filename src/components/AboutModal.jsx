import React, { useEffect } from 'react';
import { X, ShieldCheck, Info, Check } from 'lucide-react';

export default function AboutModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop animate-fade-in" onClick={onClose}>
      <div 
        className="modal-content-card animate-scale-up" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="modal-header">
          <div className="modal-title-group">
            <div className="modal-icon-badge">
              <Info size={18} />
            </div>
            <h2 id="modal-title" className="modal-title">About Link2QR</h2>
          </div>
          <button 
            type="button" 
            className="modal-close-btn" 
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <p className="modal-lead-text">
            <strong>Link2QR</strong> is a simple browser-based QR code generator that allows users to convert any URL into a scannable QR code instantly.
          </p>

          <div className="modal-feature-list">
            <div className="modal-feature-row">
              <Check size={18} className="modal-check-icon" />
              <div>
                <strong>No Account Required:</strong> You can create and download QR codes right away without entering an email or password.
              </div>
            </div>
            <div className="modal-feature-row">
              <Check size={18} className="modal-check-icon" />
              <div>
                <strong>100% Free to Use:</strong> No credit card, no daily quotas, and zero watermark on your downloaded images.
              </div>
            </div>
            <div className="modal-feature-row">
              <Check size={18} className="modal-check-icon" />
              <div>
                <strong>Client-Side QR Generation:</strong> Everything happens securely inside your browser. No link data is sent to or stored on any server.
              </div>
            </div>
          </div>

          <div className="modal-privacy-card">
            <div className="modal-privacy-header">
              <ShieldCheck size={20} className="modal-privacy-icon" />
              <h3>Privacy & Direct Destination Guarantee</h3>
            </div>
            <p>
              When a phone scans a QR code created with Link2QR, it reads the original link directly. There are no intermediate redirect URLs, no analytics interceptors, and no tracking scripts.
            </p>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="action-btn download-btn modal-dismiss-btn" onClick={onClose}>
            Got It
          </button>
        </div>
      </div>
    </div>
  );
}
