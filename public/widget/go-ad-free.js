/**
 * Go Ad-Free Widget — Plug & Play
 *
 * Add this single script to any website to automatically attach
 * a "Go Ad-Free" bar to all ad placements on the page.
 *
 * USAGE:
 *   <script
 *     src="https://your-domain.com/widget/go-ad-free.js"
 *     data-subscribe-url="https://your-domain.com/subscribe"
 *   ></script>
 *
 * CONFIG (data attributes on the script tag):
 *   data-subscribe-url  — URL to redirect when clicked (required)
 *   data-theme          — "light" | "dark" | "accent" (default: "light")
 *   data-delay          — Ms to wait before scanning (default: 1500)
 *   data-poll           — Re-scan interval in ms, 0 to disable (default: 3000)
 *   data-selectors      — Extra CSS selectors to match, comma-separated
 *   data-utm-param      — UTM parameter appended to URL (default: "utm_source=go-ad-free-widget")
 */
(function () {
  "use strict";

  // ── Config from script tag ───────────────────────────────────
  var scriptEl = document.currentScript || (function () {
    var s = document.getElementsByTagName("script");
    return s[s.length - 1];
  })();

  var config = {
    subscribeUrl: scriptEl.getAttribute("data-subscribe-url") || "/subscribe",
    theme: scriptEl.getAttribute("data-theme") || "light",
    delay: parseInt(scriptEl.getAttribute("data-delay") || "1500", 10),
    poll: parseInt(scriptEl.getAttribute("data-poll") || "3000", 10),
    extraSelectors: scriptEl.getAttribute("data-selectors") || "",
    utmParam: scriptEl.getAttribute("data-utm-param") || "utm_source=go-ad-free-widget",
  };

  var redirectUrl = config.subscribeUrl;
  if (config.utmParam) {
    redirectUrl += (redirectUrl.indexOf("?") === -1 ? "?" : "&") + config.utmParam;
  }

  // ── Witty messages — rotated per ad slot ─────────────────────
  var messages = [
    { left: "Tired of ads?", right: "Go Ad-Free \u2192" },
    { left: "This could be empty space.", right: "Remove Ads \u2192" },
    { left: "Ads pay our bills, but you don\u2019t have to see them.", right: "Subscribe \u2192" },
    { left: "Plot twist: this ad disappears if you subscribe.", right: "Make it vanish \u2192" },
    { left: "Your eyes deserve better than banner ads.", right: "Go Ad-Free \u2192" },
    { left: "Imagine this space... completely empty.", right: "Remove Ads \u2192" },
    { left: "Fun fact: subscribers never see this.", right: "Join them \u2192" },
    { left: "Less ads. More learning.", right: "Subscribe \u2192" },
    { left: "Ad blocker? We have something better.", right: "Go legit \u2192" },
    { left: "Support us & lose the ads. Win-win.", right: "Go Ad-Free \u2192" },
  ];

  // Short messages for narrow ads (< 350px wide)
  var shortMessages = [
    { left: "Tired of ads?", right: "Go Ad-Free \u2192" },
    { left: "Lose the ads.", right: "Subscribe \u2192" },
    { left: "No more ads.", right: "Subscribe \u2192" },
    { left: "Go ad-free!", right: "Learn more \u2192" },
    { left: "Less ads.", right: "Subscribe \u2192" },
  ];

  var msgIndex = 0;
  var shortMsgIndex = 0;
  function nextMessage(narrow) {
    if (narrow) {
      var s = shortMessages[shortMsgIndex % shortMessages.length];
      shortMsgIndex++;
      return s;
    }
    var m = messages[msgIndex % messages.length];
    msgIndex++;
    return m;
  }

  // ── Ad detection selectors ───────────────────────────────────
  var defaultSelectors = [
    'ins.adsbygoogle', '[id^="google_ads"]', '[id^="div-gpt-ad"]',
    '.gpt-ad', '[data-google-query-id]',
    '[id^="amzn-assoc"]',
    '[id*="freestar"]', '[class*="freestar"]',
    '[id^="mediavine"]', '[class*="mediavine"]', '[data-mediavine]',
    '[class*="adthrive"]',
    '[class*="ad-slot"]', '[class*="ad_slot"]', '[class*="adSlot"]',
    '[class*="ad-container"]', '[class*="ad_container"]', '[class*="adContainer"]',
    '[class*="ad-wrapper"]', '[class*="ad_wrapper"]', '[class*="adWrapper"]',
    '[class*="ad-banner"]', '[class*="ad_banner"]',
    '[class*="advertisement"]', '[class*="sponsored"]',
    '[id*="ad-slot"]', '[id*="ad_slot"]', '[id*="ad-container"]',
    '[id*="ad_container"]', '[id*="ad-banner"]', '[id*="ad_banner"]',
    '[id*="advertisement"]',
    '[data-ad]', '[data-ad-slot]', '[data-ad-unit]', '[data-adunit]', '[data-dfp]',
    'iframe[src*="doubleclick"]', 'iframe[src*="googlesyndication"]',
    'iframe[src*="amazon-adsystem"]', 'iframe[id^="google_ads"]',
  ];

  if (config.extraSelectors) {
    config.extraSelectors.split(",").forEach(function (s) {
      var trimmed = s.trim();
      if (trimmed) defaultSelectors.push(trimmed);
    });
  }

  var combinedSelector = defaultSelectors.join(", ");

  // ── Theme colors ─────────────────────────────────────────────
  var themes = {
    light: {
      barBg: "linear-gradient(90deg, #f8f8f8 0%, #efefef 100%)",
      barText: "#777",
      ctaBg: "#4CAF50",
      ctaBgHover: "#43A047",
      ctaText: "#fff",
      border: "#ddd",
      dotColor: "#bbb",
    },
    dark: {
      barBg: "linear-gradient(90deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.85) 100%)",
      barText: "rgba(255,255,255,0.7)",
      ctaBg: "#4CAF50",
      ctaBgHover: "#66BB6A",
      ctaText: "#fff",
      border: "rgba(255,255,255,0.1)",
      dotColor: "rgba(255,255,255,0.3)",
    },
    accent: {
      barBg: "linear-gradient(90deg, #E8F5E9 0%, #C8E6C9 100%)",
      barText: "#2E7D32",
      ctaBg: "#2E7D32",
      ctaBgHover: "#1B5E20",
      ctaText: "#fff",
      border: "#A5D6A7",
      dotColor: "#81C784",
    },
  };

  var t = themes[config.theme] || themes.light;

  // ── Inject CSS ───────────────────────────────────────────────
  var styleId = "gafw-styles-v2";
  if (!document.getElementById(styleId)) {
    var css = document.createElement("style");
    css.id = styleId;
    css.textContent = [
      // Force overflow clip on the ad container itself
      "[data-gafw-v2] {",
      "  overflow: hidden !important;",
      "}",
      // Bar container
      ".gafw-bar {",
      "  position: absolute;",
      "  top: 0; left: 0;",
      "  width: 100%;",
      "  max-width: 100%;",
      "  z-index: 999999;",
      "  display: flex;",
      "  align-items: center;",
      "  justify-content: space-between;",
      "  padding: 0 4px 0 8px;",
      "  height: 26px;",
      "  background: " + t.barBg + ";",
      "  border-bottom: 1px solid " + t.border + ";",
      "  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;",
      "  font-size: 11px;",
      "  line-height: 1;",
      "  box-sizing: border-box;",
      "  overflow: hidden;",
      "  opacity: 0;",
      "  transform: translateY(-100%);",
      "  animation: gafw-slide-in 0.3s ease-out forwards;",
      "}",
      "@keyframes gafw-slide-in {",
      "  to { opacity: 1; transform: translateY(0); }",
      "}",
      // Left side — message (must shrink and truncate)
      ".gafw-bar-left {",
      "  display: flex;",
      "  align-items: center;",
      "  gap: 4px;",
      "  color: " + t.barText + ";",
      "  overflow: hidden;",
      "  min-width: 0;",
      "  flex: 1 1 0;",
      "}",
      ".gafw-bar-dot {",
      "  width: 4px; height: 4px;",
      "  border-radius: 50%;",
      "  background: " + t.dotColor + ";",
      "  flex-shrink: 0;",
      "}",
      ".gafw-bar-label {",
      "  font-size: 9px;",
      "  font-weight: 600;",
      "  letter-spacing: 0.5px;",
      "  text-transform: uppercase;",
      "  opacity: 0.5;",
      "  flex-shrink: 0;",
      "  color: " + t.barText + ";",
      "}",
      ".gafw-bar-msg {",
      "  font-weight: 500;",
      "  color: " + t.barText + ";",
      "  overflow: hidden;",
      "  text-overflow: ellipsis;",
      "  white-space: nowrap;",
      "}",
      // Right side — CTA button (never shrink)
      ".gafw-bar-cta {",
      "  flex-shrink: 0;",
      "  display: inline-flex;",
      "  align-items: center;",
      "  gap: 4px;",
      "  padding: 3px 10px;",
      "  margin: 3px 0 3px 4px;",
      "  background: " + t.ctaBg + ";",
      "  color: " + t.ctaText + " !important;",
      "  font-size: 10px;",
      "  font-weight: 700;",
      "  letter-spacing: 0.3px;",
      "  text-decoration: none !important;",
      "  border-radius: 3px;",
      "  cursor: pointer;",
      "  transition: background 0.15s, transform 0.1s;",
      "  white-space: nowrap;",
      "}",
      ".gafw-bar-cta:hover {",
      "  background: " + t.ctaBgHover + ";",
      "  transform: scale(1.03);",
      "  text-decoration: none !important;",
      "}",
      ".gafw-bar-cta:active {",
      "  transform: scale(0.97);",
      "}",
      // Vertical (skyscraper) variant — compact single row, no message text
      ".gafw-bar--vertical {",
      "  height: 22px;",
      "  width: 100%;",
      "  max-width: 100%;",
      "  top: 0; left: 0;",
      "  padding: 0 3px;",
      "  justify-content: center;",
      "  gap: 0;",
      "}",
      ".gafw-bar--vertical .gafw-bar-left { display: none; }",
      ".gafw-bar--vertical .gafw-bar-cta {",
      "  font-size: 9px;",
      "  padding: 2px 8px;",
      "  margin: 0;",
      "}",
    ].join("\n");
    document.head.appendChild(css);
  }

  // ── Marker ───────────────────────────────────────────────────
  var MARKER = "data-gafw-v2";

  // ── Attach bar to an ad element ──────────────────────────────
  function attachBar(adEl) {
    if (adEl.getAttribute(MARKER)) return;
    adEl.setAttribute(MARKER, "1");

    var rect = adEl.getBoundingClientRect();
    if (rect.width < 50 || rect.height < 20) return;

    // Ensure positioned
    var pos = window.getComputedStyle(adEl).position;
    if (pos === "static" || pos === "") {
      adEl.style.position = "relative";
    }

    // Detect if narrow (skyscraper) or medium
    var isNarrow = rect.width < 200;
    var isMedium = rect.width < 350;

    // Pick a witty message — shorter for narrow/medium ads
    var msg = nextMessage(isNarrow || isMedium);

    // Build the bar
    var bar = document.createElement("div");
    bar.className = "gafw-bar" + (isNarrow ? " gafw-bar--vertical" : "");

    // Left: AD label + dot + witty message
    var left = document.createElement("div");
    left.className = "gafw-bar-left";

    var label = document.createElement("span");
    label.className = "gafw-bar-label";
    label.textContent = "AD";

    var dot = document.createElement("span");
    dot.className = "gafw-bar-dot";

    var msgSpan = document.createElement("span");
    msgSpan.className = "gafw-bar-msg";
    msgSpan.textContent = msg.left;

    left.appendChild(label);
    left.appendChild(dot);
    left.appendChild(msgSpan);

    // Right: CTA button
    var cta = document.createElement("a");
    cta.className = "gafw-bar-cta";
    cta.href = redirectUrl;
    cta.textContent = msg.right;

    bar.appendChild(left);
    bar.appendChild(cta);
    adEl.appendChild(bar);
  }

  // ── Scan ─────────────────────────────────────────────────────
  function scanAndAttach() {
    try {
      var els = document.querySelectorAll(combinedSelector);
      for (var i = 0; i < els.length; i++) attachBar(els[i]);

      var iframes = document.querySelectorAll("iframe");
      for (var j = 0; j < iframes.length; j++) {
        var iframe = iframes[j];
        if (iframe.getAttribute(MARKER)) continue;
        var src = (iframe.src || "").toLowerCase();
        var id = (iframe.id || "").toLowerCase();
        var isAd =
          src.indexOf("doubleclick") !== -1 ||
          src.indexOf("googlesyndication") !== -1 ||
          src.indexOf("amazon-adsystem") !== -1 ||
          src.indexOf("adserver") !== -1 ||
          src.indexOf("pubads") !== -1 ||
          id.indexOf("google_ads") !== -1 ||
          id.indexOf("aswift") !== -1;
        if (isAd && iframe.parentElement) {
          attachBar(iframe.parentElement);
        }
      }
    } catch (e) {}
  }

  // ── MutationObserver ─────────────────────────────────────────
  function observeDOM() {
    if (!window.MutationObserver) return;
    var observer = new MutationObserver(function (mutations) {
      var scan = false;
      for (var i = 0; i < mutations.length; i++) {
        if (mutations[i].addedNodes.length) { scan = true; break; }
      }
      if (scan) {
        clearTimeout(observeDOM._t);
        observeDOM._t = setTimeout(scanAndAttach, 500);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // ── Init ─────────────────────────────────────────────────────
  function init() {
    setTimeout(function () {
      scanAndAttach();
      observeDOM();
    }, config.delay);
    if (config.poll > 0) setInterval(scanAndAttach, config.poll);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
