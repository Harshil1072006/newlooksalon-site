// ─────────────────────────────────────────────────────────────────────────────
// utils.ts — Shared helper functions (device-aware)
// ─────────────────────────────────────────────────────────────────────────────

import { config } from './config';
import {
  openWhatsAppSmart,
  openDirectionsSmart,
  openInstagramSmart,
  openFacebookSmart,
  openGoogleReviewSmart,
  saveContactSmart,
} from './device';

// ─────────────────────────────────────────────────────────────────────────────
// WhatsApp
// Mobile  → whatsapp:// app deep link, falls back to wa.me
// Desktop → web.whatsapp.com in new tab
// ─────────────────────────────────────────────────────────────────────────────
export function buildWhatsAppLink(message?: string): string | null {
  if (!config.whatsappNumber) return null;
  const encoded = encodeURIComponent(message || 'Hi New Look Salon, I want to book an appointment.');
  return `https://wa.me/${config.whatsappNumber}?text=${encoded}`;
}

export function openWhatsApp(message?: string): void {
  if (!config.whatsappNumber) {
    alert('WhatsApp number not configured yet.');
    return;
  }
  openWhatsAppSmart(
    config.whatsappNumber,
    message || 'Hi New Look Salon, I want to book an appointment.'
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Phone
// ─────────────────────────────────────────────────────────────────────────────
export function buildCallLink(): string | null {
  if (!config.phone) return null;
  return `tel:${config.phone.replace(/\s/g, '')}`;
}

export function openCall(): void {
  const link = buildCallLink();
  if (!link) {
    alert('Phone number not configured yet.');
    return;
  }
  window.location.href = link;
}

// ─────────────────────────────────────────────────────────────────────────────
// Directions
// Mobile iOS     → maps:// (Apple Maps / default maps app)
// Mobile Android → geo: URI (any installed maps app)
// Desktop        → maps.google.com in new tab
// ─────────────────────────────────────────────────────────────────────────────
export function openDirections(): void {
  if (!config.googleMapsUrl) {
    alert('Location not configured yet.');
    return;
  }
  openDirectionsSmart(
    config.googleMapsUrl,
    'New Look Salon, Anand, Gujarat, India'
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Instagram
// Mobile  → instagram:// app deep link, falls back to web
// Desktop → instagram.com in new tab
// ─────────────────────────────────────────────────────────────────────────────
export function openInstagram(): void {
  if (!config.instagramUrl) return;
  // Extract username from URL, e.g. "https://www.instagram.com/newlooksalon_anand/"
  const match = config.instagramUrl.match(/instagram\.com\/([^/?#]+)/);
  const username = match ? match[1] : '';
  openInstagramSmart(config.instagramUrl, username);
}

// ─────────────────────────────────────────────────────────────────────────────
// Facebook
// Mobile  → fb:// app deep link, falls back to web
// Desktop → facebook.com in new tab
// ─────────────────────────────────────────────────────────────────────────────
export function openFacebook(): void {
  if (!config.facebookUrl) return;
  // Pass undefined for pageId — if you get the numeric Page ID from Facebook
  // Business Manager, add it to config as config.facebookPageId and pass it here.
  openFacebookSmart(config.facebookUrl, undefined);
}

// ─────────────────────────────────────────────────────────────────────────────
// Google Review
// Mobile  → Google Maps app deep link
// Desktop → review URL in new tab
// ─────────────────────────────────────────────────────────────────────────────
export function openGoogleReview(): void {
  if (!config.googleReviewUrl) {
    alert('Review link not configured yet.');
    return;
  }
  // Pass undefined for placeId — if you get the Google Place ID (starts with
  // ChIJ...) from Google Business Profile, add it as config.googlePlaceId.
  openGoogleReviewSmart(config.googleReviewUrl, undefined);
}

// Keep for legacy callers
export function openGoogleBusiness(): void {
  if (!config.googleBusinessUrl) {
    alert('Google listing not configured yet.');
    return;
  }
  window.open(config.googleBusinessUrl, '_blank', 'noopener');
}

// ─────────────────────────────────────────────────────────────────────────────
// Save Contact (vCard)
// Mobile  → data:text/vcard URI navigates current tab → OS Contacts sheet
// Desktop → Blob URL download via hidden <a> → "Save File" dialog
// ─────────────────────────────────────────────────────────────────────────────
export function saveContact(): void {
  // Build vCard 3.0 (universally supported by iOS Contacts, Android, Outlook,
  // Google Contacts, macOS Contacts and Windows People app)
  const phone = config.phone ? config.phone.replace(/\s/g, '') : '';
  const wa = config.whatsappNumber ? `+${config.whatsappNumber}` : phone;

  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${config.name}`,
    `ORG:${config.name}`,
    // Work phone
    phone ? `TEL;TYPE=WORK,VOICE:${phone}` : '',
    // WhatsApp number (labelled as CELL so apps show it separately)
    wa && wa !== phone ? `TEL;TYPE=WORK,CELL:${wa}` : '',
    // Address — only include fields that are set to avoid blank commas
    `ADR;TYPE=WORK,PREF:;;${config.address || ''};${config.city || ''};${config.state || ''};${config.pincode || ''};India`,
    config.websiteUrl ? `URL:${config.websiteUrl}` : '',
    config.instagramUrl ? `X-SOCIALPROFILE;type=instagram:${config.instagramUrl}` : '',
    `NOTE:Women's Salon in ${config.city}\\, ${config.state}. ${config.tagline}`,
    'END:VCARD',
  ]
    .filter(Boolean)   // Remove empty lines
    .join('\r\n');     // vCard spec requires CRLF line endings

  saveContactSmart(vcard, 'NewLookSalon.vcf');
}
