import React, { useRef, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { 
  Download, 
  Copy, 
  Check, 
  RefreshCw, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles,
  Smartphone
} from 'lucide-react';
import { downloadQrCodeImage, copyTextToClipboard } from '../utils/downloadHelper';

export default function QRResult({ 
  url, 
  qrColor = '#0f172a', 
  onGenerateNew, 
  onShowToast 
}) {
  const canvasRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState('');
  const [copyError, setCopyError] = useState('');

  // Handle Download QR
  const handleDownload = async () => {
    setDownloadError('');
    setDownloading(true);
    try {
      // Find the canvas element inside the container
      const canvas = canvasRef.current?.querySelector('canvas');
      if (!canvas) {
        throw new Error('QR canvas element not ready');
      }

      await downloadQrCodeImage(canvas, 'link2qr-code.png');
      if (onShowToast) {
        onShowToast('QR Code downloaded successfully!', 'success');
      }
    } catch (err) {
      console.error(err);
      setDownloadError('Unable to download the QR code.');
      if (onShowToast) {
        onShowToast('Unable to download the QR code.', 'error');
      }
    } finally {
      setDownloading(false);
    }
  };

  // Handle Copy Link
  const handleCopyLink = async () => {
    setCopyError('');
    try {
      await copyTextToClipboard(url);
      setCopied(true);
      if (onShowToast) {
        onShowToast('Link copied to clipboard!', 'success');
      }
      setTimeout(() => {
        setCopied(false);
      }, 2500);
    } catch (err) {
      console.error(err);
      setCopyError('Unable to copy the link.');
      if (onShowToast) {
        onShowToast('Unable to copy the link.', 'error');
      }
    }
  };

  return (
    <div className="qr-result-container animate-fade-in" id="qr-result-section">
      <div className="qr-result-card">
        {/* Success Header Status */}
        <div className="qr-success-badge">
          <Sparkles size={16} className="badge-sparkle" />
          <span>QR Code Ready to Scan</span>
        </div>

        {/* QR Code Canvas Box */}
        <div className="qr-canvas-wrapper" ref={canvasRef}>
          <div className="qr-canvas-box">
            <QRCodeCanvas
              value={url}
              size={280}
              level="H" // High error correction for robust mobile scanning
              bgColor="#FFFFFF"
              fgColor={qrColor}
              includeMargin={true}
              marginSize={3}
            />
          </div>
        </div>

        {/* Scan instruction indicator */}
        <div className="scan-instruction">
          <Smartphone size={16} className="scan-icon" />
          <span>Scan with any phone camera to open original link directly</span>
        </div>

        {/* URL Display below QR */}
        <div className="qr-url-card">
          <div className="qr-url-label">Encoded Destination URL:</div>
          <div className="qr-url-value-row">
            <span className="qr-url-text" title={url}>
              {url}
            </span>
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="open-link-icon-btn"
              title="Open link in new tab"
              aria-label="Open link in new tab"
            >
              <ExternalLink size={16} />
            </a>
          </div>
        </div>

        {/* Error Messages */}
        {downloadError && (
          <div className="alert-box error-alert" role="alert">
            {downloadError}
          </div>
        )}
        {copyError && (
          <div className="alert-box error-alert" role="alert">
            {copyError}
          </div>
        )}

        {/* Action Buttons */}
        <div className="qr-actions-grid">
          {/* Download Button */}
          <button
            type="button"
            id="download-qr-btn"
            className="action-btn download-btn"
            onClick={handleDownload}
            disabled={downloading}
          >
            <Download size={18} />
            <span>{downloading ? 'Downloading...' : 'Download QR'}</span>
          </button>

          {/* Copy Link Button */}
          <button
            type="button"
            id="copy-link-btn"
            className={`action-btn copy-btn ${copied ? 'btn-copied' : ''}`}
            onClick={handleCopyLink}
          >
            {copied ? (
              <>
                <Check size={18} className="copy-check-icon" />
                <span>Link copied!</span>
              </>
            ) : (
              <>
                <Copy size={18} />
                <span>Copy Link</span>
              </>
            )}
          </button>

          {/* Generate New Button */}
          <button
            type="button"
            id="generate-new-btn"
            className="action-btn generate-new-btn"
            onClick={onGenerateNew}
          >
            <RefreshCw size={18} />
            <span>Generate New</span>
          </button>
        </div>

        {/* Privacy verification footer */}
        <div className="qr-privacy-note">
          <ShieldCheck size={14} className="privacy-shield-icon" />
          <span>Encodes exact URL. No intermediate redirects or tracking.</span>
        </div>
      </div>
    </div>
  );
}
