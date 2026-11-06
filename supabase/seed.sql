-- ============================================================================
-- AuraSpace Systems - Demonstration Seed Data
-- ============================================================================

-- Clear existing data if needed
TRUNCATE TABLE public.products CASCADE;
TRUNCATE TABLE public.gallery_spaces CASCADE;

-- Insert Products
INSERT INTO public.products (slug, industry_id, name, category, tagline, description, image_url, features, specifications, materials, dimensions, acoustic_rating, display_order)
VALUES
(
    'smart-acoustic-meeting-pod',
    'workspace',
    'AuraPod Pro Executive Meeting Pod',
    'Acoustic Architecture',
    'Autonomous sound isolation with adaptive circadian ventilation',
    'A self-contained modular executive pod engineered with multi-layer recycled PET composite acoustics, motorized double-glazed acoustic acoustic glass, and integrated environmental sensors.',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    '["Class A Acoustic Decibel Dampening (32dB Speech Isolation)", "Automated Positive-Pressure Air Exchange (Every 90s)", "Circadian Tunable Lighting Matrix (2700K - 6500K)", "Integrated Occupancy Sensing & Touch Display", "Wireless Fast-Charging & USB-C Thunderbolt Docking"]'::jsonb,
    '{"Power Draw": "48W Max", "Ventilation": "120 m³/h ultra-silent fan", "Glass": "10.8mm laminated acoustic glass", "Connectivity": "Wi-Fi 6, BLE 5.2, Matter/Thread", "Weight": "380 kg"}'::jsonb,
    '["Nordic Oak Exterior Veneer", "Acoustic Recycled PET Felt", "Anodized Architectural Aluminum", "Tempered Laminated Glass"]'::jsonb,
    '2200mm H × 1800mm W × 1200mm D',
    'Speech Level Reduction Ds,A: 32 dB',
    1
),
(
    'intelligent-lighting-system',
    'workspace',
    'LuminaGrid Circadian Matrix',
    'Smart Lighting Systems',
    'Human-centric dynamic architectural lighting synchronized with solar cycles',
    'Suspended architectural linear luminaires utilizing ultra-low glare prismatic optics, integrated ambient light harvesting, and real-time Kelvin temperature shifting.',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
    '["Sun-Synchronous Circadian Kelvin Curve (1800K-6500K)", "Integrated Daylight Harvesting Micro-Sensors", "Micro-Prismatic Glare Suppression (UGR < 14)", "DALI-2 / BACnet / Zigbee / Matter Mesh Ready", "Zero-Flicker Continuous Dimming to 0.1%"]'::jsonb,
    '{"Luminous Efficacy": "145 lm/W", "CRI": "Ra > 97, R9 > 90", "Lifespan": "100,000 Hours (L90B10)", "Voltage": "100-277V AC Auto-Sensing"}'::jsonb,
    '["Extruded 6063-T6 Aluminum", "Optical PMMA Diffuser", "Matte Powder-Coat Finish"]'::jsonb,
    '1500mm / 2400mm / 3000mm Modular Lengths',
    'Silent Passive Solid-State Thermal Control',
    2
),
(
    'environmental-control-hub',
    'workspace',
    'NexusCore Enterprise IoT Gateway',
    'Intelligent Workspace Automation',
    'Centralized acoustic, temperature, VOC, and air quality telemetry console',
    'Wall-mounted architectural glass console providing hyper-local ambient intelligence, dynamic HVAC dampening, and automated pod availability scheduling.',
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    '["Continuous TVOC, CO2, PM2.5, Humidity & Temperature Telemetry", "Ambient Decibel & Noise Spike Spectrum Mapping", "BMS Integration via BACnet IP, Modbus, MQTT & REST API", "OLED Edge-to-Edge Touch Interface with Haptic Feedback", "Predictive HVAC Energy Optimization Algorithms"]'::jsonb,
    '{"Display": "7-inch Ultra-Clear Haptic Glass", "Sensors": "Swiss NDIR CO2, Laser PM2.5", "Power": "PoE+ (IEEE 802.3at) or 24V DC", "Certifications": "WELL Building Standard v2 Aligned"}'::jsonb,
    '["Corning Gorilla Glass 5", "CNC Machined Aerospace Aluminum", "Ceramic Coating"]'::jsonb,
    '195mm H × 130mm W × 18mm D',
    'Acoustic Sensing 20Hz - 20kHz',
    3
),
(
    'modular-workspace-furniture',
    'workspace',
    'AuraFlex Adaptive Acoustic Workstation',
    'Modular Workspace Furniture',
    'Configurable motorized acoustic desking with embedded cable management',
    'Ergonomic dual-motor sit-to-stand architectural workstations with sound-absorbing perimeter baffles, integrated Qi wireless charging, and anti-collision technology.',
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
    '["Whisper-Quiet Synchronized Dual Lift Motors (< 38 dB)", "Class A Acoustic Privacy Surround Panels", "Integrated Flush Cable Spine & Power Infeed", "Personalized Height Memory with Smartphone Handshake", "Solid Faux-Marble & Sustainable Hardwood Surfaces"]'::jsonb,
    '{"Height Range": "620mm - 1280mm", "Lift Capacity": "140 kg Dynamic Load", "Motor Warranty": "10-Year Commercial Duty"}'::jsonb,
    '["Acoustic Composite PET", "Sustainable Forest Certified Birch/Oak", "Heavy-Gauge Steel Frame"]'::jsonb,
    '1600mm W × 800mm D × 620-1280mm H',
    'Baffle NRC Rating: 0.80',
    4
);

-- Insert Gallery Spaces
INSERT INTO public.gallery_spaces (slug, industry_id, title, category, short_description, full_description, image_url, additional_images, highlights, materials, square_footage, capacity, noise_reduction_coef, display_order)
VALUES
(
    'executive-workspaces',
    'workspace',
    'Monolith Executive Acoustic Suite',
    'Executive Workspaces',
    'Private executive retreat featuring automated acoustic timber paneling, concealed climate registers, and circadian lighting.',
    'Engineered for senior leadership requiring absolute acoustic confidentiality, high-definition conferencing clarity, and uninterrupted cognitive focus. Features motorized acoustic louvers, concealed sub-floor air distribution, and automated privacy glass.',
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80',
    '["https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"]'::jsonb,
    '["STC 54 Sound Transmission Classification", "Integrated 4K Telepresence Audio Array", "Circadian Biophilic Skylight Emulation", "Concealed Motorized Electrochromic Smart Glass"]'::jsonb,
    '["American Black Walnut Slat Acoustical Wall", "Italian Matte Basalt Slab Desking", "Anodized Gunmetal Architectural Trim", "Cashmere Wool Acoustic Upholstery"]'::jsonb,
    450,
    '1-4 Persons',
    '0.92 NRC',
    1
),
(
    'collaborative-offices',
    'workspace',
    'Synapse Biophilic Collaborative Floor',
    'Collaborative Offices',
    'Open-plan collaborative ecosystem with active sound masking and modular acoustic pods.',
    'An agile open-plan architecture designed for international corporate headquarters. Combines directional acoustic canopy baffles with pink-noise sound masking so teams can debate and brainstorm without disturbing nearby focused work zones.',
    'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
    '["https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80"]'::jsonb,
    '["Omnidirectional Active Pink-Noise Sound Masking", "Custom Suspended Acoustic Felt Canopies", "Dynamic Occupancy Heatmap Sensing", "Modular Magnetic Power Grid"]'::jsonb,
    '["Recycled Ocean Plastic Acoustic Felt", "Natural White Ash Flooring", "Recycled Aluminum Structurals"]'::jsonb,
    3200,
    '30-60 Team Members',
    '0.88 NRC',
    2
),
(
    'smart-meeting-rooms',
    'workspace',
    'Apex Hybrid Boardroom & Conference Hub',
    'Smart Meeting Rooms',
    'Acoustically tuned 16-person conference room with beamforming mic ceilings and one-touch automation.',
    'Designed for frictionless international enterprise meetings. Integrates invisible ceiling microphone tiles, automated camera tracking, multi-zone acoustic dampening, and automated light scenes calibrated for ultra-sharp video calls.',
    'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
    '["https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1200&q=80"]'::jsonb,
    '["Zero Echo Reverberation (< 0.35s RT60)", "Dual 85-inch 4K High Dynamic Range Video Walls", "Auto-Framing 4K Studio Cameras", "Custom Motorized Cable Wells"]'::jsonb,
    '["Micro-Perforated Acoustic Veneer Panels", "Acoustic Double-Glazing", "Solid Travertine Conference Table"]'::jsonb,
    820,
    '16-20 Executives',
    '0.90 NRC',
    3
),
(
    'acoustic-conference-pods',
    'workspace',
    'Vortex Quad Modular Phone & Focus Pods',
    'Acoustic Conference Pods',
    'Pre-fabricated autonomous privacy modules that drop into any existing commercial floor plate.',
    'Eliminates the cost and delay of drywall construction. Vortex Pods feature independent seismic certification, integrated air circulation with medical-grade HEPA filters, and certified acoustic isolation.',
    'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=1200&q=80',
    '["https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80"]'::jsonb,
    '["Plug-and-Play Quick Connect 110-240V Power", "Integrated HEPA H13 Air Purification", "Magnetic Latch Dual Sound Seals", "Ergonomic High-Resilience Seating"]'::jsonb,
    '["Steel Spaceframe Chassis", "Laminated Security Acoustic Glass", "Sound-Absorbing Wool Felt Lining"]'::jsonb,
    65,
    '1-2 Individuals',
    '0.94 NRC',
    4
),
(
    'creative-studios',
    'workspace',
    'Prism Spatial Innovation Lab',
    'Creative Studios',
    'High-energy design studio with magnetic movable acoustic dividers and ambient multi-color lighting.',
    'Crafted for industrial designers, software architects, and creative directors. Features writable magnetic acoustic walls, height-adjustable mobile pinboards, and full spectrum RGB+W lighting to reflect workshop moods.',
    'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1200&q=80',
    '["https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80"]'::jsonb,
    '["Movable Acoustic Wall Partitions on Concealed Rails", "High-CRI 98 Color-Critical Workspace Luminaires", "Interactive Digital Whiteboards", "Integrated 3D Prototyping Clean Air Extractors"]'::jsonb,
    '["Magnetic White Ceramic Steel", "Perforated Cork & Felt Baffles", "Polished Terrazzo Flooring"]'::jsonb,
    1400,
    '12-24 Creators',
    '0.84 NRC',
    5
),
(
    'modern-reception-areas',
    'workspace',
    'Horizon Corporate Welcome Pavilion',
    'Modern Reception Areas',
    'Monumental welcome atrium combining sculptural parametric acoustic ceilings with visitor concierge automation.',
    'Creates an indelible first impression for enterprise clients and investors. Features a custom parametric timber slat ceiling that absorbs lobby reverberation, combined with subtle low-level floor lighting and an automated visitor check-in kiosk.',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    '["https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80"]'::jsonb,
    '["Parametric Algorithmic Timber Acoustic Waves", "Seamless Hidden Audio Ambient Soundscape", "Integrated Interactive Digital Brand Display", "Architectural Stone Reception Plinth"]'::jsonb,
    '["Fumed Oak Slats", "Honed Calacatta Marble", "Matte Bronze Trim", "Recessed LED Channels"]'::jsonb,
    1800,
    'Atrium Gathering Space',
    '0.86 NRC',
    6
);
