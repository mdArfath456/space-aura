/**
 * WhatsApp Click-to-Chat Service
 * Generates official wa.me direct URLs with contextual prefilled messages.
 */

export function buildWhatsAppUrl(phone, rawMessage) {
  // Clean phone: strip any non-digit characters (e.g. '+', ' ', '(', ')')
  const cleanPhone = String(phone || '').replace(/\D/g, '');
  const encodedText = encodeURIComponent(rawMessage || '');
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}

export function openWhatsAppChat(phone, message) {
  const url = buildWhatsAppUrl(phone, message);
  if (typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
  return url;
}
