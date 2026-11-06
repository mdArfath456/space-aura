import React from 'react';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { useIndustry } from '../../hooks/useIndustry.jsx';
import { openWhatsAppChat } from '../../services/whatsappService.js';
import '../../styles/casestudies.css';

export default function CaseStudies() {
  const { currentIndustry } = useIndustry();
  const studies = currentIndustry.caseStudies;

  const handleDiscussProject = (study) => {
    const msg = `Hello ${currentIndustry.name}, I reviewed your case study "${study.title}" (${study.industry}) and would like to discuss a similar project deployment for our business.`;
    openWhatsAppChat(currentIndustry.contactInfo.rawPhone, msg);
  };

  return (
    <section id="projects" className="casestudies-section">
      <div className="site-container">
        <div className="section-header">
          <span className="section-badge">Proven Deployments</span>
          <h2 className="section-title">Case Studies & Verified Outcomes.</h2>
          <p className="section-subtitle">
            How forward-thinking enterprises deploy acoustic engineering and automation to solve mission-critical workspace challenges.
          </p>
        </div>

        <div className="casestudies-list">
          {studies.map((study) => (
            <div key={study.id} className="case-study-card">
              <div className="case-study-image-wrap">
                <img
                  src={study.image}
                  alt={study.title}
                  className="case-study-img"
                  loading="lazy"
                />
              </div>

              <div className="case-study-content">
                <span className="case-study-industry-tag">{study.industry}</span>
                <h3 className="case-study-title">{study.title}</h3>

                <div className="case-study-detail-block">
                  <div className="case-study-k">The Challenge</div>
                  <div className="case-study-v">{study.challenge}</div>
                </div>

                <div className="case-study-detail-block">
                  <div className="case-study-k">Engineering Solution</div>
                  <div className="case-study-v">{study.solution}</div>
                </div>

                <div className="case-study-detail-block case-study-result">
                  <div className="case-study-k" style={{ color: 'var(--color-accent)' }}>Illustrative Verified Result</div>
                  <div className="case-study-v">{study.result}</div>
                </div>

                <div className="case-study-actions">
                  <button
                    type="button"
                    onClick={() => handleDiscussProject(study)}
                    className="btn btn-whatsapp btn-sm"
                  >
                    <MessageCircle size={15} />
                    <span>Discuss Similar Project on WhatsApp</span>
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
