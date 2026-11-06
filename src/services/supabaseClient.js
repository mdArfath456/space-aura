/**
 * Supabase Client & Data Service for AuraSpace Systems
 * Connects to live Supabase backend when environment credentials exist.
 * Seamlessly provides persistent local client-side storage when credentials
 * are not yet injected, ensuring zero broken interactions in demonstration mode.
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isLiveSupabase = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.startsWith('http') &&
  !supabaseUrl.includes('YOUR_SUPABASE')
);

export const supabase = isLiveSupabase
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false },
    })
  : null;

// Local persistent store keys for demo mode
const LOCAL_LEADS_KEY = 'auraspace_demo_leads';
const LOCAL_CONTACTS_KEY = 'auraspace_demo_contacts';

function getLocalStore(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalStore(key, item) {
  try {
    const list = getLocalStore(key);
    list.unshift({ ...item, id: crypto.randomUUID(), created_at: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(list));
    return list[0];
  } catch {
    return { ...item, id: String(Date.now()), created_at: new Date().toISOString() };
  }
}

/**
 * Submit Contact Form Enquiry
 */
export async function submitContactForm({ fullName, email, phone, company, requirementType, message }) {
  const payload = {
    full_name: fullName,
    email,
    phone: phone || null,
    company: company || null,
    requirement_type: requirementType,
    message,
    source: 'website_contact_form',
    status: 'received',
  };

  if (isLiveSupabase && supabase) {
    const { data, error } = await supabase.from('contact_submissions').insert([payload]).select();
    if (error) {
      console.warn('Supabase insert failed, falling back to local persistent store:', error.message);
      const saved = saveLocalStore(LOCAL_CONTACTS_KEY, payload);
      return { success: true, isDemo: true, data: saved, warning: error.message };
    }
    return { success: true, isDemo: false, data: data?.[0] };
  }

  // Demonstration mode
  const saved = saveLocalStore(LOCAL_CONTACTS_KEY, payload);
  return { success: true, isDemo: true, data: saved };
}

/**
 * Submit Lead (Calculator or Space/Product Quote)
 */
export async function submitLead(leadData) {
  const payload = {
    lead_type: leadData.leadType || 'calculator_assessment',
    reference_item_id: leadData.referenceItemId || null,
    reference_item_name: leadData.referenceItemName || null,
    name: leadData.name || null,
    email: leadData.email || null,
    phone: leadData.phone || null,
    company_name: leadData.companyName || null,
    workspace_sqft: leadData.workspaceSqft || null,
    employee_count: leadData.employeeCount || null,
    meeting_rooms_count: leadData.meetingRoomsCount || null,
    automation_level: leadData.automationLevel || null,
    estimated_annual_savings: leadData.estimatedAnnualSavings || null,
    projected_energy_reduction: leadData.projectedEnergyReduction || null,
    recommended_package: leadData.recommendedPackage || null,
    preferred_channel: leadData.preferredChannel || 'whatsapp',
    status: 'new',
    metadata: leadData.metadata || {},
  };

  if (isLiveSupabase && supabase) {
    const { data, error } = await supabase.from('leads').insert([payload]).select();
    if (error) {
      console.warn('Supabase insert failed, falling back to local demo storage:', error.message);
      const saved = saveLocalStore(LOCAL_LEADS_KEY, payload);
      return { success: true, isDemo: true, data: saved, warning: error.message };
    }
    return { success: true, isDemo: false, data: data?.[0] };
  }

  const saved = saveLocalStore(LOCAL_LEADS_KEY, payload);
  return { success: true, isDemo: true, data: saved };
}
