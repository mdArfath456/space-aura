import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useIndustry } from '../../hooks/useIndustry.jsx';
import { openWhatsAppChat } from '../../services/whatsappService.js';
import '../../styles/chatbot.css';

export default function WhatsAppButton() {
  const { currentIndustry } = useIndustry();

  const handleClick = () => {
    openWhatsAppChat(
      currentIndustry.contactInfo.rawPhone,
      currentIndustry.whatsappTemplates.welcome
    );
  };

  return (
    <div className="floating-whatsapp-wrap">
      <div className="whatsapp-tooltip">Chat with Our Team</div>
      <button
        type="button"
        onClick={handleClick}
        className="floating-whatsapp-btn"
        aria-label="Chat with AuraSpace Systems on WhatsApp"
      >
        <div className="whatsapp-pulse-ring" />
        <MessageCircle size={30} />
      </button>
    </div>
  );
}
