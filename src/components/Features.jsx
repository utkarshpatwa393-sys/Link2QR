import React from 'react';
import { 
  Zap, 
  UserX, 
  Sparkles, 
  ShieldCheck, 
  Download, 
  Smartphone
} from 'lucide-react';

export default function Features() {
  const featuresList = [
    {
      id: 1,
      title: 'Instant QR Generation',
      description: 'Generate QR codes within seconds with real-time browser rendering.',
      icon: Zap,
      badge: 'Lightning Fast'
    },
    {
      id: 2,
      title: 'No Sign Up',
      description: 'Users don’t need an account. Jump straight into creating scannable codes.',
      icon: UserX,
      badge: 'Zero Friction'
    },
    {
      id: 3,
      title: 'Free to Use',
      description: 'No payment required, no subscription limits, no watermarks attached.',
      icon: Sparkles,
      badge: '100% Free'
    },
    {
      id: 4,
      title: 'Privacy Friendly',
      description: 'Links are processed locally in the browser and never sent to a remote database.',
      icon: ShieldCheck,
      badge: 'Client-Side'
    },
    {
      id: 5,
      title: 'Download QR',
      description: 'Save high-resolution QR codes as clean PNG images ready to print or share.',
      icon: Download,
      badge: 'High DPI'
    },
    {
      id: 6,
      title: 'Mobile Friendly',
      description: 'Works smoothly on phones, tablets, and desktops with responsive design.',
      icon: Smartphone,
      badge: 'Universal'
    }
  ];

  return (
    <section className="section-container features-section" id="features">
      <div className="section-header">
        <div className="section-badge">
          <Sparkles size={14} />
          <span>Core Capabilities</span>
        </div>
        <h2 className="section-title">Why Use Link2QR?</h2>
        <p className="section-subtitle">
          Designed for simplicity, speed, and uncompromising user privacy.
        </p>
      </div>

      <div className="features-grid">
        {featuresList.map((item) => {
          const IconComponent = item.icon;
          return (
            <div key={item.id} className="feature-card">
              <div className="feature-card-header">
                <div className="feature-icon-wrapper">
                  <IconComponent size={22} />
                </div>
                <span className="feature-badge">{item.badge}</span>
              </div>
              <h3 className="feature-card-title">{item.title}</h3>
              <p className="feature-card-desc">{item.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
