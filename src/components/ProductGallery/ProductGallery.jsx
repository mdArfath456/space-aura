import React, { useState } from 'react';
import { Rotate3D, Check, MessageCircle, Eye, CornerDownLeft } from 'lucide-react';
import { useIndustry } from '../../hooks/useIndustry.jsx';
import { openWhatsAppChat } from '../../services/whatsappService.js';
import ProductViewerModal from '../ProductViewer/ProductViewerModal.jsx';
import '../../styles/products.css';

export default function ProductGallery() {
  const { currentIndustry } = useIndustry();
  const [flippedMap, setFlippedMap] = useState({});
  const [active3DProduct, setActive3DProduct] = useState(null);

  const products = currentIndustry.products;

  const toggleFlip = (id, e) => {
    e.stopPropagation();
    setFlippedMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleWhatsAppEnquiry = (prod, e) => {
    e.stopPropagation();
    const msg = currentIndustry.whatsappTemplates.product(prod.name, prod.category);
    openWhatsAppChat(currentIndustry.contactInfo.rawPhone, msg);
  };

  return (
    <section id="products" className="products-section">
      <div className="site-container">
        <div className="section-header">
          <span className="section-badge">Intelligent Products</span>
          <h2 className="section-title">Hardware & Systems Built for Precision.</h2>
          <p className="section-subtitle">
            Modular acoustic pods, circadian lighting grids, and IoT environmental controllers designed to integrate flawlessly into modern architectural standards.
          </p>
        </div>

        <div className="products-grid">
          {products.map((prod) => {
            const isFlipped = Boolean(flippedMap[prod.id]);

            return (
              <div
                key={prod.id}
                className={`product-flip-card-scene ${isFlipped ? 'is-flipped' : ''}`}
              >
                <div className="product-flip-card-inner">
                  {/* FRONT FACE */}
                  <div className="product-card-face product-card-front">
                    <div className="product-card-front-img-wrap">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="product-card-front-img"
                        loading="lazy"
                      />
                      <button
                        type="button"
                        onClick={(e) => toggleFlip(prod.id, e)}
                        className="flip-prompt-badge"
                        aria-label={`Flip to view specifications for ${prod.name}`}
                      >
                        <Rotate3D size={14} />
                        <span>Specs & 3D Flip</span>
                      </button>
                    </div>

                    <div className="product-card-front-body">
                      <span className="product-category-tag">{prod.category}</span>
                      <h3 className="product-title">{prod.name}</h3>
                      <p className="product-desc">{prod.shortDesc}</p>

                      <div className="product-front-actions">
                        <button
                          type="button"
                          onClick={() => setActive3DProduct(prod)}
                          className="btn btn-primary btn-sm"
                          style={{ flex: 1 }}
                        >
                          <Eye size={15} />
                          <span>3D Interactive Viewer</span>
                        </button>

                        <button
                          type="button"
                          onClick={(e) => toggleFlip(prod.id, e)}
                          className="btn btn-secondary btn-sm"
                          aria-label="Flip card for specs"
                        >
                          <Rotate3D size={15} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* BACK FACE */}
                  <div className="product-card-face product-card-back">
                    <div className="product-back-header">
                      <div>
                        <span className="product-category-tag">{prod.category}</span>
                        <h4 className="product-back-title">{prod.name}</h4>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => toggleFlip(prod.id, e)}
                        className="product-flip-back-btn"
                        aria-label="Return to front view"
                      >
                        <CornerDownLeft size={16} />
                      </button>
                    </div>

                    {/* Specifications rows */}
                    <div className="product-back-specs-list">
                      {Object.entries(prod.specs || {}).map(([k, v]) => (
                        <div key={k} className="product-back-spec-row">
                          <span className="product-back-spec-k">{k}:</span>
                          <span className="product-back-spec-v">{v}</span>
                        </div>
                      ))}
                    </div>

                    {/* Key features */}
                    <div className="product-back-features-title">Engineering Features</div>
                    <ul className="product-back-features-list">
                      {prod.keyFeatures.map((feat, i) => (
                        <li key={i} className="product-back-feature-item">
                          <Check size={13} color="var(--color-accent)" style={{ flexShrink: 0 }} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Reverse side actions */}
                    <div className="product-back-actions">
                      <button
                        type="button"
                        onClick={() => setActive3DProduct(prod)}
                        className="btn btn-primary btn-sm"
                      >
                        <Eye size={14} />
                        <span>Launch 360° Three.js Model</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleWhatsAppEnquiry(prod, e)}
                        className="btn btn-whatsapp btn-sm"
                      >
                        <MessageCircle size={14} />
                        <span>WhatsApp Product Enquiry</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 360-degree Three.js Viewer Modal */}
      {active3DProduct && (
        <ProductViewerModal
          product={active3DProduct}
          onClose={() => setActive3DProduct(null)}
        />
      )}
    </section>
  );
}
