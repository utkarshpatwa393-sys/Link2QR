import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Link2, 
  ArrowRight, 
  X, 
  AlertCircle, 
  Sparkles, 
  Palette, 
  Shield
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { validateUrl } from '../utils/urlValidator';
import QRResult from './QRResult';

// Curated QR code colors that guarantee strong camera contrast on white background
const COLOR_PRESETS = [
  { id: 'slate', name: 'Classic Dark', color: '#0f172a' },
  { id: 'indigo', name: 'Royal Indigo', color: '#3730a3' },
  { id: 'blue', name: 'Sapphire Blue', color: '#1d4ed8' },
  { id: 'emerald', name: 'Emerald', color: '#047857' },
  { id: 'purple', name: 'Deep Violet', color: '#6d28d9' }
];

export default function QRGenerator({ 
  initialUrl = '', 
  onSaveHistory, 
  onShowToast 
}) {
  const [inputUrl, setInputUrl] = useState(initialUrl);
  const [activeQrUrl, setActiveQrUrl] = useState('');
  const [selectedColor, setSelectedColor] = useState('#0f172a');
  const [errorMessage, setErrorMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const inputRef = useRef(null);

  // Core generation logic wrapped in useCallback
  const executeGenerate = useCallback((urlToUse, colorToUse = selectedColor) => {
    setErrorMessage('');
    const validation = validateUrl(urlToUse);

    if (!validation.isValid) {
      setErrorMessage(validation.error || 'Please enter a valid URL.');
      return;
    }

    setIsGenerating(true);
    setActiveQrUrl(validation.url);

    if (onSaveHistory) {
      onSaveHistory(validation.url, colorToUse);
    }

    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#4f46e5', '#06b6d4', '#10b981']
      });
    } catch {
      // Confetti is decorative
    }

    setIsGenerating(false);

    setTimeout(() => {
      const resultElem = document.getElementById('qr-result-section');
      if (resultElem && window.innerWidth < 768) {
        resultElem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 100);
  }, [selectedColor, onSaveHistory]);

  // Focus input field immediately on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const prevInitialUrlRef = useRef(initialUrl);

  // Sync when initialUrl prop changes from History click
  useEffect(() => {
    if (initialUrl && initialUrl !== prevInitialUrlRef.current) {
      prevInitialUrlRef.current = initialUrl;
      // Schedule generation without triggering synchronous render cascade
      queueMicrotask(() => {
        setInputUrl(initialUrl);
        executeGenerate(initialUrl);
      });
    }
  }, [initialUrl, executeGenerate]);

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    executeGenerate(inputUrl);
  };

  // Handle Key Down (Enter key)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeGenerate(inputUrl);
    }
  };

  // Clear input
  const handleClearInput = () => {
    setInputUrl('');
    setErrorMessage('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Handle "Generate New"
  const handleGenerateNew = () => {
    setActiveQrUrl('');
    setInputUrl('');
    setErrorMessage('');
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 50);
  };

  // Quick sample links for immediate testing
  const sampleLinks = [
    'https://google.com',
    'https://youtube.com',
    'https://github.com/utkarshpatwa393-sys',
    'https://example.com/page?id=123'
  ];

  return (
    <section className="hero-section" id="hero">
      {/* Background ambient lighting glow */}
      <div className="ambient-glow ambient-glow-left" />
      <div className="ambient-glow ambient-glow-right" />

      <div className="hero-container">
        {/* Top Hero Pill */}
        <div className="hero-pill-badge">
          <Sparkles size={15} className="hero-pill-icon" />
          <span>Instant • 100% Client-Side • Privacy-First</span>
        </div>

        {/* Large Heading */}
        <h1 className="hero-title">
          Turn Any Link Into a <span className="gradient-text">QR Code</span>
        </h1>

        {/* Subheading */}
        <p className="hero-subtitle">
          Paste your link, generate your QR code, and share it anywhere.
        </p>

        {/* Main Generator Card */}
        <div className="generator-card">
          <div className="generator-card-header">
            <h2 className="generator-card-title">Create Your QR Code</h2>
            <p className="generator-card-desc">
              Enter any valid web link to generate a high-resolution, scannable QR code.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="generator-form" noValidate>
            <div className="input-group-wrapper">
              <label htmlFor="url-input" className="input-label-sr">
                Enter your link
              </label>
              
              <div className={`input-field-container ${errorMessage ? 'input-error-state' : ''}`}>
                <div className="input-prefix-icon">
                  <Link2 size={20} />
                </div>

                <input
                  id="url-input"
                  ref={inputRef}
                  type="url"
                  className="url-input"
                  placeholder="Paste your URL here... (e.g. https://example.com)"
                  value={inputUrl}
                  onChange={(e) => {
                    setInputUrl(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  onKeyDown={handleKeyDown}
                  autoComplete="off"
                  spellCheck="false"
                  aria-invalid={!!errorMessage}
                  aria-describedby={errorMessage ? 'url-error-msg' : 'url-helper-text'}
                />

                {/* Clear input button */}
                {inputUrl.length > 0 && (
                  <button
                    type="button"
                    className="clear-input-btn"
                    onClick={handleClearInput}
                    aria-label="Clear input link"
                    title="Clear link"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Error Message Box */}
              {errorMessage && (
                <div 
                  id="url-error-msg" 
                  className="input-error-message animate-slide-down" 
                  role="alert"
                >
                  <AlertCircle size={16} className="error-icon" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </div>

            {/* Color Customization Bar */}
            <div className="color-picker-bar">
              <span className="color-picker-label">
                <Palette size={14} />
                QR Accent:
              </span>
              <div className="color-swatches" role="radiogroup" aria-label="QR Code Color">
                {COLOR_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    className={`color-swatch-btn ${selectedColor === preset.color ? 'active-swatch' : ''}`}
                    style={{ backgroundColor: preset.color }}
                    onClick={() => setSelectedColor(preset.color)}
                    title={preset.name}
                    aria-label={preset.name}
                    aria-checked={selectedColor === preset.color}
                    role="radio"
                  />
                ))}
              </div>
            </div>

            {/* Quick Test Samples */}
            <div className="sample-links-row">
              <span className="sample-label">Try example:</span>
              <div className="sample-chips">
                {sampleLinks.map((sample, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="sample-chip-btn"
                    onClick={() => {
                      setInputUrl(sample);
                      setErrorMessage('');
                      executeGenerate(sample);
                    }}
                  >
                    {sample.replace('https://', '')}
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Generate Button */}
            <button
              type="submit"
              id="generate-qr-btn"
              className="generate-submit-btn"
              disabled={isGenerating}
            >
              <Sparkles size={19} />
              <span>{isGenerating ? 'Generating...' : 'Generate QR'}</span>
              <ArrowRight size={18} className="btn-arrow" />
            </button>

            {/* Helper Text */}
            <p id="url-helper-text" className="generator-helper-text">
              <Shield size={14} className="helper-shield-icon" />
              Your link stays in your browser and is not uploaded to a server.
            </p>
          </form>
        </div>

        {/* Display Generated QR Result Card */}
        {activeQrUrl && (
          <QRResult
            url={activeQrUrl}
            qrColor={selectedColor}
            onGenerateNew={handleGenerateNew}
            onShowToast={onShowToast}
          />
        )}
      </div>
    </section>
  );
}
