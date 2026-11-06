import React from 'react';
import Hero from '../components/Hero/Hero.jsx';
import Solutions from '../components/Solutions/Solutions.jsx';
import SpaceGallery from '../components/SpaceGallery/SpaceGallery.jsx';
import ProductGallery from '../components/ProductGallery/ProductGallery.jsx';
import Process from '../components/Process/Process.jsx';
import ImpactCalculator from '../components/ImpactCalculator/ImpactCalculator.jsx';
import CaseStudies from '../components/CaseStudies/CaseStudies.jsx';
import Testimonials from '../components/Testimonials/Testimonials.jsx';
import Contact from '../components/Contact/Contact.jsx';

export default function Home() {
  return (
    <main>
      <Hero />
      <Solutions />
      <SpaceGallery />
      <ProductGallery />
      <Process />
      <ImpactCalculator />
      <CaseStudies />
      <Testimonials />
      <Contact />
    </main>
  );
}
