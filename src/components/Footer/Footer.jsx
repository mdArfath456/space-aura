import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageCircle, ArrowUpRight } from 'lucide-react';
import { useIndustry } from '../../hooks/useIndustry.jsx';
import { openWhatsAppChat } from '../../services/whatsappService.js';
import '../../styles/footer.css';

export default function Footer() {
  const { currentIndustry } = useIndustry();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const scrollToHash = (href) => {
    if (!isHomePage) {
      window.location.href = `/${href}`;
      return;
    }
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsApp = () => {
    openWhatsAppChat(
      currentIndustry.contactInfo.rawPhone,
      currentIndustry.whatsappTemplates.welcome
    );
  };

  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="footer-top-grid">
          {/* Brand Column */}
          <div className="footer-brand-col">
            <Link to="/" className="brand-logo-link" onClick={() => scrollToHash('#hero')}>
              <div className="brand-symbol-wrap" aria-hidden="true">
                <svg viewBox="0 0 40 40" className="brand-symbol-svg" fill="none">
                  <path
                    d={currentIndustry.logoSymbol}
                    fill={currentIndustry.themeColors.primary}
                  />
                  <circle cx="20" cy="20" r="3.5" fill={currentIndustry.themeColors.accent} />
                  <path
                    d="M8 20C8 13.3726 13.3726 8 20 8"
                    stroke={currentIndustry.themeColors.accent}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="brand-name-wrap">
                <span className="brand-title">{currentIndustry.logoText}</span>
                <span className="brand-sub">{currentIndustry.logoSubtext}</span>
              </div>
            </Link>

            <p className="footer-brand-desc">{currentIndustry.description}</p>

            <button
              type="button"
              onClick={handleWhatsApp}
              className="btn btn-whatsapp btn-sm"
              style={{ alignSelf: 'flex-start', marginTop: '8px' }}
            >
              <MessageCircle size={16} />
              <span>Connect on WhatsApp</span>
            </button>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links-list">
              <li>
                <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToHash('#hero'); }} className="footer-link-item">
                  Home
                </a>
              </li>
              <li>
                <a href="#solutions" onClick={(e) => { e.preventDefault(); scrollToHash('#solutions'); }} className="footer-link-item">
                  Solutions
                </a>
              </li>
              <li>
                <a href="#spaces" onClick={(e) => { e.preventDefault(); scrollToHash('#spaces'); }} className="footer-link-item">
                  Spaces
                </a>
              </li>
              <li>
                <a href="#products" onClick={(e) => { e.preventDefault(); scrollToHash('#products'); }} className="footer-link-item">
                  Products
                </a>
              </li>
              <li>
                <a href="#projects" onClick={(e) => { e.preventDefault(); scrollToHash('#projects'); }} className="footer-link-item">
                  Projects & Case Studies
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToHash('#contact'); }} className="footer-link-item">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Pages */}
          <div>
            <h4 className="footer-col-title">Legal & Trust</h4>
            <ul className="footer-links-list">
              <li>
                <Link to="/terms" className="footer-link-item">Terms and Conditions</Link>
              </li>
              <li>
                <Link to="/privacy" className="footer-link-item">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/cookies" className="footer-link-item">Cookie Policy</Link>
              </li>
              <li>
                <Link to="/communication-policy" className="footer-link-item">Enquiry & WhatsApp Policy</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="footer-col-title">Headquarters</h4>
            <div className="footer-contact-info">
              <p>{currentIndustry.contactInfo.address}</p>
              <p><strong>Tel:</strong> {currentIndustry.contactInfo.phone}</p>
              <p><strong>Email:</strong> {currentIndustry.contactInfo.email}</p>
              <p><strong>Hours:</strong> {currentIndustry.contactInfo.hours}</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div>
            © {new Date().getFullYear()} {currentIndustry.name}. All rights reserved.
            <span style={{ display: 'block', fontSize: '0.75rem', marginTop: '4px', opacity: 0.75 }}>
              Live Presentation Prototype: Architecture, imagery, and specifications are configurable for client demonstration.
            </span>
          </div>

          <div className="footer-legal-links">
            <Link to="/terms" className="footer-link-item">Terms</Link>
            <Link to="/privacy" className="footer-link-item">Privacy</Link>
            <Link to="/cookies" className="footer-link-item">Cookies</Link>
            <Link to="/communication-policy" className="footer-link-item">Communication</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
