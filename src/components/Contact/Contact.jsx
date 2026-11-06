import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import { useIndustry } from '../../hooks/useIndustry.jsx';
import { openWhatsAppChat } from '../../services/whatsappService.js';
import { submitContactForm } from '../../services/supabaseClient.js';
import '../../styles/contact.css';

export default function Contact() {
  const { currentIndustry } = useIndustry();
  const contact = currentIndustry.contactInfo;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    requirementType: 'Intelligent Workspace Automation',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Please enter your name.';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Please provide a valid corporate email.';
    if (!formData.message.trim() || formData.message.trim().length < 10) errs.message = 'Please provide a message with at least 10 characters.';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setIsSubmitting(true);
    setSubmitResult(null);

    const res = await submitContactForm(formData);
    setIsSubmitting(false);

    if (res.success) {
      setSubmitResult({
        type: 'success',
        message: `Thank you for contacting ${currentIndustry.name}. Your enquiry has been received. Our solutions engineering team will review your specifications promptly.`,
      });
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        company: '',
        requirementType: 'Intelligent Workspace Automation',
        message: '',
      });
    } else {
      setSubmitResult({
        type: 'error',
        message: 'There was a connection issue recording your enquiry. Please use our direct WhatsApp chat below for immediate assistance.',
      });
    }
  };

  const handleDirectWhatsApp = () => {
    const msg = `Hello ${currentIndustry.name}, I am reaching out through your official website contact page to discuss a workspace project.`;
    openWhatsAppChat(contact.rawPhone, msg);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="site-container">
        <div className="section-header">
          <span className="section-badge">Direct Communication</span>
          <h2 className="section-title">Initiate Your Consultation.</h2>
          <p className="section-subtitle">
            Connect with our acoustic engineers and spatial automation specialists to discuss drawings, floor plates, or custom pod configurations.
          </p>
        </div>

        <div className="contact-layout-grid">
          {/* Info Side */}
          <div className="contact-info-panel">
            <div className="contact-info-cards">
              <div className="contact-info-card">
                <div className="contact-info-icon"><Phone size={20} /></div>
                <div>
                  <div className="contact-info-label">Direct Telephone</div>
                  <div className="contact-info-val">{contact.phone}</div>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="contact-info-icon"><Mail size={20} /></div>
                <div>
                  <div className="contact-info-label">Electronic Mail</div>
                  <div className="contact-info-val">{contact.email}</div>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="contact-info-icon"><MapPin size={20} /></div>
                <div>
                  <div className="contact-info-label">Corporate Studio</div>
                  <div className="contact-info-val">{contact.address}</div>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="contact-info-icon"><Clock size={20} /></div>
                <div>
                  <div className="contact-info-label">Operating Hours</div>
                  <div className="contact-info-val">{contact.hours}</div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="direct-whatsapp-card">
              <div className="direct-whatsapp-title">Instant WhatsApp Business Channel</div>
              <p className="direct-whatsapp-desc">
                Need rapid answers, CAD models, or real-time availability? Chat directly with our engineering team on WhatsApp.
              </p>
              <button
                type="button"
                onClick={handleDirectWhatsApp}
                className="btn btn-whatsapp"
              >
                <MessageCircle size={18} />
                <span>Chat With Our Team on WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Form Side */}
          <div className="contact-form-panel">
            {submitResult && (
              <div className={`form-feedback-alert ${submitResult.type}`}>
                {submitResult.type === 'success' && <CheckCircle2 size={20} style={{ display: 'inline', marginRight: '8px' }} />}
                {submitResult.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form" noValidate>
              <div className="form-row-2col">
                <div className="form-group">
                  <label htmlFor="contact-name" className="form-label">Full Name *</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="form-input"
                    placeholder="e.g. David Sterling"
                  />
                  {errors.fullName && <span className="form-error-msg">{errors.fullName}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email" className="form-label">Corporate Email *</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="form-input"
                    placeholder="david@enterprise.com"
                  />
                  {errors.email && <span className="form-error-msg">{errors.email}</span>}
                </div>
              </div>

              <div className="form-row-2col">
                <div className="form-group">
                  <label htmlFor="contact-phone" className="form-label">Direct Phone / Mobile</label>
                  <input
                    id="contact-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="form-input"
                    placeholder="+1 (555) 019-2834"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-company" className="form-label">Company / Architectural Firm</label>
                  <input
                    id="contact-company"
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="form-input"
                    placeholder="e.g. Foster & Partners"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="contact-req" className="form-label">Primary Requirement Area</label>
                <select
                  id="contact-req"
                  value={formData.requirementType}
                  onChange={(e) => setFormData({ ...formData, requirementType: e.target.value })}
                  className="form-select"
                >
                  <option value="Intelligent Workspace Automation">Intelligent Workspace Automation</option>
                  <option value="Acoustic Meeting Pods & Architecture">Acoustic Meeting Pods & Architecture</option>
                  <option value="Circadian & Smart Lighting Systems">Circadian & Smart Lighting Systems</option>
                  <option value="Modular Furniture & Desking">Modular Furniture & Desking</option>
                  <option value="Full Turnkey Floor Renovation">Full Turnkey Floor Renovation</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="contact-message" className="form-label">Project Details & Floor Plate Parameters *</label>
                <textarea
                  id="contact-message"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="form-textarea"
                  placeholder="Please describe your current office layout, square footage, acoustic issues, or pod requirements..."
                />
                {errors.message && <span className="form-error-msg">{errors.message}</span>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
                style={{ width: '100%', padding: '16px' }}
              >
                <Send size={18} />
                <span>{isSubmitting ? 'Transmitting Enquiry...' : 'Submit Official Enquiry'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
