import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useIndustry } from '../../hooks/useIndustry.jsx';
import '../../styles/solutions.css';

export default function Solutions() {
  const { currentIndustry } = useIndustry();
  const { sectionTitle, sectionSubtitle, items } = currentIndustry.solutions;

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="solutions" className="solutions-section">
      <div className="site-container">
        <div className="section-header">
          <span className="section-badge">Core Capabilities</span>
          <h2 className="section-title">{sectionTitle}</h2>
          <p className="section-subtitle">{sectionSubtitle}</p>
        </div>

        <div className="solutions-grid">
          {items.map((sol) => (
            <div key={sol.id} className="solution-card">
              <div className="solution-img-wrap">
                <img
                  src={sol.image}
                  alt={sol.title}
                  className="solution-img"
                  loading="lazy"
                />
                <div className="solution-img-overlay" />
              </div>

              <div className="solution-card-body">
                <h3 className="solution-title">{sol.title}</h3>
                <p className="solution-desc">{sol.shortDesc}</p>

                <ul className="solution-benefits-list">
                  {sol.benefits.map((benefit, i) => (
                    <li key={i} className="solution-benefit-item">
                      <CheckCircle2 size={16} className="benefit-bullet-icon" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                <div className="solution-footer-actions">
                  <button
                    type="button"
                    onClick={scrollToContact}
                    className="btn btn-outline btn-sm"
                  >
                    <span>Consult on Solution</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
