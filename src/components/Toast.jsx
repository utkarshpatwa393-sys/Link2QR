import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div className={`toast-notification animate-slide-up ${toast.type || 'info'}`} role="status">
      <div className="toast-icon">
        {isSuccess && <CheckCircle2 size={18} className="toast-success-icon" />}
        {isError && <AlertCircle size={18} className="toast-error-icon" />}
        {!isSuccess && !isError && <Info size={18} className="toast-info-icon" />}
      </div>
      <div className="toast-message">{toast.message}</div>
      <button 
        type="button" 
        className="toast-close-btn" 
        onClick={onClose}
        aria-label="Dismiss notification"
      >
        <X size={14} />
      </button>
    </div>
  );
}
