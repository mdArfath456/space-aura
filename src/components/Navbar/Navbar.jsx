import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, ArrowUpRight } from 'lucide-react';
import { useIndustry } from '../../hooks/useIndustry.jsx';
import '../../styles/navbar.css';

export default function Navbar() {
  const { currentIndustry, theme, toggleTheme } = useIndustry();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      if (!isHomePage) return;
      const sections = ['hero', 'solutions', 'spaces', 'products', 'process', 'calculator', 'projects', 'testimonials', 'contact'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const navItems = currentIndustry.navigation.items;

  const scrollToHash = (href) => {
    setMobileMenuOpen(false);
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

  return (
    <header className={`navbar-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="site-container navbar-container">
        {/* Brand Logo */}
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

        {/* Desktop Navigation Menu */}
        <nav className="nav-desktop-menu" aria-label="Main Navigation">
          {navItems.map((item) => {
            const sectionId = item.href.replace('#', '');
            const isActive = isHomePage && activeSection === sectionId;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToHash(item.href);
                }}
                className={`nav-link-item ${isActive ? 'active' : ''}`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right CTA cluster & theme toggle */}
        <div className="nav-actions">
          <button
            type="button"
            onClick={toggleTheme}
            className="theme-toggle-btn"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            type="button"
            onClick={() => scrollToHash(currentIndustry.navigation.primaryCtaTarget)}
            className="btn btn-primary btn-sm"
          >
            <span>{currentIndustry.navigation.primaryCta}</span>
            <ArrowUpRight size={14} />
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-trigger"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={(e) => {
              e.preventDefault();
              scrollToHash(item.href);
            }}
            className="mobile-nav-link"
          >
            {item.label}
          </a>
        ))}
        <button
          type="button"
          onClick={() => scrollToHash(currentIndustry.navigation.secondaryCtaTarget)}
          className="btn btn-secondary"
          style={{ marginTop: '12px' }}
        >
          {currentIndustry.navigation.secondaryCta}
        </button>
      </div>
    </header>
  );
}
