import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { useIndustry } from '../hooks/useIndustry.jsx';
import { openWhatsAppChat } from '../services/whatsappService.js';
import '../styles/legal.css';

export default function CommunicationPolicy() {
  const { currentIndustry } = useIndustry();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleWhatsApp = () => {
    openWhatsAppChat(
      currentIndustry.contactInfo.rawPhone,
      currentIndustry.whatsappTemplates.welcome
    );
  };

  return (
    <div className="legal-page-container">
      <div className="site-container">
        <div className="legal-header">
          <Link to="/" className="legal-back-nav">
            <ArrowLeft size={16} />
            <span>Return to {currentIndustry.name} Home</span>
          </Link>
          <h1 className="legal-page-title">Enquiry & Communication Policy</h1>
          <p className="legal-meta">Last Updated: October 2026 | Document Reference: COMM-AS-2026</p>
        </div>

        <div className="legal-content-card">
          <div className="legal-demo-callout">
            <strong>Official Communication Standards:</strong> This policy governs corporate communication channels, response time commitments, and WhatsApp Click-to-Chat integrations implemented across {currentIndustry.name}.
          </div>

          <section className="legal-section-block">
            <h2 className="legal-heading">1. Official Communication Channels</h2>
            <p className="legal-paragraph">
              {currentIndustry.name} maintains three primary channels for corporate client communication:
            </p>
            <ul className="legal-list">
              <li><strong>Direct WhatsApp Click-to-Chat:</strong> Fast-track messaging for architectural queries, space inquiries, and 3D product specifications.</li>
              <li><strong>Secure Web Contact Submissions:</strong> Form-based inquiry transmission saved directly into our secure PostgreSQL database.</li>
              <li><strong>Direct Telephone Desk:</strong> Voice consultations with our spatial engineering team at {currentIndustry.contactInfo.phone}.</li>
            </ul>
          </section>

          <section className="legal-section-block">
            <h2 className="legal-heading">2. How WhatsApp Enquiries Function</h2>
            <p className="legal-paragraph">
              Every space and product on this website features a dedicated WhatsApp communication button. When clicked, our system automatically encodes the exact design name, category, or calculator estimate into a prefilled message. This eliminates back-and-forth ambiguity and enables our engineers to immediately pull up the relevant technical drawings and CAD specs.
            </p>
          </section>

          <section className="legal-section-block">
            <h2 className="legal-heading">3. Response Time Service Level Commitments</h2>
            <p className="legal-paragraph">
              We hold our enterprise communications to the following service standards:
            </p>
            <ul className="legal-list">
              <li><strong>WhatsApp Enquiries:</strong> Typical response within 15 to 45 minutes during standard operational hours ({currentIndustry.contactInfo.hours}).</li>
              <li><strong>Contact Form Submissions:</strong> Comprehensive proposal and engineering review delivered within 1 business day.</li>
              <li><strong>Impact Calculator Requests:</strong> Formal assessment reports generated and transmitted within 24 hours.</li>
            </ul>
          </section>

          <section className="legal-section-block">
            <h2 className="legal-heading">4. Confidentiality & Non-Disclosure</h2>
            <p className="legal-paragraph">
              All architectural floor plates, CAD files, square footage metrics, and organizational headcount data shared via our communication channels are treated with strict enterprise confidentiality. We never sell, lease, or disseminate client information to third-party brokers.
            </p>
          </section>

          <div style={{ marginTop: '36px', paddingTop: '24px', borderTop: '1px solid var(--border-subtle)' }}>
            <button
              type="button"
              onClick={handleWhatsApp}
              className="btn btn-whatsapp"
            >
              <MessageCircle size={18} />
              <span>Connect Directly on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
