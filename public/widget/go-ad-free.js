/**
 * Go Ad-Free Widget — Plug & Play
 *
 * Add this single script to any website to automatically attach
 * "Go Ad-Free" buttons to all ad placements on the page.
 *
 * USAGE:
 *   <script
 *     src="https://your-domain.com/widget/go-ad-free.js"
 *     data-subscribe-url="https://your-domain.com/subscribe"
 *     data-label="Go Ad-Free"
 *     data-theme="light"
 *     data-position="top-right"
 *   ></script>
 *
 * CONFIG (data attributes on the script tag):
 *   data-subscribe-url  — URL to redirect when clicked (required)
 *   data-label          — Button text (default: "✕ Go Ad-Free")
 *   data-theme          — "light" | "dark" (default: "light")
 *   data-position       — "top-right" | "top-left" | "bottom-right" | "bottom-left" (default: "top-right")
 *   data-delay          — Milliseconds to wait before scanning (default: 1500)
 *   data-poll            — Keep scanning for new ads every N ms, 0 to disable (default: 3000)
 *   data-selectors      — Extra CSS selectors to match, comma-separated
 *   data-utm-param      — UTM parameter name appended to URL (default: "utm_source=go-ad-free-widget")
 */
(function () {
  "use strict";

  // ── Grab config from the script tag ──────────────────────────
  var scriptEl = document.currentScript || (function () {
    var scripts = document.getElementsByTagName("script");
    return scripts[scripts.length - 1];
  })();

  var config = {
    subscribeUrl: scriptEl.getAttribute("data-subscribe-url") || "/subscribe",
    label: scriptEl.getAttribute("data-label") || "\u2715 Go Ad-Free",
    theme: scriptEl.getAttribute("data-theme") || "light",
    position: scriptEl.getAttribute("data-position") || "top-right",
    delay: parseInt(scriptEl.getAttribute("data-delay") || "1500", 10),
    poll: parseInt(scriptEl.getAttribute("data-poll") || "3000", 10),
    extraSelectors: scriptEl.getAttribute("data-selectors") || "",
    utmParam: scriptEl.getAttribute("data-utm-param") || "utm_source=go-ad-free-widget",
  };

  // Build the final redirect URL
  var redirectUrl = config.subscribeUrl;
  if (config.utmParam) {
    redirectUrl += (redirectUrl.indexOf("?") === -1 ? "?" : "&") + config.utmParam;
  }

  // ── Ad detection selectors ───────────────────────────────────
  // Covers Google AdSense, Google Publisher Tags, Amazon ads,
  // Freestar, Mediavine, AdThrive, generic ad class/id patterns,
  // and data-attribute based ad containers.
  var defaultSelectors = [
    // Google AdSense
    'ins.adsbygoogle',
    '[id^="google_ads"]',
    '[id^="div-gpt-ad"]',
    // Google Publisher Tags
    '.gpt-ad',
    '[data-google-query-id]',
    // Amazon
    '[id^="amzn-assoc"]',
    // Freestar
    '[id*="freestar"]',
    '[class*="freestar"]',
    // Mediavine
    '[id^="mediavine"]',
    '[class*="mediavine"]',
    '[data-mediavine]',
    // AdThrive
    '[class*="adthrive"]',
    // Common ad patterns (class/id naming)
    '[class*="ad-slot"]',
    '[class*="ad_slot"]',
    '[class*="adSlot"]',
    '[class*="ad-container"]',
    '[class*="ad_container"]',
    '[class*="adContainer"]',
    '[class*="ad-wrapper"]',
    '[class*="ad_wrapper"]',
    '[class*="adWrapper"]',
    '[class*="ad-banner"]',
    '[class*="ad_banner"]',
    '[class*="advertisement"]',
    '[class*="sponsored"]',
    '[id*="ad-slot"]',
    '[id*="ad_slot"]',
    '[id*="ad-container"]',
    '[id*="ad_container"]',
    '[id*="ad-banner"]',
    '[id*="ad_banner"]',
    '[id*="advertisement"]',
    // Data attributes
    '[data-ad]',
    '[data-ad-slot]',
    '[data-ad-unit]',
    '[data-adunit]',
    '[data-dfp]',
    // iframes from ad networks
    'iframe[src*="doubleclick"]',
    'iframe[src*="googlesyndication"]',
    'iframe[src*="amazon-adsystem"]',
    'iframe[id^="google_ads"]',
  ];

  // Merge extra selectors from config
  if (config.extraSelectors) {
    config.extraSelectors.split(",").forEach(function (sel) {
      var trimmed = sel.trim();
      if (trimmed) defaultSelectors.push(trimmed);
    });
  }

  var combinedSelector = defaultSelectors.join(", ");

  // ── Styles ───────────────────────────────────────────────────
  var themes = {
    light: {
      bg: "#f5f5f5",
      bgHover: "#e8e8e8",
      text: "#555",
      textHover: "#222",
      border: "#ccc",
    },
    dark: {
      bg: "rgba(0,0,0,0.6)",
      bgHover: "rgba(0,0,0,0.8)",
      text: "#ddd",
      textHover: "#fff",
      border: "rgba(255,255,255,0.2)",
    },
  };

  var t = themes[config.theme] || themes.light;

  var positionStyles = {
    "top-right": { top: "0", right: "0", transform: "translateY(-100%)" },
    "top-left": { top: "0", left: "0", transform: "translateY(-100%)" },
    "bottom-right": { bottom: "0", right: "0", transform: "translateY(100%)" },
    "bottom-left": { bottom: "0", left: "0", transform: "translateY(100%)" },
  };

  var pos = positionStyles[config.position] || positionStyles["top-right"];

  // ── Inject global CSS ────────────────────────────────────────
  var styleId = "go-ad-free-widget-styles";
  if (!document.getElementById(styleId)) {
    var style = document.createElement("style");
    style.id = styleId;
    style.textContent = [
      ".gafw-btn {",
      "  position: absolute;",
      "  z-index: 999999;",
      "  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;",
      "  font-size: 10px;",
      "  line-height: 1;",
      "  padding: 3px 8px;",
      "  cursor: pointer;",
      "  text-decoration: none !important;",
      "  white-space: nowrap;",
      "  transition: background-color 0.15s, color 0.15s;",
      "  background-color: " + t.bg + ";",
      "  color: " + t.text + ";",
      "  border: 1px solid " + t.border + ";",
      "}",
      ".gafw-btn:hover {",
      "  background-color: " + t.bgHover + ";",
      "  color: " + t.textHover + ";",
      "  text-decoration: none !important;",
      "}",
    ].join("\n");
    document.head.appendChild(style);
  }

  // ── Marker to avoid duplicates ───────────────────────────────
  var MARKER = "data-gafw-processed";

  // ── Core: attach button to an ad element ─────────────────────
  function attachButton(adEl) {
    if (adEl.getAttribute(MARKER)) return;
    adEl.setAttribute(MARKER, "1");

    // Skip if element is too small (likely a tracking pixel)
    var rect = adEl.getBoundingClientRect();
    if (rect.width < 50 || rect.height < 20) return;

    // Ensure the ad container is positioned so the button can anchor
    var computedPos = window.getComputedStyle(adEl).position;
    if (computedPos === "static" || computedPos === "") {
      adEl.style.position = "relative";
    }

    // Create the button
    var btn = document.createElement("a");
    btn.href = redirectUrl;
    btn.className = "gafw-btn";
    btn.textContent = config.label;
    btn.title = "Remove ads by subscribing";

    // Apply position
    for (var prop in pos) {
      btn.style[prop] = pos[prop];
    }

    adEl.appendChild(btn);
  }

  // ── Scan the page for ads ────────────────────────────────────
  function scanAndAttach() {
    try {
      var adElements = document.querySelectorAll(combinedSelector);
      for (var i = 0; i < adElements.length; i++) {
        attachButton(adElements[i]);
      }

      // Also scan for ad iframes and attach to their parent
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
          attachButton(iframe.parentElement);
        }
      }
    } catch (e) {
      // Silently fail — don't break the host page
    }
  }

  // ── MutationObserver for dynamically loaded ads ──────────────
  function observeDOM() {
    if (!window.MutationObserver) return;

    var observer = new MutationObserver(function (mutations) {
      var shouldScan = false;
      for (var i = 0; i < mutations.length; i++) {
        if (mutations[i].addedNodes.length > 0) {
          shouldScan = true;
          break;
        }
      }
      if (shouldScan) {
        // Debounce — wait a tick for the ad to fully render
        clearTimeout(observeDOM._timer);
        observeDOM._timer = setTimeout(scanAndAttach, 500);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  // ── Initialize ───────────────────────────────────────────────
  function init() {
    // Initial scan after delay (ads take time to load)
    setTimeout(function () {
      scanAndAttach();
      observeDOM();
    }, config.delay);

    // Optional polling for late-loading ads
    if (config.poll > 0) {
      setInterval(scanAndAttach, config.poll);
    }
  }

  // Start when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
