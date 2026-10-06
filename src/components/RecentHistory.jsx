import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { 
  History, 
  Trash2, 
  ArrowUpRight, 
  Clock, 
  ShieldCheck, 
  ExternalLink,
  Copy
} from 'lucide-react';
import { copyTextToClipboard } from '../utils/downloadHelper';

function formatTimestamp(isoString) {
  try {
    const date = new Date(isoString);
    const diffMs = Date.now() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  } catch {
    return 'Recently';
  }
}

export default function RecentHistory({ 
  history = [], 
  onSelectUrl, 
  onDeleteItem, 
  onClearHistory, 
  onShowToast 
}) {

  const handleCopyLink = async (url) => {
    try {
      await copyTextToClipboard(url);
      if (onShowToast) onShowToast('Link copied to clipboard!', 'success');
    } catch {
      if (onShowToast) onShowToast('Unable to copy the link.', 'error');
    }
  };

  if (history.length === 0) {
    return (
      <section className="section-container history-section" id="recent-history">
        <div className="section-header">
          <div className="section-badge">
            <History size={14} />
            <span>Local Activity</span>
          </div>
          <h2 className="section-title">Recent QR Codes</h2>
          <p className="section-subtitle">
            Your recently generated links will appear here for quick access.
          </p>
        </div>

        <div className="empty-history-card">
          <div className="empty-history-icon-box">
            <History size={32} />
          </div>
          <h3 className="empty-history-title">No recent QR codes yet</h3>
          <p className="empty-history-text">
            Generate your first QR code above. It will be stored locally in your browser for fast reuse.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="section-container history-section" id="recent-history">
      <div className="section-header-row">
        <div>
          <div className="section-badge">
            <History size={14} />
            <span>Local Activity</span>
          </div>
          <h2 className="section-title">Recent QR Codes</h2>
          <p className="section-subtitle">
            Your last 5 generated QR codes saved securely in your browser.
          </p>
        </div>

        <button
          type="button"
          className="clear-all-history-btn"
          onClick={onClearHistory}
          title="Clear all recent history"
        >
          <Trash2 size={16} />
          <span>Clear History</span>
        </button>
      </div>

      <div className="history-grid">
        {history.map((item) => (
          <div key={item.id} className="history-card">
            {/* Mini QR Thumbnail */}
            <div className="history-qr-thumb">
              <QRCodeCanvas
                value={item.url}
                size={64}
                level="M"
                bgColor="#FFFFFF"
                fgColor={item.color || '#0f172a'}
                includeMargin={true}
                marginSize={2}
              />
            </div>

            {/* History Details */}
            <div className="history-info">
              <div className="history-time-row">
                <Clock size={12} className="history-clock-icon" />
                <span className="history-time">{formatTimestamp(item.createdAt)}</span>
              </div>
              <div className="history-url" title={item.url}>
                {item.url}
              </div>

              {/* Action Buttons Row */}
              <div className="history-actions">
                <button
                  type="button"
                  className="history-action-btn generate-again-btn"
                  onClick={() => onSelectUrl(item.url)}
                  title="Generate this QR again"
                >
                  <ArrowUpRight size={14} />
                  <span>Generate Again</span>
                </button>

                <button
                  type="button"
                  className="history-icon-btn"
                  onClick={() => handleCopyLink(item.url)}
                  title="Copy link"
                  aria-label="Copy link"
                >
                  <Copy size={14} />
                </button>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="history-icon-btn"
                  title="Open in new tab"
                  aria-label="Open in new tab"
                >
                  <ExternalLink size={14} />
                </a>

                <button
                  type="button"
                  className="history-icon-btn delete-item-btn"
                  onClick={() => onDeleteItem(item.id)}
                  title="Remove from history"
                  aria-label="Remove from history"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="history-privacy-footer">
        <ShieldCheck size={14} className="privacy-shield-icon" />
        <span>Stored strictly in your local browser storage. Never uploaded to any server.</span>
      </div>
    </section>
  );
}
