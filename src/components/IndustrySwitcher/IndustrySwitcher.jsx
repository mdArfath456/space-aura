import React, { useState } from 'react';
import { Sparkles, Check, ChevronDown, Layers } from 'lucide-react';
import { useIndustry } from '../../hooks/useIndustry.jsx';
import { INDUSTRIES } from '../../config/businessConfig.js';
import '../../styles/switcher.css';

export default function IndustrySwitcher() {
  const { industryKey, setIndustryKey, currentIndustry } = useIndustry();
  const [isOpen, setIsOpen] = useState(false);

  const industryList = [
    { key: 'workspace', label: '1. Smart Workspace Automation', brand: 'AuraSpace Systems' },
    { key: 'manufacturing', label: '2. Precision Manufacturing', brand: 'Veloce Robotics' },
    { key: 'logistics', label: '3. Industrial Logistics', brand: 'NexusFreight Systems' },
    { key: 'energy', label: '4. Renewable Energy Solutions', brand: 'AeroWatt Clean Energy' },
  ];

  const handleSelect = (key) => {
    setIndustryKey(key);
    setIsOpen(false);
  };

  return (
    <div className="industry-switcher-dock">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="industry-switcher-trigger"
        aria-label="Switch presentation industry"
        aria-expanded={isOpen}
      >
        <Layers size={14} />
        <span>Industry: {currentIndustry.name}</span>
        <ChevronDown size={14} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
      </button>

      {isOpen && (
        <div className="industry-menu-popover" role="menu">
          <div className="industry-popover-header">
            <div className="industry-popover-title">Presentation Switcher</div>
            <div className="industry-popover-note">Demonstrates universal website adaptability across 4 enterprise verticals.</div>
          </div>

          {industryList.map((ind) => {
            const isActive = industryKey === ind.key;
            return (
              <button
                key={ind.key}
                type="button"
                onClick={() => handleSelect(ind.key)}
                className={`industry-option-btn ${isActive ? 'active' : ''}`}
                role="menuitem"
              >
                <div>
                  <div style={{ fontWeight: '700' }}>{ind.brand}</div>
                  <div style={{ fontSize: '0.72rem', opacity: 0.8 }}>{ind.label}</div>
                </div>
                {isActive && <Check size={16} className="industry-active-check" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
