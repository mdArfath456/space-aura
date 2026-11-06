import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, ExternalLink, ArrowRight } from 'lucide-react';
import { useIndustry } from '../../hooks/useIndustry.jsx';
import { openWhatsAppChat } from '../../services/whatsappService.js';
import '../../styles/chatbot.css';

export default function Chatbot() {
  const { currentIndustry } = useIndustry();
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  const initialGreeting = `Hello! Welcome to ${currentIndustry.name}. How can we help you create a smarter, more productive environment today?`;

  const [messages, setMessages] = useState([
    {
      id: 'msg-init',
      sender: 'bot',
      text: initialGreeting,
      time: 'Just now',
    },
  ]);

  const quickActions = [
    { id: 'spaces', label: '1. Explore Workspace Designs', action: 'spaces' },
    { id: 'products', label: '2. Find the Right Product', action: 'products' },
    { id: 'calculator', label: '3. Get a Price Estimate', action: 'calculator' },
    { id: 'consultation', label: '4. Book a Consultation', action: 'consultation' },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text,
      time: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = '';
      let ctaType = null;
      const lower = text.toLowerCase();

      if (lower.includes('space') || lower.includes('design') || lower.includes('office') || lower.includes('room')) {
        botResponse = `Our Space Gallery features 6 bespoke environments including Executive Acoustic Suites, Collaborative Floors, and Hybrid Boardrooms. Would you like to view the gallery or discuss a specific room on WhatsApp?`;
        ctaType = 'spaces';
      } else if (lower.includes('product') || lower.includes('pod') || lower.includes('light') || lower.includes('price') || lower.includes('cost')) {
        botResponse = `Our modular hardware includes the AuraPod Pro (with 32dB speech isolation), LuminaGrid circadian lighting, and NexusCore IoT gateways. You can interact with 3D models directly in our Product Showcase!`;
        ctaType = 'products';
      } else if (lower.includes('estimate') || lower.includes('calculator') || lower.includes('roi') || lower.includes('saving')) {
        botResponse = `You can run live calculations using our interactive Impact Calculator based on your square footage, headcount, and meeting rooms. Would you like to jump to the calculator?`;
        ctaType = 'calculator';
      } else if (lower.includes('consultation') || lower.includes('book') || lower.includes('contact') || lower.includes('talk')) {
        botResponse = `Our architectural engineering team provides complimentary spatial and acoustic assessments. You can send us your drawings or chat directly with our specialists on WhatsApp.`;
        ctaType = 'consultation';
      } else {
        botResponse = `Thank you for your message! As the Smart Business Concierge, I can guide you through our architectural spaces, 360° product models, or connect you directly with our engineering team on WhatsApp.`;
        ctaType = 'whatsapp';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: 'msg-' + Date.now(),
          sender: 'bot',
          text: botResponse,
          ctaType,
          time: 'Just now',
        },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  const handleChipClick = (chip) => {
    handleSend(chip.label);
  };

  const executeCta = (type) => {
    if (type === 'spaces') {
      document.getElementById('spaces')?.scrollIntoView({ behavior: 'smooth' });
    } else if (type === 'products') {
      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
    } else if (type === 'calculator') {
      document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
    } else if (type === 'consultation') {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    } else if (type === 'whatsapp') {
      openWhatsAppChat(currentIndustry.contactInfo.rawPhone, currentIndustry.whatsappTemplates.welcome);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="floating-chatbot-trigger-wrap">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="floating-chatbot-btn"
          aria-label="Open Smart Business Concierge Chat"
          aria-expanded={isOpen}
        >
          <div className="bot-status-dot" />
          <Bot size={18} />
          <span>Concierge</span>
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window" role="dialog" aria-label="Smart Business Concierge">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-title-group">
              <div className="bot-avatar-icon">
                <Bot size={18} />
              </div>
              <div>
                <div className="bot-name">Smart Business Concierge</div>
                <div className="bot-desc-sub">● Online Assistant</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="bot-close-btn"
              aria-label="Close concierge chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Stream */}
          <div className="chatbot-messages-area">
            {messages.map((m) => (
              <div key={m.id} className={`chat-bubble ${m.sender}`}>
                <p>{m.text}</p>
                {m.ctaType && (
                  <button
                    type="button"
                    onClick={() => executeCta(m.ctaType)}
                    className="btn btn-outline btn-sm"
                    style={{ marginTop: '8px', fontSize: '0.78rem', padding: '6px 12px' }}
                  >
                    <span>View {m.ctaType}</span>
                    <ArrowRight size={13} />
                  </button>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="typing-dots-bubble" aria-label="Concierge is typing">
                <div className="typing-dot" />
                <div className="typing-dot" />
                <div className="typing-dot" />
              </div>
            )}

            {/* Quick Actions Chips */}
            {messages.length <= 3 && !isTyping && (
              <div className="chat-chips-row">
                {quickActions.map((chip) => (
                  <button
                    key={chip.id}
                    type="button"
                    onClick={() => handleChipClick(chip)}
                    className="chat-quick-chip"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="chatbot-input-bar"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about spaces, pods, ROI..."
              className="chatbot-input"
            />
            <button
              type="submit"
              className="chatbot-send-btn"
              aria-label="Send message to concierge"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
