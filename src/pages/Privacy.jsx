import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useIndustry } from '../hooks/useIndustry.jsx';
import '../styles/legal.css';

export default function Privacy() {
  const { currentIndustry } = useIndustry();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="legal-page-container">
      <div className="site-container">
        <div className="legal-header">
          <Link to="/" className="legal-back-nav">
            <ArrowLeft size={16} />
            <span>Return to {currentIndustry.name} Home</span>
          </Link>
          <h1 className="legal-page-title">Privacy Policy</h1>
          <p className="legal-meta">Last Updated: October 2026 | Document Reference: PRIV-AS-2026</p>
        </div>

        <div className="legal-content-card">
          <div className="legal-demo-callout">
            <strong>Demonstration Presentation Notice:</strong> This privacy disclosure outlines how visitor inquiry records, contact submissions, and WhatsApp click-to-chat links are managed within {currentIndustry.name}.
          </div>

          <section className="legal-section-block">
            <h2 className="legal-heading">1. Information We Collect</h2>
            <p className="legal-paragraph">
              {currentIndustry.name} collects information when you interact with our website tools, specifically:
            </p>
            <ul className="legal-list">
              <li><strong>Contact Submissions:</strong> Full name, corporate email address, phone number, organization name, and project requirements.</li>
              <li><strong>Impact Calculator Inputs:</strong> Approximate floor plate square footage, staff headcount, required meeting pods, and selected automation tier.</li>
              <li><strong>Technical Session Data:</strong> Browser user agent, device screen resolution, and chosen theme preference (stored client-side).</li>
            </ul>
          </section>

          <section className="legal-section-block">
            <h2 className="legal-heading">2. How Your Information Is Utilized</h2>
            <p className="legal-paragraph">
              Data submitted through our digital portal is strictly utilized for:
            </p>
            <ul className="legal-list">
              <li>Generating personalized acoustic, lighting, and spatial engineering assessments.</li>
              <li>Facilitating direct communication between our technical team and your facilities group.</li>
              <li>Providing requested CAD models, specification sheets, and logistical lead times.</li>
            </ul>
          </section>

          <section className="legal-section-block">
            <h2 className="legal-heading">3. Data Storage & Supabase Security</h2>
            <p className="legal-paragraph">
              Online inquiry submissions are securely stored using enterprise-grade Supabase PostgreSQL instances with Row Level Security (RLS) actively enforced. Public visitors are granted INSERT-only authorization; access to customer contact records and confidential floor plans is strictly restricted and never exposed to the public internet or unauthorized API endpoints.
            </p>
          </section>

          <section className="legal-section-block">
            <h2 className="legal-heading">4. Third-Party Services & WhatsApp Communication</h2>
            <p className="legal-paragraph">
              Our website integrates direct WhatsApp Click-to-Chat links. When you choose to initiate a conversation through WhatsApp, you transition to Meta Platforms' messaging environment, governed by WhatsApp's End-to-End Encryption and Privacy Policy. {currentIndustry.name} does not transmit private browsing telemetry to WhatsApp without your active consent to initiate a chat.
            </p>
          </section>

          <section className="legal-section-block">
            <h2 className="legal-heading">5. Customer Rights & Data Retention</h2>
            <p className="legal-paragraph">
              You maintain the right to inspect, update, or request the deletion of your inquiry details from our database at any time. To exercise these rights, please contact our data stewardship desk at {currentIndustry.contactInfo.email}.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
