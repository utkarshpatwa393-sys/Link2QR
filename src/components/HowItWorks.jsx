import React from 'react';
import { Link2, Cpu, Smartphone, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      stepNumber: '01',
      title: 'Paste Your Link',
      description: 'Enter the website or URL you want to share.',
      icon: Link2,
      accentColor: 'indigo'
    },
    {
      stepNumber: '02',
      title: 'Generate QR',
      description: 'Click the Generate QR button and your QR code will be created instantly.',
      icon: Cpu,
      accentColor: 'cyan'
    },
    {
      stepNumber: '03',
      title: 'Scan & Open',
      description: 'Scan the QR code using your phone camera and the original link will open.',
      icon: Smartphone,
      accentColor: 'emerald'
    }
  ];

  return (
    <section className="section-container how-it-works-section" id="how-it-works">
      <div className="section-header">
        <div className="section-badge">
          <CheckCircle2 size={14} />
          <span>Simple Workflow</span>
        </div>
        <h2 className="section-title">How It Works</h2>
        <p className="section-subtitle">
          Three effortless steps to convert any URL into a universal scannable code.
        </p>
      </div>

      <div className="steps-container">
        {steps.map((step, index) => {
          const IconComponent = step.icon;
          return (
            <div key={step.stepNumber} className="step-card">
              <div className="step-top-row">
                <div className={`step-icon-box step-accent-${step.accentColor}`}>
                  <IconComponent size={24} />
                </div>
                <span className="step-number-pill">STEP {step.stepNumber}</span>
              </div>

              <h3 className="step-card-title">{step.title}</h3>
              <p className="step-card-desc">{step.description}</p>

              {/* Connecting line connector for desktop */}
              {index < steps.length - 1 && (
                <div className="step-connector" aria-hidden="true">
                  <ArrowRight size={18} className="connector-arrow" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
