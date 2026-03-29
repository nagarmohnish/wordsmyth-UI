# Go Ads-Free Widget — Build Prompt for Claude Code

**Use this prompt to build an identical "Go Ads-Free" subscription widget for any publishing website. Copy and paste this entire document as a prompt to Claude Code.**

---

## What You're Building

A single standalone JavaScript file (`go-ad-free.js`) that:
1. Auto-detects all ad slots on any webpage
2. Injects a dark gradient "Go Ads-Free" bar **above** each ad
3. Clicking the bar opens a popup with a complete 3-screen subscription flow (widget → checkout → certificate)
4. Zero dependencies — works on any website with one `<script>` tag

---

## Step-by-Step Build Instructions

### STEP 1: Ad Detection Engine

Build a scanner that finds all ad containers on the page using 40+ CSS selectors:

```
Selectors to detect:
- Google Ads: ins.adsbygoogle, [id^="google_ads"], [id^="div-gpt-ad"], .gpt-ad, [data-google-query-id]
- Amazon: [id^="amzn-assoc"], iframe[src*="amazon-adsystem"]
- Freestar: [id*="freestar"], [class*="freestar"]
- Mediavine: [id^="mediavine"], [class*="mediavine"], [data-mediavine]
- AdThrive: [class*="adthrive"]
- Generic patterns: [class*="ad-slot"], [class*="ad-container"], [class*="ad-wrapper"], [class*="ad-banner"], [class*="advertisement"], [class*="sponsored"]
- ID patterns: [id*="ad-slot"], [id*="ad-container"], [id*="ad-banner"], [id*="advertisement"]
- Data attributes: [data-ad], [data-ad-slot], [data-ad-unit], [data-adunit], [data-dfp]
- Iframes: iframe[src*="doubleclick"], iframe[src*="googlesyndication"]
```

The scanner should:
- Run after a configurable delay (default 1500ms) to let ads load
- Re-scan on a configurable poll interval (default 3000ms) for lazy-loaded ads
- Use MutationObserver to detect dynamically inserted ads
- Mark processed ads with a `data-` attribute to avoid duplicates
- Skip ads smaller than 40x20px

### STEP 2: Dark Gradient Bar (Injected Above Each Ad)

For each detected ad, insert a bar element **before** the ad in the DOM (not inside/overlapping it):

**Wide ads (width >= 200px):**
- Height: 30px
- Background: `linear-gradient(135deg, #1a2332, #1e3a4f)` (dark blue-gray gradient)
- Left side: sparkle icon (16px circle with brand gradient) + witty rotating text in `rgba(255,255,255,0.7)`
- Right side: "Go Ads-Free →" pill button with brand gradient, white text, rounded 20px, box-shadow
- Width matches the ad container width
- Fade-in animation (0.35s ease-out)

**Narrow ads (width < 200px, e.g. skyscrapers):**
- Height: 28px, centered
- Text hidden, only shows the "Go Ads-Free →" CTA pill
- Compact styling

**Witty rotating copy (one per ad, cycles through):**
```
Wide:
- "Tired of ads? Read without distractions."
- "Plot twist: this ad vanishes when you subscribe."
- "Imagine this space — completely yours."
- "Fun fact: subscribers never see this."
- "Support education. Lose the ads."
- "Less noise. More learning."

Narrow:
- "No more ads?"
- "Go clean"
- "Lose the ads"
- "Distraction-free"
```

**CTA hover effects:**
- Scale 1.06 on hover
- Box-shadow glow increases
- Arrow shifts right 2px
- Scale 0.96 on active/click

### STEP 3: Popup Modal (Opens When Bar is Clicked)

Clicking any "Go Ads-Free" bar opens a centered modal popup with backdrop blur:

**Modal backdrop:**
- `position: fixed; inset: 0; z-index: 9999999`
- `background: rgba(0,0,0,0.45); backdrop-filter: blur(6px)`
- Click backdrop to close
- Escape key to close
- Prevent body scroll while open

**Popup card:**
- `width: 440px; max-width: 100%; max-height: 90vh; overflow-y: auto`
- `border-radius: 20px; background: #fff`
- `box-shadow: 0 24px 80px rgba(0,0,0,0.2)`
- Scale-in animation from 94% + 10px translateY
- Close button (×) top-right

### STEP 4: Screen 1 — Subscription Widget

The popup's first screen lets the user choose amount and frequency:

**Layout (top to bottom):**
1. **Title**: "Support Free Learning" (or your site's name) — 1.35em, 800 weight, centered
2. **Frequency dropdown**: Pill-shaped select with options: One-time, Monthly, Quarterly, Yearly. Default: Quarterly. Custom arrow icon.
3. **Amount display**: Large input field showing `$ [amount]` (2em, 800 weight) with $/day calculation on the right for recurring frequencies. Bordered container with 12px radius.
4. **Preset buttons**: 4-column grid of amount buttons ($5, $10, $25, $50 or customize). Active state: brand color border + light tint background. "Popular" label on the recommended amount.
5. **Perk line**: "✔ Includes ads-free experience" in brand color, centered
6. **CTA button**: Full-width, 15px padding, brand color background, white text, 12px radius, 700 weight. Text: "Continue with $25 / quarter". Box-shadow with brand color glow.
7. **Trust signals**: 🔒 Secure payment | ApplePay · Visa · MC badges
8. **Bottom line**: "Secure & encrypted · Cancel anytime · Takes <10 seconds"

**Interactivity:**
- Clicking a preset updates the amount display and CTA text
- Typing in the amount input switches to custom mode
- Changing frequency updates the $/day calculation and CTA label
- CTA click transitions to Screen 2

### STEP 5: Screen 2 — Checkout

**Layout (top to bottom):**
1. **Amount summary**: "You're supporting" label + "$25 / quarter" in 2em bold + "Helping [your cause] every day" in brand color
2. **Email input**: Label + text input with focus border color change
3. **"Select payment method"** heading
4. **Bank Transfer (ACH)**: Expandable card with 🏦 icon, "Direct Bank Transfer (ACH)", "Best for long-term support" in brand color. Active state: brand border + tint bg.
5. **"Express checkout"** label centered
6. **Express buttons**: 4-column grid — Apple Pay, Google Pay, PayPal, Venmo. Border hover effect.
7. **Card payment**: Expandable card with 💳 icon. When expanded, shows form:
   - Name on card input
   - Card number input
   - Expiry + CVC in 2-column grid
8. **Trust**: "🔒 Secure payment • Powered by Stripe"
9. **CTA**: "Complete Payment — $25 / quarter". Brand color, full-width, 16px padding.

**Interactivity:**
- Bank/Card toggle (accordion — only one open at a time)
- Card form appears/hides on toggle
- CTA click shows "Processing..." state (lighter brand color, no cursor) for 1.8 seconds, then transitions to Screen 3
- Name and email values are captured for the certificate

### STEP 6: Screen 3 — Success Certificate

**Layout (top to bottom):**
1. **Confirmation header** (white bg, centered):
   - Checkmark circle (48px, brand border, brand color check)
   - "Your $25 every quarter support is confirmed."
   - "You're now one of us — helping keep [cause] free for [audience] worldwide."
   - Badge pill: "💙 Official Supporter of [Site Name]" with brand border + tint bg

2. **Certificate card** (light theme with subtle shadow):
   - White background, 14px rounded corners, 1px border
   - Heart emoji top-left, share icon top-right
   - "CERTIFICATE OF SUPPORT" uppercase, letter-spaced, gray
   - Horizontal divider line
   - "This certifies that" → **[Name]** in 1.4em 800 weight
   - "is a proud supporter of" → Site logo (circle icon + text)
   - Divider
   - "For keeping [cause] free & accessible for everyone" italic
   - "$25 every quarter" bold + date

3. **Perk section** (light tint bg, bottom of card):
   - "✔ Your [Site] experience will be **ads-free** while your support is active."

4. **Social sharing**:
   - "SHOW OTHERS YOU SUPPORT [CAUSE]" uppercase label
   - 3-column grid: X (dark), LinkedIn (blue), WhatsApp (green) buttons
   - Pre-filled share text with site URL

5. **Footer links**:
   - "Manage your support" link
   - "✉ Certificate and invoice sent to your email"

### STEP 7: Configuration via Script Tag

All settings configurable via `data-*` attributes — no code changes needed:

```html
<script src="/widget/go-ad-free.js"
  data-subscribe-url="/subscribe"
  data-delay="1500"
  data-poll="3000"
  data-selectors=".my-custom-ad,.another-ad"
  data-utm-param="utm_source=go-ad-free-widget"
></script>
```

| Attribute | Default | Description |
|-----------|---------|-------------|
| `data-subscribe-url` | `/subscribe` | Fallback URL for the CTA (if not using popup) |
| `data-delay` | `1500` | Delay (ms) before first ad scan |
| `data-poll` | `3000` | Re-scan interval (ms) for lazy-loaded ads. Set 0 to disable. |
| `data-selectors` | — | Extra CSS selectors to target (comma-separated) |
| `data-utm-param` | `utm_source=go-ad-free-widget` | URL parameter appended to links |

### STEP 8: Color Theming

Define all colors as variables at the top of the script for easy customization:

```javascript
var P = "#5468ff";    // Primary (buttons, CTAs, active borders)
var PD = "#4354e0";   // Primary dark (hover, gradients)
var PL = "#eef0ff";   // Primary light (active backgrounds, tints)
var PT = "rgba(84,104,255,0.25)"; // Primary transparent (shadows)
```

**To customize for your brand:** Change these 4 values. Everything else adapts automatically — the bar gradient, CTA pills, popup buttons, active states, certificate accents, badge colors, etc.

### STEP 9: Technical Requirements

- **Zero dependencies**: Pure vanilla JS, no React/jQuery/framework needed
- **Self-contained CSS**: Injected via JS, no external stylesheet
- **IIFE pattern**: `(function(){ ... })()` — no globals leaked
- **Event delegation**: All popup events handled via document-level delegation (click, input, change)
- **State management**: Simple object `{ screen, freq, preset, custom, isCustom, method, name, email }`
- **Body scroll lock**: `document.body.style.overflow = "hidden"` when popup is open
- **Cleanup**: MutationObserver for dynamic ads, marker attributes to prevent duplicates
- **Responsive**: Popup is `max-width: 100%` with padding, works on mobile
- **Animations**: CSS keyframes for fade-in (bar), fade+scale (popup), no JS animation libraries

### STEP 10: Customization Checklist

When adapting for a new website, change these values:

| What | Where | Example |
|------|-------|---------|
| Site name | Widget title, certificate | "Support Free Music" |
| Cause description | Checkout subtitle, certificate italic | "For keeping music free & accessible" |
| Audience | Success confirmation | "musicians and listeners worldwide" |
| Logo | Certificate card | Circle icon + text |
| Preset amounts | `PRESETS` array | `[20, 50, 100, 200]` |
| Popular amount | `POPULAR` variable | `50` |
| Default frequency | `S.freq` initial value | `"monthly"` |
| Frequencies available | `FREQS` array | `["one-time", "monthly", "quarterly", "yearly"]` |
| Primary color | `P` variable | `"#5468ff"` |
| Witty copy | `wideCopy` and `narrowCopy` arrays | Site-specific messages |
| Share text | `shareText` in success screen | Pre-filled social message |
| Share URL | Share button hrefs | Your support page URL |
| Perk text | Widget + success | "Includes ad-free experience" |

---

## Reference Implementation

See the working implementation at:
- **Live demo**: https://nagarmohnish.github.io/wordsmyth-UI/
- **Source**: https://github.com/nagarmohnish/wordsmyth-UI/blob/master/public/widget/go-ad-free.js

The complete file is ~420 lines of vanilla JavaScript including all 3 popup screens, ad detection, and CSS injection.

---

## Example Prompt for Claude Code

```
Build a "Go Ads-Free" widget for [YOUR SITE NAME] following this exact architecture:

1. Create a single vanilla JS file (go-ad-free.js) that auto-detects all ad containers on the page using 40+ CSS selectors for Google Ads, Amazon, Mediavine, Freestar, AdThrive, and generic ad patterns.

2. For each detected ad, inject a 30px dark gradient bar (#1a2332 → #1e3a4f) ABOVE the ad (not overlapping) with:
   - Left: sparkle icon (16px circle, brand gradient) + witty rotating text
   - Right: "Go Ads-Free →" pill button (brand gradient, white text, 20px radius)

3. Clicking any bar opens a popup modal (440px, 20px radius, backdrop blur) with 3 screens:

   Screen 1 (Widget): Frequency dropdown (one-time/monthly/quarterly/yearly) → large $ amount input with $/day calc → $20/$50/$100/$200 preset grid with "Popular" badge → "Includes ad-free experience" perk → "Continue with $100 / month" CTA → trust signals

   Screen 2 (Checkout): Amount summary → email input → Bank Transfer (ACH) expandable → Express checkout (Apple Pay, Google Pay, PayPal, Venmo) → Card payment expandable (name, number, expiry, CVC) → "Secure payment • Powered by Stripe" → "Complete Payment" CTA with 1.8s processing animation

   Screen 3 (Certificate): Checkmark + confirmation → "Official Supporter" badge → light certificate card (name, site logo, cause, amount, date) → ads-free perk → social sharing (X, LinkedIn, WhatsApp) → manage support link

4. Brand colors: Primary [YOUR COLOR], use 4-variable theming (P, PD, PL, PT)
5. Site-specific: title "[YOUR TITLE]", cause "[YOUR CAUSE]", audience "[YOUR AUDIENCE]"
6. Configurable via data-* attributes on the script tag
7. Zero dependencies, IIFE pattern, self-contained CSS injection
```
