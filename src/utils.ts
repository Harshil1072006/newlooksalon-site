// ─────────────────────────────────────────────────────────────────────────────
// utils.ts — Shared helper functions
// ─────────────────────────────────────────────────────────────────────────────

import { config } from './config';

/** Build a WhatsApp deep link. Returns null if whatsappNumber is not configured. */
export function buildWhatsAppLink(message?: string): string | null {
  if (!config.whatsappNumber) return null;
  const encoded = encodeURIComponent(message || 'Hi New Look Salon, I want to book an appointment.');
  return `https://wa.me/${config.whatsappNumber}?text=${encoded}`;
}

/** Open WhatsApp. Falls back gracefully if number not configured. */
export function openWhatsApp(message?: string): void {
  const link = buildWhatsAppLink(message);
  if (!link) {
    alert('WhatsApp number not configured yet.');
    return;
  }
  window.open(link, '_blank', 'noopener');
}

/** Build a phone tel: link. Returns null if phone not configured. */
export function buildCallLink(): string | null {
  if (!config.phone) return null;
  return `tel:${config.phone.replace(/\s/g, '')}`;
}

/** Open phone dialer. */
export function openCall(): void {
  const link = buildCallLink();
  if (!link) {
    alert('Phone number not configured yet.');
    return;
  }
  window.location.href = link;
}

/** Open Google Maps directions. */
export function openDirections(): void {
  if (!config.googleMapsUrl) {
    alert('Location not configured yet.');
    return;
  }
  window.open(config.googleMapsUrl, '_blank', 'noopener');
}

/** Open Google Business Profile. */
export function openGoogleBusiness(): void {
  if (!config.googleBusinessUrl) {
    alert('Google listing not configured yet.');
    return;
  }
  window.open(config.googleBusinessUrl, '_blank', 'noopener');
}

/** Open Google Review link. */
export function openGoogleReview(): void {
  if (!config.googleReviewUrl) {
    alert('Review link not configured yet.');
    return;
  }
  window.open(config.googleReviewUrl, '_blank', 'noopener');
}

/** Download a vCard to save contact */
export function saveContact(): void {
  const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${config.name}
TEL;TYPE=WORK,VOICE:${config.phone || ''}
TEL;TYPE=WORK,CELL:${config.whatsappNumber ? '+' + config.whatsappNumber : ''}
ADR;TYPE=WORK,PREF:;;${config.address || ''};${config.city || ''};${config.state || ''};${config.pincode || ''};India
URL:${config.websiteUrl || ''}
END:VCARD`;

  // Use a data URI and navigate to it, which often bypasses "harmful file" download prompts on mobile
  // and directly opens the OS Contacts app handler.
  const dataUri = 'data:text/vcard;charset=utf-8,' + encodeURIComponent(vcard);
  window.location.href = dataUri;
}
