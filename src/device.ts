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
// Using window.location.href for same-tab (mobile app intents) vs
// window.open for new-tab (desktop browser links).
// We NEVER use window.open for app deep links on mobile because:
//   • Popup blockers kill window.open calls not initiated synchronously
//   • window.location.href cannot be blocked by popup blockers
//   • App intent URIs must navigate the current window to trigger OS routing
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Open a URL in a new browser tab (desktop pattern).
 * Uses rel="noopener noreferrer" equivalent via the windowFeatures parameter.
 */
function openInNewTab(url: string): void {
  const win = window.open(url, '_blank', 'noopener,noreferrer');
  // Some browsers return null if popup was blocked — no silent failure
  if (!win) window.location.href = url;
}

/**
 * Attempt to open a native app via a deep-link URI.
 * Falls back to the web URL after `timeoutMs` milliseconds if the OS
 * does not intercept the deep link (i.e. app not installed).
 *
 * Technique: set location.href to the deep link, then schedule a fallback.
 * If the OS handles it, the page stays loaded (user switches to app) and
 * the timeout is never visible. If not handled, the fallback fires.
 */
function openAppWithFallback(appUrl: string, webUrl: string, timeoutMs = 1500): void {
  // Record the time we started
  const start = Date.now();
  window.location.href = appUrl;

  setTimeout(() => {
    // If the page was hidden (user left for the app), elapsed >> timeoutMs
    // document.hidden is true when the tab/page is backgrounded.
    if (!document.hidden && Date.now() - start < timeoutMs + 200) {
      // App didn't open → go to web fallback in same tab on mobile
      window.location.href = webUrl;
    }
  }, timeoutMs);
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. WHATSAPP
// ─────────────────────────────────────────────────────────────────────────────
//
// Mobile:  whatsapp://send?phone=...&text=...
//   → Opens WhatsApp native app directly, pre-fills the message.
//   → Falls back to https://wa.me/ if WhatsApp not installed.
//
// Desktop: https://web.whatsapp.com/send?phone=...&text=...
//   → WhatsApp Web, opens in new tab.
//
// Why two different hosts?
//   wa.me is a universal redirect; on desktop it often opens WhatsApp desktop
//   app rather than WhatsApp Web. web.whatsapp.com forces the web interface.
// ─────────────────────────────────────────────────────────────────────────────

export function openWhatsAppSmart(phone: string, message: string): void {
  const encoded = encodeURIComponent(message);

  if (isMobileDevice()) {
    const appUrl = `whatsapp://send?phone=${phone}&text=${encoded}`;
    const webUrl = `https://wa.me/${phone}?text=${encoded}`;
    openAppWithFallback(appUrl, webUrl);
  } else {
    // WhatsApp Web — force browser interface, not desktop app
    openInNewTab(`https://web.whatsapp.com/send?phone=${phone}&text=${encoded}`);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. SAVE CONTACT (vCard)
// ─────────────────────────────────────────────────────────────────────────────
//
// For both mobile and desktop, we use a Blob URL and trigger a download
// via a hidden anchor tag. 
// - On mobile (iOS/Android), downloading a .vcf file natively prompts the 
//   user to open it with their Contacts app, giving the perfect experience.
// - On desktop, it triggers a standard "Save File" dialog.
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
//
// Both iOS and Android natively intercept `https://maps.google.com/...` 
// and `https://goo.gl/maps/...` URLs and open them perfectly in the native 
// Google Maps app if installed (or Apple Maps if configured), dropping a pin 
// exactly where intended.
//
// Attempting to construct `geo:` or `maps://` URIs with raw text searches 
// often results in generic search pages rather than exact pins.
// ─────────────────────────────────────────────────────────────────────────────

export function openDirectionsSmart(mapsWebUrl: string, _query: string): void {
  if (isMobileDevice()) {
    // On mobile, setting location.href lets the OS intercept the link
    // and route it to the native Maps app automatically.
    window.location.href = mapsWebUrl;
  } else {
    openInNewTab(mapsWebUrl);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. INSTAGRAM
// ─────────────────────────────────────────────────────────────────────────────
//
// Mobile:  instagram://user?username=... deep link, falls back to web.
// Desktop: Open profile in new tab.
//
// Why not just the web URL on mobile?
//   instagram.com detects mobile browsers and opens in-browser, but:
//   - Strips features (DM, reel playback etc.) compared to the app
//   - User experience is worse than the native app
// ─────────────────────────────────────────────────────────────────────────────

export function openInstagramSmart(profileUrl: string, username: string): void {
  if (isMobileDevice()) {
    openAppWithFallback(
      `instagram://user?username=${username}`,
      profileUrl
    );
  } else {
    openInNewTab(profileUrl);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. FACEBOOK
// ─────────────────────────────────────────────────────────────────────────────
//
// Mobile:  fb://page/<PAGE_ID> deep link.
//   NOTE: Facebook's fb:// scheme requires a numeric PAGE ID, not a username.
//   We accept the page slug and use it for the web fallback.
//   If you have a numeric Page ID, pass it as pageId for a better app experience.
//
// Desktop: Open page in new tab.
// ─────────────────────────────────────────────────────────────────────────────

export function openFacebookSmart(pageUrl: string, pageId?: string): void {
  if (isMobileDevice()) {
    if (pageId) {
      // Numeric Page ID available — direct app deep link
      openAppWithFallback(`fb://page/${pageId}`, pageUrl);
    } else {
      // No numeric ID — use fbrpc:// universal link which Facebook itself uses
      // This works even without knowing the numeric ID.
      openAppWithFallback(`fb://facewebmodal/auth?target_url=${encodeURIComponent(pageUrl)}`, pageUrl);
    }
  } else {
    openInNewTab(pageUrl);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. GOOGLE REVIEW
// ─────────────────────────────────────────────────────────────────────────────
//
// Mobile:  Opens Google Maps app (which hosts reviews) via deep link.
//          If you have a Google Place ID, we use the maps/place deep link.
//          Otherwise falls back to the search result.
//
// Desktop: Open review URL in new tab.
// ─────────────────────────────────────────────────────────────────────────────

export function openGoogleReviewSmart(reviewUrl: string, placeId?: string): void {
  if (isMobileDevice()) {
    if (placeId) {
      // Direct place deep link in Google Maps app
      openAppWithFallback(
        `https://maps.google.com/?cid=${placeId}`,
        reviewUrl
      );
    } else {
      // No Place ID — open review URL in Maps app via comgooglemaps://
      const encoded = encodeURIComponent(reviewUrl);
      openAppWithFallback(
        `comgooglemaps://?q=${encoded}`,
        reviewUrl
      );
    }
  } else {
    openInNewTab(reviewUrl);
  }
}
