// ─────────────────────────────────────────────────────────────────────────────
// device.ts — Smart device detection & deep-link helpers
// ─────────────────────────────────────────────────────────────────────────────
//
// WHY NOT JUST USER-AGENT?
// UA strings are easy to spoof and Apple/Google keep changing them.
// We combine three signals for maximum reliability:
//   1. navigator.maxTouchPoints  → hardware reality (touch screen present?)
//   2. window.matchMedia pointer:coarse → CSS-level pointer accuracy
//   3. UA string as a tie-breaker only when the above are ambiguous
//
// This correctly handles:
//   • iPhone (Safari, Chrome)
//   • Android (Chrome, Samsung Internet, Firefox)
//   • iPad in "desktop mode" (UA reports Mac, but touchpoints>0 catches it)
//   • Windows touch-screen laptops (pointer:fine wins → treated as desktop)
//   • macOS / Windows / Linux desktops (no touch points)
// ─────────────────────────────────────────────────────────────────────────────

/** Returns true when running on a genuine touch-primary mobile/tablet device. */
export function isMobileDevice(): boolean {
  // Primary signal: does the hardware have touch input?
  const hasTouch = navigator.maxTouchPoints > 0;

  // Secondary signal: CSS media pointer (coarse = finger, fine = mouse)
  const pointerCoarse =
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: coarse)').matches;

  // If both agree → clear answer.
  if (hasTouch && pointerCoarse) return true;   // clear mobile/tablet
  if (!hasTouch && !pointerCoarse) return false; // clear desktop

  // Ambiguous (e.g. touch laptop, old UA): fall back to UA string
  return /android|iphone|ipad|ipod|mobile|tablet/i.test(navigator.userAgent);
}

/** Returns true specifically on iOS (iPhone or iPad). */
export function isIOS(): boolean {
  return /iphone|ipad|ipod/i.test(navigator.userAgent) ||
    // iPad in desktop mode reports "Macintosh" UA but has touchPoints > 1
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

/** Returns true on Android. */
export function isAndroid(): boolean {
  return /android/i.test(navigator.userAgent);
}

// ─────────────────────────────────────────────────────────────────────────────
// Safe navigation helper
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Open a URL in a new browser tab.
 * Uses rel="noopener noreferrer" equivalent via the windowFeatures parameter.
 */
function openInNewTab(url: string): void {
  const win = window.open(url, '_blank', 'noopener,noreferrer');
  // Some browsers return null if popup was blocked — no silent failure
  if (!win) window.location.href = url;
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. WHATSAPP
// ─────────────────────────────────────────────────────────────────────────────

export function openWhatsAppSmart(phone: string, message: string): void {
  const encoded = encodeURIComponent(message);
  if (isMobileDevice()) {
    // Universal link — OS will intercept and open WhatsApp app if installed
    openInNewTab(`https://wa.me/${phone}?text=${encoded}`);
  } else {
    // WhatsApp Web — force browser interface, not desktop app
    openInNewTab(`https://web.whatsapp.com/send?phone=${phone}&text=${encoded}`);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. SAVE CONTACT (vCard)
// ─────────────────────────────────────────────────────────────────────────────

export function saveContactSmart(vcardContent: string, filename: string): void {
  // Blob download via hidden anchor — avoids all popup blockers and works universally
  const blob = new Blob([vcardContent], { type: 'text/vcard;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.style.display = 'none';
  document.body.appendChild(anchor);
  anchor.click();
  // Clean up — revoke after a tick to let the browser start the download
  setTimeout(() => {
    URL.revokeObjectURL(url);
    document.body.removeChild(anchor);
  }, 200);
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. DIRECTIONS (Google Maps)
// ─────────────────────────────────────────────────────────────────────────────

export function openDirectionsSmart(mapsWebUrl: string, _query: string): void {
  // Mobile OSes automatically intercept maps.google.com and open the Maps app.
  openInNewTab(mapsWebUrl);
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. INSTAGRAM
// ─────────────────────────────────────────────────────────────────────────────

export function openInstagramSmart(profileUrl: string, _username: string): void {
  // Mobile OSes automatically intercept instagram.com and open the Instagram app.
  openInNewTab(profileUrl);
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. FACEBOOK
// ─────────────────────────────────────────────────────────────────────────────

export function openFacebookSmart(pageUrl: string, _pageId?: string): void {
  // Mobile OSes automatically intercept facebook.com and open the Facebook app.
  openInNewTab(pageUrl);
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. GOOGLE REVIEW
// ─────────────────────────────────────────────────────────────────────────────

export function openGoogleReviewSmart(reviewUrl: string, _placeId?: string): void {
  // Mobile OSes automatically intercept Google search/maps links and open the Google app/Maps app.
  openInNewTab(reviewUrl);
}
