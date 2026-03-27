/**
 * Go Ads-Free Widget — Plug & Play v3
 * Drop one script tag on any website → witty "Go Ads-Free" overlay on every ad.
 * Zero dependencies. Works on any site.
 *
 * Usage:
 *   <script src="https://kids.wordsmyth.net/widget/go-ad-free.js"
 *     data-subscribe-url="https://kids.wordsmyth.net/subscribe"
 *     data-delay="1500"
 *     data-poll="3000"
 *     data-selectors=".my-custom-ad"
 *   ></script>
 */
(function () {
  "use strict";

  var scriptEl = document.currentScript || (function () {
    var s = document.getElementsByTagName("script");
    return s[s.length - 1];
  })();

  var config = {
    subscribeUrl: scriptEl.getAttribute("data-subscribe-url") || "/subscribe",
    delay: parseInt(scriptEl.getAttribute("data-delay") || "1500", 10),
    poll: parseInt(scriptEl.getAttribute("data-poll") || "3000", 10),
    extraSelectors: scriptEl.getAttribute("data-selectors") || "",
    utmParam: scriptEl.getAttribute("data-utm-param") || "utm_source=go-ad-free-widget",
  };

  var redirectUrl = config.subscribeUrl;
  if (config.utmParam) {
    redirectUrl += (redirectUrl.indexOf("?") === -1 ? "?" : "&") + config.utmParam;
  }

  // ── Witty copy — different for wide vs narrow ────────────────
  var wideCopy = [
    { text: "Tired of ads? \u2728 Read without distractions.", cta: "Go Ads-Free" },
    { text: "Plot twist: this ad vanishes when you subscribe.", cta: "Go Ads-Free" },
    { text: "Your eyes deserve better.", cta: "Go Ads-Free" },
    { text: "Imagine this space \u2014 completely yours.", cta: "Go Ads-Free" },
    { text: "Fun fact: subscribers never see this.", cta: "Go Ads-Free" },
    { text: "Ad blocker? We have something better \u2014 and legal.", cta: "Go Ads-Free" },
    { text: "Support education. Lose the ads.", cta: "Go Ads-Free" },
    { text: "Less noise. More learning.", cta: "Go Ads-Free" },
  ];

  var narrowCopy = [
    { text: "No more ads?", cta: "Go Ads-Free" },
    { text: "Distraction-free", cta: "Go Ads-Free" },
    { text: "Lose the ads", cta: "Go Ads-Free" },
    { text: "Clean reading", cta: "Go Ads-Free" },
    { text: "Less clutter", cta: "Go Ads-Free" },
  ];

  var wIdx = 0, nIdx = 0;
  function getCopy(narrow) {
    if (narrow) { var c = narrowCopy[nIdx % narrowCopy.length]; nIdx++; return c; }
    var w = wideCopy[wIdx % wideCopy.length]; wIdx++; return w;
  }

  // ── Ad selectors ─────────────────────────────────────────────
  var sels = [
    'ins.adsbygoogle', '[id^="google_ads"]', '[id^="div-gpt-ad"]',
    '.gpt-ad', '[data-google-query-id]', '[id^="amzn-assoc"]',
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
      var t = s.trim(); if (t) sels.push(t);
    });
  }

  var selector = sels.join(", ");

  // ── Inject CSS ───────────────────────────────────────────────
  var sid = "gafw-v3";
  if (!document.getElementById(sid)) {
    var css = document.createElement("style");
    css.id = sid;
    css.textContent = [
      "[data-gafw] { overflow: hidden !important; }",

      // ── Wide bar: gradient strip across top ──
      ".gafw {",
      "  position: absolute; top: 0; left: 0; width: 100%; z-index: 999999;",
      "  display: flex; align-items: center; justify-content: space-between;",
      "  height: 30px; padding: 0 6px 0 12px;",
      "  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);",
      "  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;",
      "  font-size: 11px; line-height: 1; box-sizing: border-box;",
      "  overflow: hidden;",
      "  opacity: 0; animation: gafw-in 0.35s ease-out 0.1s forwards;",
      "}",
      "@keyframes gafw-in { to { opacity: 1; } }",

      // Left text
      ".gafw-txt {",
      "  display: flex; align-items: center; gap: 6px;",
      "  color: rgba(255,255,255,0.75); overflow: hidden;",
      "  flex: 1 1 0; min-width: 0;",
      "}",
      ".gafw-icon {",
      "  flex-shrink: 0; width: 16px; height: 16px;",
      "  background: linear-gradient(135deg, #18AD4A, #0d8a3a);",
      "  border-radius: 50%; display: flex; align-items: center; justify-content: center;",
      "  font-size: 9px; color: #fff;",
      "}",
      ".gafw-copy {",
      "  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;",
      "  font-weight: 500; letter-spacing: 0.2px;",
      "}",

      // CTA pill
      ".gafw-cta {",
      "  flex-shrink: 0; display: inline-flex; align-items: center; gap: 4px;",
      "  padding: 4px 14px; margin: 0 0 0 6px;",
      "  background: linear-gradient(135deg, #18AD4A, #12963f);",
      "  color: #fff !important; font-size: 10px; font-weight: 700;",
      "  text-decoration: none !important; border-radius: 20px;",
      "  cursor: pointer; white-space: nowrap;",
      "  transition: transform 0.15s, box-shadow 0.15s;",
      "  box-shadow: 0 2px 8px rgba(24,173,74,0.3);",
      "}",
      ".gafw-cta:hover {",
      "  transform: scale(1.06);",
      "  box-shadow: 0 4px 14px rgba(24,173,74,0.45);",
      "  text-decoration: none !important;",
      "}",
      ".gafw-cta:active { transform: scale(0.96); }",

      // Arrow icon in CTA
      ".gafw-arrow {",
      "  display: inline-block; transition: transform 0.2s;",
      "}",
      ".gafw-cta:hover .gafw-arrow { transform: translateX(2px); }",

      // ── Narrow (skyscraper): single row, just CTA, no text ──
      ".gafw--narrow {",
      "  height: 28px;",
      "  padding: 0 4px;",
      "  justify-content: center;",
      "  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);",
      "}",
      ".gafw--narrow .gafw-txt { display: none; }",
      ".gafw--narrow .gafw-cta {",
      "  font-size: 9px; padding: 3px 10px; margin: 0;",
      "  box-shadow: none;",
      "}",
    ].join("\n");
    document.head.appendChild(css);
  }

  // ── Marker ───────────────────────────────────────────────────
  var MK = "data-gafw";

  // ── Attach ───────────────────────────────────────────────────
  function attach(el) {
    if (el.getAttribute(MK)) return;
    el.setAttribute(MK, "1");

    var r = el.getBoundingClientRect();
    if (r.width < 40 || r.height < 20) return;

    var pos = window.getComputedStyle(el).position;
    if (pos === "static" || pos === "") el.style.position = "relative";

    var narrow = r.width < 250;
    var copy = getCopy(narrow);

    var bar = document.createElement("div");
    bar.className = "gafw" + (narrow ? " gafw--narrow" : "");

    // Text side
    var txt = document.createElement("div");
    txt.className = "gafw-txt";

    var icon = document.createElement("span");
    icon.className = "gafw-icon";
    icon.textContent = "\u2728";

    var copySpan = document.createElement("span");
    copySpan.className = "gafw-copy";
    copySpan.textContent = copy.text;

    txt.appendChild(icon);
    txt.appendChild(copySpan);

    // CTA
    var cta = document.createElement("a");
    cta.className = "gafw-cta";
    cta.href = redirectUrl;
    cta.innerHTML = copy.cta + ' <span class="gafw-arrow">\u2192</span>';

    bar.appendChild(txt);
    bar.appendChild(cta);
    el.appendChild(bar);
  }

  // ── Scan ─────────────────────────────────────────────────────
  function scan() {
    try {
      var els = document.querySelectorAll(selector);
      for (var i = 0; i < els.length; i++) attach(els[i]);
      var ifs = document.querySelectorAll("iframe");
      for (var j = 0; j < ifs.length; j++) {
        var f = ifs[j]; if (f.getAttribute(MK)) continue;
        var src = (f.src || "").toLowerCase(), id = (f.id || "").toLowerCase();
        if ((src.indexOf("doubleclick") > -1 || src.indexOf("googlesyndication") > -1 ||
             src.indexOf("amazon-adsystem") > -1 || id.indexOf("google_ads") > -1) && f.parentElement) {
          attach(f.parentElement);
        }
      }
    } catch (e) {}
  }

  // ── Observer ─────────────────────────────────────────────────
  function observe() {
    if (!window.MutationObserver) return;
    var ob = new MutationObserver(function (muts) {
      for (var i = 0; i < muts.length; i++) {
        if (muts[i].addedNodes.length) { clearTimeout(observe._t); observe._t = setTimeout(scan, 500); return; }
      }
    });
    ob.observe(document.body, { childList: true, subtree: true });
  }

  // ── Init ─────────────────────────────────────────────────────
  function init() {
    setTimeout(function () { scan(); observe(); }, config.delay);
    if (config.poll > 0) setInterval(scan, config.poll);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
