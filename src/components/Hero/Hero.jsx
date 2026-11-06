import React, { useEffect, useRef } from 'react';
import { ArrowDown, MessageCircle, Sparkles } from 'lucide-react';
import { useIndustry } from '../../hooks/useIndustry.jsx';
import { openWhatsAppChat } from '../../services/whatsappService.js';
import HeroScene from './HeroScene.jsx';
import gsap from 'gsap';
import '../../styles/hero.css';

export default function Hero() {
  const { currentIndustry } = useIndustry();
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-badge-pill',
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
      gsap.fromTo(
        '.hero-headline',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.15, ease: 'power3.out' }
      );
      gsap.fromTo(
        '.hero-description',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.9, delay: 0.3, ease: 'power3.out' }
      );
      gsap.fromTo(
        '.hero-cta-cluster',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.45, ease: 'power3.out' }
      );
      gsap.fromTo(
        '.hero-stat-card',
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.6, stagger: 0.12, delay: 0.6, ease: 'back.out(1.4)' }
      );
      gsap.fromTo(
        '.hero-visual-pane',
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 1.2, delay: 0.2, ease: 'power3.out' }
      );
    }, heroRef);

    return () => ctx.revert();
  }, [currentIndustry.id]);

  const handleWhatsAppDiscuss = () => {
    openWhatsAppChat(
      currentIndustry.contactInfo.rawPhone,
      currentIndustry.whatsappTemplates.welcome
    );
  };

  const scrollToSpaces = () => {
    const el = document.getElementById('spaces');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" ref={heroRef} className="hero-section">
      <div className="site-container hero-grid">
        {/* Left Column: Typography & CTAs */}
        <div ref={contentRef} className="hero-content">
          <div className="hero-badge-pill">
            <Sparkles size={15} />
            <span>{currentIndustry.hero.badge}</span>
          </div>

          <h1 ref={headlineRef} className="hero-headline">
            {currentIndustry.hero.headline.split('. ').map((part, i, arr) => (
              <React.Fragment key={i}>
                <span className={i === 1 ? 'text-gradient' : ''}>{part}</span>
                {i < arr.length - 1 ? '. ' : ''}
              </React.Fragment>
            ))}
          </h1>

          <p className="hero-description">{currentIndustry.hero.description}</p>

          <div className="hero-cta-cluster">
            <button
              type="button"
              onClick={scrollToSpaces}
              className="btn btn-primary"
            >
              <span>{currentIndustry.hero.primaryCta}</span>
              <ArrowDown size={16} />
            </button>

            <button
              type="button"
              onClick={handleWhatsAppDiscuss}
              className="btn btn-whatsapp"
            >
              <MessageCircle size={18} />
              <span>{currentIndustry.hero.secondaryCta}</span>
            </button>
          </div>

          {/* Key Stat Cards */}
          <div className="hero-stats-row">
            {currentIndustry.hero.statPills.map((stat) => (
              <div key={stat.label} className="hero-stat-card">
                <div className="hero-stat-val">{stat.value}</div>
                <div className="hero-stat-lbl">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Three.js Interactive Scene */}
        <div className="hero-visual-pane">
          <HeroScene />
          <div className="hero-canvas-overlay-badge">
            <span>Spatial Telemetry Emulation</span>
            <span className="hero-tag-glow">● Live Procedural Model</span>
          </div>
        </div>
      </div>
    </section>
  );
}
