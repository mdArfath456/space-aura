-- ============================================================================
-- AuraSpace Systems - Supabase PostgreSQL Database Schema
-- Focus: Website Content Management & Public Lead / Contact Inquiries
-- ============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Table: products
-- Catalog of workspace pods, acoustic partitions, intelligent lighting & controls
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(120) UNIQUE NOT NULL,
    industry_id VARCHAR(50) DEFAULT 'workspace',
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    tagline VARCHAR(255),
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    features JSONB DEFAULT '[]'::jsonb,
    specifications JSONB DEFAULT '{}'::jsonb,
    materials JSONB DEFAULT '[]'::jsonb,
    dimensions VARCHAR(100),
    acoustic_rating VARCHAR(50),
    lead_time VARCHAR(50) DEFAULT '2-4 Weeks',
    is_published BOOLEAN DEFAULT true,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast category and slug retrieval
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products (slug);
CREATE INDEX IF NOT EXISTS idx_products_industry ON public.products (industry_id);
CREATE INDEX IF NOT EXISTS idx_products_published ON public.products (is_published);

-- 2. Table: gallery_spaces
-- Architectural showcase spaces, executive pods, conference hubs
CREATE TABLE IF NOT EXISTS public.gallery_spaces (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(120) UNIQUE NOT NULL,
    industry_id VARCHAR(50) DEFAULT 'workspace',
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    short_description TEXT NOT NULL,
    full_description TEXT,
    image_url TEXT NOT NULL,
    additional_images JSONB DEFAULT '[]'::jsonb,
    highlights JSONB DEFAULT '[]'::jsonb,
    materials JSONB DEFAULT '[]'::jsonb,
    square_footage INT,
    capacity VARCHAR(50),
    noise_reduction_coef VARCHAR(20) DEFAULT '0.85 NRC',
    is_featured BOOLEAN DEFAULT true,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_gallery_spaces_slug ON public.gallery_spaces (slug);
CREATE INDEX IF NOT EXISTS idx_gallery_spaces_industry ON public.gallery_spaces (industry_id);

-- 3. Table: leads
-- Interactive Impact Calculator enquiries and Space / Product WhatsApp / web leads
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_type VARCHAR(50) NOT NULL DEFAULT 'calculator_assessment', -- 'calculator_assessment', 'space_enquiry', 'product_quote'
    reference_item_id VARCHAR(120),
    reference_item_name VARCHAR(255),
    name VARCHAR(150),
    email VARCHAR(255),
    phone VARCHAR(50),
    company_name VARCHAR(150),
    workspace_sqft INT,
    employee_count INT,
    meeting_rooms_count INT,
    automation_level VARCHAR(50),
    estimated_annual_savings NUMERIC(12, 2),
    projected_energy_reduction VARCHAR(30),
    recommended_package VARCHAR(150),
    preferred_channel VARCHAR(30) DEFAULT 'whatsapp', -- 'whatsapp', 'email', 'phone'
    status VARCHAR(50) DEFAULT 'new', -- 'new', 'contacted', 'qualified'
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_type ON public.leads (lead_type);

-- 4. Table: contact_submissions
-- General inquiries from the contact form
CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(150),
    requirement_type VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    source VARCHAR(50) DEFAULT 'website_contact_form',
    status VARCHAR(50) DEFAULT 'received',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contact_created_at ON public.contact_submissions (created_at DESC);
