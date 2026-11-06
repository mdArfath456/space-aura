import React from 'react';
import { ShieldCheck, Award, Zap, Clock } from 'lucide-react';
import { useIndustry } from '../../hooks/useIndustry.jsx';
import '../../styles/testimonials.css';

export default function Testimonials() {
  const { currentIndustry } = useIndustry();
  const testimonials = currentIndustry.testimonials;

  const trustBadges = [
    { icon: <ShieldCheck size={24} />, title: '10-Year Structural Guarantee', desc: 'Commercial heavy-duty warranty on frames and acoustic panels.' },
    { icon: <Award size={24} />, title: 'ISO 23351-1 Certified', desc: 'Independently lab tested for speech level reduction class A.' },
    { icon: <Zap size={24} />, title: 'Zero Disruptive Downtime', desc: 'Rapid off-hours modular deployment without drywall dust.' },
    { icon: <Clock size={24} />, title: '24/7 Telemetry Diagnostics', desc: 'Continuous environmental monitoring and proactive filter service.' },
  ];

  const partnerLogos = [
    'VERITAS CAPITAL',
    'MERIDIAN ARCHITECTS',
    'NOVUS BIOTECH',
    'AERO DYNAMICS',
    'VANGUARD CORP',
    'KINETIC LABS',
  ];

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="site-container">
        {/* Trust & Service Commitments */}
        <div className="trust-badges-bar">
          {trustBadges.map((badge, i) => (
            <div key={i} className="trust-badge-item">
              <div className="trust-badge-icon">{badge.icon}</div>
              <div>
                <div className="trust-badge-title">{badge.title}</div>
                <div className="trust-badge-desc">{badge.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Partner Logos */}
        <div className="partner-logos-grid" aria-label="Enterprise Client Roster">
          {partnerLogos.map((logo, i) => (
            <span key={i} className="partner-logo-cell">{logo}</span>
          ))}
        </div>

        {/* Section Header */}
        <div className="section-header">
          <span className="section-badge">Client Validation</span>
          <h2 className="section-title">Trusted by Workplace Leaders.</h2>
          <p className="section-subtitle">
            Read what corporate real estate directors and facility architects say about our spatial engineering.
          </p>
        </div>

        {/* Testimonials Cards */}
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card">
              <p className="testimonial-quote">"{t.quote}"</p>

              <div className="testimonial-author-block">
                <div className="testimonial-avatar">
                  {t.author.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <div className="author-name">{t.author}</div>
                  <div className="author-role">{t.role}</div>
                  <div className="author-company">{t.company}</div>
                  <span className="demo-notice-tag">[{t.verified}]</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
