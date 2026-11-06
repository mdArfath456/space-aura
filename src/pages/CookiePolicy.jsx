import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useIndustry } from '../hooks/useIndustry.jsx';
import '../styles/legal.css';

export default function CookiePolicy() {
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
          <h1 className="legal-page-title">Cookie & Local Storage Policy</h1>
          <p className="legal-meta">Last Updated: October 2026 | Document Reference: COOK-AS-2026</p>
        </div>

        <div className="legal-content-card">
          <div className="legal-demo-callout">
            <strong>Client-Side Storage Notice:</strong> This policy describes the minimal client-side preferences and session storage utilized by {currentIndustry.name}.
          </div>

          <section className="legal-section-block">
            <h2 className="legal-heading">1. What Are Cookies and Local Storage?</h2>
            <p className="legal-paragraph">
              Cookies and browser local storage are standard digital mechanisms that store lightweight key-value pairs directly on your computing device to remember user preferences across sessions.
            </p>
          </section>

          <section className="legal-section-block">
            <h2 className="legal-heading">2. Categories of Storage We Use</h2>
            <ul className="legal-list">
              <li>
                <strong>Strictly Necessary Preference Storage:</strong> We store your selected theme (dark or light mode) via <code>auraspace_theme</code> so that your visual setup persists upon reload.
              </li>
              <li>
                <strong>Client-Side Concierge Session:</strong> Our Smart Business Concierge stores conversational context strictly within your active browser memory so you do not lose conversation flow during your visit.
              </li>
              <li>
                <strong>No Third-Party Tracking Cookies:</strong> We do not load invasive advertising trackers or cross-site tracking pixels on this platform.
              </li>
            </ul>
          </section>

          <section className="legal-section-block">
            <h2 className="legal-heading">3. Controlling Your Storage Preferences</h2>
            <p className="legal-paragraph">
              You can easily clear local storage data at any time via your browser developer tools or settings menu. Disabling browser storage will simply reset the visual theme to default dark mode upon page refresh.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
