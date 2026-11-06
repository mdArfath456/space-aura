import React from 'react';
import { useIndustry } from '../../hooks/useIndustry.jsx';
import '../../styles/process.css';

export default function Process() {
  const { currentIndustry } = useIndustry();
  const processSteps = currentIndustry.process;

  return (
    <section id="process" className="process-section">
      <div className="site-container">
        <div className="section-header">
          <span className="section-badge">Implementation Flow</span>
          <h2 className="section-title">How We Transform Your Environment.</h2>
          <p className="section-subtitle">
            A turnkey 3-stage methodology from baseline acoustic and telemetry diagnostic to turnkey prefabricated deployment and cloud optimization.
          </p>
        </div>

        <div className="process-steps-track">
          {processSteps.map((step) => (
            <div key={step.step} className="process-step-card">
              <div className="process-step-number-pill">
                <span>{step.step}</span>
              </div>
              <h3 className="process-step-title">{step.title}</h3>
              <p className="process-step-desc">{step.description}</p>
              {step.details && (
                <div className="process-step-details">
                  {step.details}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
