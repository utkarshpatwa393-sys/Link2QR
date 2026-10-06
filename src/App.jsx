import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import QRGenerator from './components/QRGenerator';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import RecentHistory from './components/RecentHistory';
import AboutSection from './components/AboutSection';
import AboutModal from './components/AboutModal';
import Footer from './components/Footer';
import Toast from './components/Toast';
import { 
  getStoredHistory, 
  saveToHistory, 
  removeHistoryItem, 
  clearAllHistory, 
  getStoredTheme, 
  saveThemePreference 
} from './utils/storage';
import './styles/App.css';

export default function App() {
  // Theme State
  const [darkMode, setDarkMode] = useState(() => getStoredTheme() === 'dark');
  // History State
  const [history, setHistory] = useState(() => getStoredHistory());
  // Selected URL to load into generator
  const [selectedUrlForGen, setSelectedUrlForGen] = useState('');
  // About / Privacy Modal State
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  // Toast State
  const [toast, setToast] = useState(null);

  // Sync dark mode class with DOM and localStorage
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      saveThemePreference('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
      saveThemePreference('light');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  // Toast helper
  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Handle Saving to Recent History
  const handleSaveHistory = (url, color) => {
    const updated = saveToHistory(url, color);
    setHistory(updated);
  };

  // Handle History Item Delete
  const handleDeleteHistoryItem = (id) => {
    const updated = removeHistoryItem(id);
    setHistory(updated);
    showToast('Removed item from history', 'info');
  };

  // Handle Clear All History
  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear your recent QR history?')) {
      const updated = clearAllHistory();
      setHistory(updated);
      showToast('History cleared successfully', 'info');
    }
  };

  // Handle Selecting URL from History
  const handleSelectHistoryUrl = (url) => {
    setSelectedUrlForGen(url);
    // Smooth scroll to hero / generator
    const heroElem = document.getElementById('hero');
    if (heroElem) {
      heroElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="app-layout">
      {/* Header */}
      <Header
        darkMode={darkMode}
        onToggleTheme={toggleTheme}
        onOpenAbout={() => setIsAboutModalOpen(true)}
        historyCount={history.length}
      />

      {/* Main Content Sections */}
      <main className="main-content">
        {/* Hero & QR Generator Section */}
        <QRGenerator
          initialUrl={selectedUrlForGen}
          onSaveHistory={handleSaveHistory}
          onShowToast={showToast}
        />

        {/* How It Works Section */}
        <HowItWorks />

        {/* Features Section */}
        <Features />

        {/* Recent History Section */}
        <RecentHistory
          history={history}
          onSelectUrl={handleSelectHistoryUrl}
          onDeleteItem={handleDeleteHistoryItem}
          onClearHistory={handleClearHistory}
          onShowToast={showToast}
        />

        {/* About & Privacy Section */}
        <AboutSection onOpenModal={() => setIsAboutModalOpen(true)} />
      </main>

      {/* Footer */}
      <Footer
        onOpenAbout={() => setIsAboutModalOpen(true)}
        onOpenPrivacy={() => setIsAboutModalOpen(true)}
      />

      {/* Modal Dialog */}
      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />

      {/* Floating Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
