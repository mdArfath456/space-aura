import React, { useState, useMemo } from 'react';
import { MessageCircle, Send, CheckCircle2, Sliders } from 'lucide-react';
import { useIndustry } from '../../hooks/useIndustry.jsx';
import { calculateImpact } from '../../utils/calculatorLogic.js';
import { openWhatsAppChat } from '../../services/whatsappService.js';
import { submitLead } from '../../services/supabaseClient.js';
import '../../styles/calculator.css';

export default function ImpactCalculator() {
  const { currentIndustry } = useIndustry();
  const config = currentIndustry.calculator;

  const [sqft, setSqft] = useState(config.defaults.sqft);
  const [employees, setEmployees] = useState(config.defaults.employees);
  const [meetingRooms, setMeetingRooms] = useState(config.defaults.meetingRooms);
  const [automationLevel, setAutomationLevel] = useState(config.defaults.automationLevel);

  const [showLeadModal, setShowLeadModal] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: '', email: '', phone: '', company: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedStatus, setSubmittedStatus] = useState(null);

  const impact = useMemo(() => {
    return calculateImpact({ sqft, employees, meetingRooms, automationLevel });
  }, [sqft, employees, meetingRooms, automationLevel]);

  const handleWhatsAppEnquiry = () => {
    const msg = currentIndustry.whatsappTemplates.calculator(
      impact.safeSqft,
      impact.safeEmployees,
      impact.totalEstimatedAnnualSavings,
      impact.recommendedPackage
    );
    openWhatsAppChat(currentIndustry.contactInfo.rawPhone, msg);
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmittedStatus(null);

    const res = await submitLead({
      leadType: 'calculator_assessment',
      name: leadForm.name,
      email: leadForm.email,
      phone: leadForm.phone,
      companyName: leadForm.company,
      workspaceSqft: impact.safeSqft,
      employeeCount: impact.safeEmployees,
      meetingRoomsCount: impact.safeRooms,
      automationLevel: impact.automationLevel,
      estimatedAnnualSavings: impact.totalEstimatedAnnualSavings,
      projectedEnergyReduction: `${impact.energyReductionPercent}%`,
      recommendedPackage: impact.recommendedPackage,
      preferredChannel: 'whatsapp_and_email',
    });

    setIsSubmitting(false);
    if (res.success) {
      setSubmittedStatus('success');
      setTimeout(() => {
        setShowLeadModal(false);
        setSubmittedStatus(null);
      }, 3500);
    } else {
      setSubmittedStatus('error');
    }
  };

  return (
    <section id="calculator" className="calculator-section">
      <div className="site-container">
        <div className="section-header">
          <span className="section-badge">Financial & Acoustic ROI</span>
          <h2 className="section-title">{config.title}</h2>
          <p className="section-subtitle">{config.subtitle}</p>
        </div>

        <div className="calculator-wrapper">
          {/* Inputs Pane */}
          <div className="calc-inputs-pane">
            <div className="calc-field-group">
              <div className="calc-field-header">
                <label htmlFor="calc-sqft" className="calc-label">Facility Footprint (Square Feet)</label>
                <span className="calc-current-value">{Number(sqft).toLocaleString()} sq ft</span>
              </div>
              <input
                id="calc-sqft"
                type="range"
                min="2000"
                max="80000"
                step="1000"
                value={sqft}
                onChange={(e) => setSqft(parseInt(e.target.value))}
                className="calc-range-input"
              />
            </div>

            <div className="calc-field-group">
              <div className="calc-field-header">
                <label htmlFor="calc-employees" className="calc-label">Total Staff / Daily Occupancy</label>
                <span className="calc-current-value">{employees} Persons</span>
              </div>
              <input
                id="calc-employees"
                type="range"
                min="10"
                max="500"
                step="5"
                value={employees}
                onChange={(e) => setEmployees(parseInt(e.target.value))}
                className="calc-range-input"
              />
            </div>

            <div className="calc-field-group">
              <div className="calc-field-header">
                <label htmlFor="calc-rooms" className="calc-label">Dedicated Focus / Meeting Pods Needed</label>
                <span className="calc-current-value">{meetingRooms} Rooms</span>
              </div>
              <input
                id="calc-rooms"
                type="range"
                min="1"
                max="24"
                step="1"
                value={meetingRooms}
                onChange={(e) => setMeetingRooms(parseInt(e.target.value))}
                className="calc-range-input"
              />
            </div>

            <div className="calc-field-group">
              <span className="calc-label">Automation & Acoustic Strategy Tier</span>
              <div className="calc-tier-selector" role="radiogroup">
                {[
                  { id: 'essential', label: 'Essential Integration' },
                  { id: 'balanced', label: 'Executive Balanced' },
                  { id: 'autonomous', label: 'Autonomous Spatial' },
                ].map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setAutomationLevel(tier.id)}
                    className={`calc-tier-btn ${automationLevel === tier.id ? 'active' : ''}`}
                  >
                    {tier.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Pane */}
          <div className="calc-results-pane">
            <div>
              <div className="calc-result-header">
                <div className="calc-result-badge">Projected Annual Economic Impact</div>
                <div className="calc-savings-hero">
                  ${impact.totalEstimatedAnnualSavings.toLocaleString()}
                </div>
                <div className="calc-savings-sub">
                  Combined energy savings, meeting recovery & cognitive productivity value
                </div>
              </div>

              <div className="calc-metrics-row">
                <div className="metric-box">
                  <div className="metric-num">-{impact.energyReductionPercent}%</div>
                  <div className="metric-lbl">HVAC & Lighting Power Draw</div>
                </div>
                <div className="metric-box">
                  <div className="metric-num">{impact.acousticPrivacyGain}</div>
                  <div className="metric-lbl">Speech Confidentiality Index</div>
                </div>
              </div>

              <div className="calc-package-badge">
                Recommended Solution: <strong>{impact.recommendedPackage}</strong>
              </div>

              <p className="calc-disclaimer-note">
                * {config.note}
              </p>
            </div>

            <div className="calc-actions">
              <button
                type="button"
                onClick={() => setShowLeadModal(true)}
                className="btn btn-primary"
              >
                <Send size={16} />
                <span>Request a Personalized Assessment</span>
              </button>

              <button
                type="button"
                onClick={handleWhatsAppEnquiry}
                className="btn btn-whatsapp"
              >
                <MessageCircle size={16} />
                <span>Discuss Calculator Results on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Assessment Request Modal */}
      {showLeadModal && (
        <div className="modal-backdrop" onClick={() => setShowLeadModal(false)}>
          <div
            className="space-modal-box"
            style={{ maxWidth: '540px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-modal-body">
              <h3 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '8px' }}>
                Request Formal Assessment
              </h3>
              <p className="section-subtitle" style={{ fontSize: '0.9rem', marginBottom: '20px' }}>
                We will prepare a customized proposal for your {Number(sqft).toLocaleString()} sq ft facility.
              </p>

              {submittedStatus === 'success' && (
                <div className="form-feedback-alert success">
                  <CheckCircle2 size={18} style={{ display: 'inline', marginRight: '6px' }} />
                  Thank you! Your assessment request has been recorded. Our team will reach out shortly.
                </div>
              )}

              {submittedStatus === 'error' && (
                <div className="form-feedback-alert error">
                  Submission encountered an issue. Please connect directly via WhatsApp.
                </div>
              )}

              <form onSubmit={handleLeadSubmit} className="contact-form">
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={leadForm.name}
                    onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                    className="form-input"
                    placeholder="e.g. Sarah Jenkins"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Corporate Email *</label>
                  <input
                    type="email"
                    required
                    value={leadForm.email}
                    onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                    className="form-input"
                    placeholder="sarah@enterprise.com"
                  />
                </div>

                <div className="form-row-2col">
                  <div className="form-group">
                    <label className="form-label">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      value={leadForm.phone}
                      onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                      className="form-input"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Company Name</label>
                    <input
                      type="text"
                      value={leadForm.company}
                      onChange={(e) => setLeadForm({ ...leadForm, company: e.target.value })}
                      className="form-input"
                      placeholder="Acme Global Inc"
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary"
                    style={{ flex: 1 }}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Assessment Request'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowLeadModal(false)}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
