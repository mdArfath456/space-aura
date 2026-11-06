import React, { useState } from 'react';
import { Eye, MessageCircle } from 'lucide-react';
import { useIndustry } from '../../hooks/useIndustry.jsx';
import { openWhatsAppChat } from '../../services/whatsappService.js';
import SpaceModal from '../Modals/SpaceModal.jsx';
import '../../styles/gallery.css';

export default function SpaceGallery() {
  const { currentIndustry } = useIndustry();
  const [selectedCategory, setSelectedCategory] = useState('All Spaces');
  const [activeSpaceModal, setActiveSpaceModal] = useState(null);

  const categories = currentIndustry.categories;
  const spaces = currentIndustry.spaces;

  const filteredSpaces = selectedCategory === 'All Spaces' || selectedCategory === 'All Cells' || selectedCategory === 'All Hubs' || selectedCategory === 'All Microgrids'
    ? spaces
    : spaces.filter((s) => s.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  const handleWhatsAppClick = (space) => {
    const msg = currentIndustry.whatsappTemplates.space(space.name, space.category);
    openWhatsAppChat(currentIndustry.contactInfo.rawPhone, msg);
  };

  return (
    <section id="spaces" className="gallery-section">
      <div className="site-container">
        <div className="section-header">
          <span className="section-badge">Architectural Showcase</span>
          <h2 className="section-title">Explore Spaces Designed to Inspire.</h2>
          <p className="section-subtitle">
            Immersive environments custom-calibrated for maximum cognitive flow, speech confidentiality, and sensory performance.
          </p>
        </div>

        {/* Category Filters */}
        <div className="gallery-categories-bar" role="tablist" aria-label="Space Categories">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`category-filter-btn ${selectedCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {filteredSpaces.map((space) => (
            <div key={space.id} className="space-card">
              <div
                className="space-thumbnail-wrap"
                onClick={() => setActiveSpaceModal(space)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setActiveSpaceModal(space)}
                aria-label={`View details for ${space.name}`}
              >
                <img
                  src={space.image}
                  alt={space.name}
                  className="space-thumbnail-img"
                  loading="lazy"
                />
                <span className="space-badge-category">{space.category}</span>
              </div>

              <div className="space-card-content">
                <h3 className="space-card-title">{space.name}</h3>
                <p className="space-card-desc">{space.shortDesc}</p>

                <div className="space-highlights-pills">
                  {space.highlights.slice(0, 3).map((hl, i) => (
                    <span key={i} className="space-highlight-pill">{hl}</span>
                  ))}
                </div>

                <div className="space-card-actions">
                  <button
                    type="button"
                    onClick={() => setActiveSpaceModal(space)}
                    className="btn btn-secondary btn-sm"
                  >
                    <Eye size={15} />
                    <span>View Architectural Details</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleWhatsAppClick(space)}
                    className="btn btn-whatsapp btn-sm"
                  >
                    <MessageCircle size={15} />
                    <span>Interested? Chat on WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {activeSpaceModal && (
        <SpaceModal
          space={activeSpaceModal}
          onClose={() => setActiveSpaceModal(null)}
        />
      )}
    </section>
  );
}
