import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { IndustryProvider } from './hooks/useIndustry.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton.jsx';
import Chatbot from './components/Chatbot/Chatbot.jsx';
import Home from './pages/Home.jsx';
import Terms from './pages/Terms.jsx';
import Privacy from './pages/Privacy.jsx';
import CookiePolicy from './pages/CookiePolicy.jsx';
import CommunicationPolicy from './pages/CommunicationPolicy.jsx';

import './styles/main.css';

export default function App() {
  return (
    <IndustryProvider>
      <BrowserRouter>
        <div className="site-wrapper">
          <Navbar />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/cookies" element={<CookiePolicy />} />
            <Route path="/communication-policy" element={<CommunicationPolicy />} />
            <Route path="*" element={<Home />} />
          </Routes>

          <Footer />
          <WhatsAppButton />
          <Chatbot />
        </div>
      </BrowserRouter>
    </IndustryProvider>
  );
}
