# AuraSpace Systems | Enterprise Spatial Automation & Acoustic Architecture

A cinematic, interactive, production-quality official website and universal presentation prototype for **AuraSpace Systems** (Smart Workspace Automation & Acoustic Architecture), built with React, Three.js, GSAP, and Supabase.

---

## 🏛️ Project Overview

AuraSpace Systems designs intelligent office environments, acoustic meeting spaces, smart circadian lighting systems, modular office pods, and modern workspace interiors for enterprise organizations.

### Key Highlights
- **Cinematic Architecture**: Editorial visual hierarchy, deep slate palette (`#0B0F17`), electric indigo, and teal accents with glassmorphism.
- **Universal Industry Switcher**: Built-in presentation switcher demonstrating instant adaptability across 4 high-value industries:
  1. *Smart Workspace Automation* (AuraSpace Systems)
  2. *Precision Manufacturing* (Veloce Robotics & Automation)
  3. *Industrial Logistics* (NexusFreight Systems)
  4. *Renewable Energy Solutions* (AeroWatt Clean Energy)
- **3D Procedural Three.js Models**:
  - Live procedural architectural hologram in the Hero section.
  - Interactive 360-degree digital twin product viewer with OrbitControls, material finish customizer, auto-rotation, and exploded-view parts slider.
  - Collapsible unified bottom control dock ensuring zero viewport occlusion.
- **Realistic 3D Card Flip Showcase**: Touch- and click-enabled 3D card flips displaying specifications, engineering features, and direct WhatsApp quote buttons.
- **Interactive Space Gallery**: Filterable architectural spaces with detail modal and contextual WhatsApp inquiry buttons.
- **Business Impact & ROI Calculator**: Instant modeling of energy savings, cognitive focus gains, and acoustic privacy ratings.
- **Smart Business Concierge**: Interactive session chatbot with quick-action chips guiding visitors to spaces, products, price estimates, and consultation bookings.
- **Official WhatsApp Click-to-Chat**: Contextual pre-filled messages on every space, product, and calculation.
- **Supabase PostgreSQL & Security**:
  - Database schema (`products`, `gallery_spaces`, `leads`, `contact_submissions`).
  - Row Level Security (RLS) policies protecting customer privacy while allowing public reads and lead insertions.
  - Graceful persistent local demonstration fallback when live database credentials are not present.
- **Full Legal Suite**: Dedicated Terms & Conditions, Privacy Policy, Cookie Policy, and Communication Policy.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, React Router 7, Vite
- **Language**: JavaScript & JSX only (no TypeScript / TSX in application layer)
- **Styling**: Modular CSS files & design tokens (`src/styles/*.css`), zero Tailwind dependency
- **Animation**: Three.js, GSAP, OrbitControls
- **Icons**: Lucide React
- **Backend / Database**: Supabase PostgreSQL with Row Level Security (RLS)
- **Testing**: Node.js test runner (`node:test`)

---

## 🚀 Installation & Local Development

1. **Clone and Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment Variables** (optional for Supabase live sync):
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL="https://your-project.supabase.co"
   VITE_SUPABASE_ANON_KEY="your-anon-key"
   VITE_WHATSAPP_PHONE="15558928721"
   ```
   *Note: If credentials are not provided, the website runs in demonstration mode with persistent local storage for inquiries.*

3. **Database Migration (Supabase)**:
   Run the SQL scripts in order in your Supabase SQL Editor:
   - `supabase/migrations/schema.sql`
   - `supabase/migrations/rls_policies.sql`
   - `supabase/seed.sql`

4. **Run Unit Tests**:
   ```bash
   npx --yes tsx --test src/utils/calculatorLogic.test.js
   ```

5. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Access at `http://localhost:3000`.

6. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 📁 Project Structure

```
├── .env.example
├── index.html
├── metadata.json
├── package.json
├── README.md
├── src/
│   ├── components/
│   │   ├── Navbar/
│   │   ├── Hero/
│   │   ├── Solutions/
│   │   ├── SpaceGallery/
│   │   ├── ProductGallery/
│   │   ├── ProductViewer/
│   │   ├── Process/
│   │   ├── ImpactCalculator/
│   │   ├── CaseStudies/
│   │   ├── Testimonials/
│   │   ├── Contact/
│   │   ├── Chatbot/
│   │   ├── WhatsAppButton/
│   │   ├── Footer/
│   │   ├── IndustrySwitcher/
│   │   └── Modals/
│   ├── config/
│   │   └── businessConfig.js
│   ├── hooks/
│   │   └── useIndustry.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Terms.jsx
│   │   ├── Privacy.jsx
│   │   ├── CookiePolicy.jsx
│   │   └── CommunicationPolicy.jsx
│   ├── services/
│   │   ├── supabaseClient.js
│   │   └── whatsappService.js
│   ├── utils/
│   │   ├── calculatorLogic.js
│   │   └── calculatorLogic.test.js
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
└── supabase/
    ├── migrations/
    │   ├── schema.sql
    │   └── rls_policies.sql
    └── seed.sql
```
