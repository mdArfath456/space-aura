import React, { useState } from 'react';
import { X, MessageCircle, Layers, Check } from 'lucide-react';
import { openWhatsAppChat } from '../../services/whatsappService.js';
import { useIndustry } from '../../hooks/useIndustry.jsx';

export default function SpaceModal({ space, onClose }) {
  const { currentIndustry } = useIndustry();
  const [activeImage, setActiveImage] = useState(space.image);

  if (!space) return null;

  const handleWhatsAppEnquiry = () => {
    const message = currentIndustry.whatsappTemplates.space(space.name, space.category);
    openWhatsAppChat(currentIndustry.contactInfo.rawPhone, message);
  };

  const allImages = [space.image, ...(space.galleryImages || [])];

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="space-modal-box" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          className="modal-close-btn"
          aria-label="Close details"
        >
          <X size={20} />
        </button>

        <img
          src={activeImage}
          alt={space.name}
          className="space-modal-hero-img"
        />

        {/* Thumbnail Selector if multiple images */}
        {allImages.length > 1 && (
          <div style={{ display: 'flex', gap: '8px', padding: '12px 36px 0 36px' }}>
            {allImages.map((imgUrl, i) => (
              <img
                key={i}
                src={imgUrl}
                alt={`${space.name} view ${i + 1}`}
                onClick={() => setActiveImage(imgUrl)}
                style={{
                  width: '64px',
                  height: '48px',
                  objectFit: 'cover',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  border: activeImage === imgUrl ? '2px solid var(--color-primary)' : '1px solid var(--border-subtle)',
                }}
              />
            ))}
          </div>
        )}

        <div className="space-modal-body">
          <div className="space-modal-header">
            <span className="space-badge-category" style={{ position: 'static', display: 'inline-block', marginBottom: '8px' }}>
              {space.category}
            </span>
            <h2 className="section-title" style={{ fontSize: '1.9rem', marginBottom: '8px' }}>
              {space.name}
            </h2>
            <p className="section-subtitle" style={{ fontSize: '1rem' }}>
              {space.shortDesc}
            </p>
          </div>

          {/* Specifications Grid */}
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginTop: '24px' }}>
            Architectural & Spatial Specifications
          </h3>
          <div className="space-specs-grid">
            {Object.entries(space.specs || {}).map(([key, val]) => (
              <div key={key} className="spec-cell">
                <div className="spec-cell-label">{key}</div>
                <div className="spec-cell-val">{val}</div>
              </div>
            ))}
          </div>

          {/* Materials & Finishes */}
          {space.materials && (
            <div style={{ marginTop: '24px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '12px' }}>
                Materials & Acoustic Finishes
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {space.materials.map((mat, i) => (
                  <span
                    key={i}
                    style={{
                      padding: '6px 14px',
                      background: 'var(--bg-subtle)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <Layers size={14} color="var(--color-accent)" />
                    {mat}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Highlights */}
          {space.highlights && (
            <div style={{ marginTop: '24px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '12px' }}>
                Key Engineering Highlights
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px' }}>
                {space.highlights.map((h, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                    <Check size={16} color="var(--color-primary)" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* WhatsApp Direct Action */}
          <div style={{ marginTop: '36px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={handleWhatsAppEnquiry}
              className="btn btn-whatsapp"
              style={{ width: '100%', padding: '16px' }}
            >
              <MessageCircle size={20} />
              <span>Interested in This Design? Chat on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
