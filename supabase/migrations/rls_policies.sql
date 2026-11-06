-- ============================================================================
-- AuraSpace Systems - Supabase Row Level Security (RLS) Policies
-- Ensures public read for catalogs, and secure INSERT-only for visitor leads
-- ============================================================================

-- 1. Enable RLS on all tables
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_spaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- 2. Products Table Policies:
-- Public can read all published products
CREATE POLICY "Public read published products"
    ON public.products
    FOR SELECT
    USING (is_published = true);

-- 3. Gallery Spaces Table Policies:
-- Public can read all published architectural gallery spaces
CREATE POLICY "Public read published gallery spaces"
    ON public.gallery_spaces
    FOR SELECT
    USING (is_featured IS NOT NULL);

-- 4. Leads Table Policies:
-- Anonymous and public visitors can insert calculator assessments & quote enquiries
CREATE POLICY "Allow public insert of leads"
    ON public.leads
    FOR INSERT
    WITH CHECK (
        lead_type IS NOT NULL
        AND (email IS NOT NULL OR phone IS NOT NULL)
    );

-- Crucial: NO public SELECT policy on leads!
-- Visitors cannot read or dump customer contact lists or estimates.

-- 5. Contact Submissions Table Policies:
-- Anonymous and public visitors can submit the contact form
CREATE POLICY "Allow public insert of contact submissions"
    ON public.contact_submissions
    FOR INSERT
    WITH CHECK (
        char_length(full_name) >= 2
        AND char_length(email) >= 5
        AND char_length(message) >= 5
    );

-- Crucial: NO public SELECT policy on contact_submissions!
-- Visitors cannot read past customer inquiries.
