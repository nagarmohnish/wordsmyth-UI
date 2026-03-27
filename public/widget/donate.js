/**
 * Wordsmyth Donation Widget — Plug & Play
 * Drop one script tag on any website to show a donation widget.
 *
 * Usage:
 *   <script src="https://kids.wordsmyth.net/widget/donate.js"
 *     data-support-url="https://kids.wordsmyth.net/support"
 *     data-placement="sticky"
 *     data-delay="3000"
 *   ></script>
 *
 * Placements: "sticky" (default), "inline"
 * data-target: CSS selector for inline placement container
 * data-delay: ms before sticky widget appears (default 3000)
 * data-support-url: where "Continue" links to (default /support)
 */
(function () {
  "use strict";

  var scriptEl = document.currentScript || (function () {
    var s = document.getElementsByTagName("script");
    return s[s.length - 1];
  })();

  var config = {
    supportUrl: scriptEl.getAttribute("data-support-url") || "/support",
    placement: scriptEl.getAttribute("data-placement") || "sticky",
    target: scriptEl.getAttribute("data-target") || null,
    delay: parseInt(scriptEl.getAttribute("data-delay") || "3000", 10),
    utm: scriptEl.getAttribute("data-utm") || "donation-widget-embed",
  };

  // ── Palette ──
  var C = {
    white: "#ffffff", green: "#18AD4A", greenDark: "#3d9739",
    greenFaint: "#f0faf0", text: "#333", textMuted: "#666",
    textLight: "#999", border: "#e0e0e0", borderLight: "#f0f0f0", bg: "#fafafa",
  };

  var PRESETS = [5, 10, 25, 50];
  var POPULAR = 10;
  var HEADLINE = "Skip one takeout order\u2014help a child discover new words today.";

  // ── State ──
  var state = {
    frequency: "one-time",
    selectedPreset: POPULAR,
    customAmount: "",
    isCustom: false,
    expanded: false,
    visible: false,
    dismissed: false,
  };

  function getAmount() {
    return state.isCustom ? (parseInt(state.customAmount, 10) || 0) : state.selectedPreset;
  }

  function supportUrl() {
    var amt = getAmount();
    var params = [];
    if (amt > 0) params.push("amount=" + amt);
    params.push("frequency=" + state.frequency);
    params.push("utm_source=" + config.utm);
    return config.supportUrl + (config.supportUrl.indexOf("?") === -1 ? "?" : "&") + params.join("&");
  }

  // ── Inject styles ──
  var SID = "wsm-donate-v1";
  if (!document.getElementById(SID)) {
    var style = document.createElement("style");
    style.id = SID;
    style.textContent = [
      ".wsm-dw * { box-sizing: border-box; margin: 0; padding: 0; }",
      ".wsm-dw { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: " + C.text + "; }",
      ".wsm-dw input[type=number]::-webkit-inner-spin-button,",
      ".wsm-dw input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }",
      ".wsm-dw input[type=number] { -moz-appearance: textfield; }",
      ".wsm-dw-card { width: 380px; max-width: 100%; background: " + C.white + "; border-radius: 16px; border: 1px solid " + C.borderLight + "; box-shadow: 0 4px 24px rgba(0,0,0,0.07); overflow: hidden; }",
      ".wsm-dw-body { padding: 28px 24px; }",
      ".wsm-dw-title { font-size: 1.3em; font-weight: 700; text-align: center; line-height: 1.3; margin-bottom: 6px; }",
      ".wsm-dw-sub { font-size: 12px; color: " + C.textMuted + "; text-align: center; line-height: 1.4; margin-bottom: 18px; }",
      ".wsm-dw-freq { display: flex; justify-content: center; margin-bottom: 16px; }",
      ".wsm-dw-freq-inner { display: inline-flex; background: " + C.bg + "; border-radius: 8px; padding: 3px; border: 1px solid " + C.borderLight + "; }",
      ".wsm-dw-freq-btn { padding: 7px 18px; border-radius: 6px; border: none; cursor: pointer; font-size: 12.5px; font-weight: 600; background: transparent; color: " + C.textLight + "; transition: all 0.15s; }",
      ".wsm-dw-freq-btn.active { background: " + C.white + "; color: " + C.text + "; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }",
      ".wsm-dw-amount { text-align: center; margin-bottom: 14px; font-size: 2.4em; font-weight: 800; }",
      ".wsm-dw-daily { font-size: 12px; color: " + C.textLight + "; font-weight: 500; margin-left: 8px; }",
      ".wsm-dw-presets { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-bottom: 8px; }",
      ".wsm-dw-preset { position: relative; text-align: center; }",
      ".wsm-dw-preset-btn { width: 100%; padding: 10px 0; border-radius: 8px; cursor: pointer; font-size: 13.5px; font-weight: 600; border: 2px solid " + C.border + "; background: " + C.white + "; color: " + C.text + "; transition: all 0.15s; }",
      ".wsm-dw-preset-btn.active { border-color: " + C.green + "; background: " + C.greenFaint + "; color: " + C.green + "; }",
      ".wsm-dw-popular { position: absolute; top: -9px; left: 50%; transform: translateX(-50%); font-size: 9px; font-weight: 700; color: " + C.white + "; background: " + C.green + "; padding: 1px 6px; border-radius: 4px; white-space: nowrap; }",
      ".wsm-dw-custom-row { display: flex; align-items: center; gap: 8px; margin-bottom: 16px; }",
      ".wsm-dw-custom-btn { padding: 8px 14px; border-radius: 8px; cursor: pointer; font-size: 12px; font-weight: 600; border: 2px solid " + C.border + "; background: " + C.white + "; color: " + C.textMuted + "; transition: all 0.15s; white-space: nowrap; }",
      ".wsm-dw-custom-btn.active { border-color: " + C.green + "; background: " + C.greenFaint + "; color: " + C.green + "; }",
      ".wsm-dw-custom-input { flex: 1; display: flex; align-items: center; border: 2px solid " + C.green + "; border-radius: 8px; padding: 0 10px; background: " + C.greenFaint + "; }",
      ".wsm-dw-custom-input span { font-size: 13px; font-weight: 600; color: " + C.textMuted + "; }",
      ".wsm-dw-custom-input input { flex: 1; border: none; outline: none; padding: 8px 6px; font-size: 13px; font-weight: 600; color: " + C.text + "; background: transparent; font-family: inherit; }",
      ".wsm-dw-perk { text-align: center; font-size: 12px; color: " + C.green + "; font-weight: 500; margin-bottom: 16px; }",
      ".wsm-dw-cta { display: block; text-align: center; padding: 14px; background: " + C.green + "; color: " + C.white + "; text-decoration: none; border-radius: 10px; font-weight: 700; font-size: 14px; border: none; cursor: pointer; width: 100%; transition: background 0.15s; }",
      ".wsm-dw-cta:hover { background: " + C.greenDark + "; }",
      ".wsm-dw-trust { margin-top: 14px; text-align: center; font-size: 11px; color: " + C.textLight + "; }",
      ".wsm-dw-trust-bottom { margin-top: 10px; display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; font-size: 10px; color: " + C.textLight + "; }",
      ".wsm-dw-dismiss { display: block; width: 100%; text-align: center; margin-top: 10px; background: none; border: none; color: " + C.textLight + "; font-size: 11px; cursor: pointer; }",
      ".wsm-dw-close { position: absolute; top: -4px; right: -4px; background: none; border: none; color: " + C.textLight + "; font-size: 20px; cursor: pointer; line-height: 1; padding: 4px; }",
      /* Sticky wrapper */
      ".wsm-dw-sticky { position: fixed; bottom: 20px; left: 20px; z-index: 99999; transition: all 0.4s cubic-bezier(0.16,1,0.3,1); transform: translateY(120%); opacity: 0; pointer-events: none; }",
      ".wsm-dw-sticky.visible { transform: translateY(0); opacity: 1; pointer-events: auto; }",
      ".wsm-dw-pill { display: flex; align-items: center; gap: 8px; padding: 10px 18px; background: " + C.green + "; color: " + C.white + "; border: none; border-radius: 50px; cursor: pointer; font-size: 13px; font-weight: 600; box-shadow: 0 4px 16px rgba(24,173,74,0.3); transition: transform 0.2s; }",
      ".wsm-dw-pill:hover { transform: scale(1.05); }",
      ".wsm-dw-pill-icon { width: 24px; height: 24px; border-radius: 50%; background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; font-size: 13px; flex-shrink: 0; }",
    ].join("\n");
    document.head.appendChild(style);
  }

  // ── Render widget card HTML ──
  function renderCard(showDismiss) {
    var amt = getAmount();
    var isMonthly = state.frequency === "monthly";
    var daily = isMonthly && amt > 0 ? (amt / 30).toFixed(2) : null;

    var html = '<div class="wsm-dw-body">';
    // Title
    html += '<div style="position:relative;margin-bottom:20px">';
    if (showDismiss) html += '<button class="wsm-dw-close" data-action="dismiss">&times;</button>';
    html += '<div class="wsm-dw-title">Support Free Learning</div>';
    html += '<div class="wsm-dw-sub">' + HEADLINE + '</div>';
    html += '</div>';
    // Frequency
    html += '<div class="wsm-dw-freq"><div class="wsm-dw-freq-inner">';
    html += '<button class="wsm-dw-freq-btn' + (state.frequency === "one-time" ? " active" : "") + '" data-freq="one-time">One-time</button>';
    html += '<button class="wsm-dw-freq-btn' + (state.frequency === "monthly" ? " active" : "") + '" data-freq="monthly">Monthly</button>';
    html += '</div></div>';
    // Amount display
    html += '<div class="wsm-dw-amount">$' + (amt > 0 ? amt : "0");
    if (daily) html += '<span class="wsm-dw-daily">$' + daily + '/day</span>';
    html += '</div>';
    // Presets
    html += '<div class="wsm-dw-presets">';
    for (var i = 0; i < PRESETS.length; i++) {
      var p = PRESETS[i];
      var active = !state.isCustom && state.selectedPreset === p;
      html += '<div class="wsm-dw-preset">';
      if (p === POPULAR) html += '<span class="wsm-dw-popular">Popular</span>';
      html += '<button class="wsm-dw-preset-btn' + (active ? " active" : "") + '" data-preset="' + p + '">$' + p + '</button>';
      html += '</div>';
    }
    html += '</div>';
    // Custom
    html += '<div class="wsm-dw-custom-row">';
    html += '<button class="wsm-dw-custom-btn' + (state.isCustom ? " active" : "") + '" data-action="custom">Custom</button>';
    if (state.isCustom) {
      html += '<div class="wsm-dw-custom-input"><span>$</span><input type="number" min="1" placeholder="Enter amount" value="' + (state.customAmount || "") + '" data-action="custom-input" /></div>';
    }
    html += '</div>';
    // Perk
    html += '<div class="wsm-dw-perk">&#x2714; Go ads-free on all pages</div>';
    // CTA
    var label = amt > 0 ? "Continue with $" + amt + (isMonthly ? " / month" : "") : "Give Now";
    html += '<a class="wsm-dw-cta" href="' + supportUrl() + '">' + label + '</a>';
    // Trust
    html += '<div class="wsm-dw-trust">&#x1F512; Secure payment | Visa &middot; MC &middot; PayPal</div>';
    html += '<div class="wsm-dw-trust-bottom"><span>Secure &amp; encrypted</span><span>Cancel anytime</span><span>Takes 10 seconds</span></div>';
    if (showDismiss) html += '<button class="wsm-dw-dismiss" data-action="dismiss">Maybe later</button>';
    html += '</div>';

    return html;
  }

  // ── Event delegation ──
  function bindEvents(root, rerender) {
    root.addEventListener("click", function (e) {
      var t = e.target;
      if (!t) return;
      // Preset
      var preset = t.getAttribute("data-preset");
      if (preset) {
        state.selectedPreset = parseInt(preset, 10);
        state.isCustom = false;
        state.customAmount = "";
        rerender();
        return;
      }
      // Frequency
      var freq = t.getAttribute("data-freq");
      if (freq) {
        state.frequency = freq;
        rerender();
        return;
      }
      // Actions
      var action = t.getAttribute("data-action");
      if (action === "custom") {
        state.isCustom = true;
        state.customAmount = "";
        rerender();
        setTimeout(function () {
          var inp = root.querySelector('[data-action="custom-input"]');
          if (inp) inp.focus();
        }, 50);
        return;
      }
      if (action === "dismiss") {
        state.dismissed = true;
        state.visible = false;
        state.expanded = false;
        rerender();
        return;
      }
      if (action === "expand") {
        state.expanded = true;
        rerender();
        return;
      }
    });
    root.addEventListener("input", function (e) {
      var t = e.target;
      if (t && t.getAttribute("data-action") === "custom-input") {
        state.customAmount = t.value;
        state.isCustom = true;
        // Update CTA & amount display without full rerender to keep focus
        var ctaEl = root.querySelector(".wsm-dw-cta");
        var amtEl = root.querySelector(".wsm-dw-amount");
        var amt = getAmount();
        var isMonthly = state.frequency === "monthly";
        if (ctaEl) {
          ctaEl.textContent = amt > 0 ? "Continue with $" + amt + (isMonthly ? " / month" : "") : "Give Now";
          ctaEl.href = supportUrl();
        }
        if (amtEl) {
          var daily = isMonthly && amt > 0 ? (amt / 30).toFixed(2) : null;
          amtEl.innerHTML = "$" + (amt > 0 ? amt : "0") + (daily ? '<span class="wsm-dw-daily">$' + daily + '/day</span>' : "");
        }
      }
    });
  }

  // ── Sticky placement ──
  function initSticky() {
    var wrapper = document.createElement("div");
    wrapper.className = "wsm-dw wsm-dw-sticky";
    document.body.appendChild(wrapper);

    function render() {
      if (state.dismissed) { wrapper.style.display = "none"; return; }
      wrapper.className = "wsm-dw wsm-dw-sticky" + (state.visible ? " visible" : "");
      if (!state.expanded) {
        wrapper.innerHTML = '<button class="wsm-dw-pill" data-action="expand"><span class="wsm-dw-pill-icon">\uD83D\uDC9A</span><span>Help a child learn</span></button>';
      } else {
        wrapper.innerHTML = '<div class="wsm-dw-card">' + renderCard(true) + '</div>';
      }
    }

    bindEvents(wrapper, render);
    render();

    setTimeout(function () {
      state.visible = true;
      render();
    }, config.delay);
  }

  // ── Inline placement ──
  function initInline() {
    var target = config.target ? document.querySelector(config.target) : null;
    if (!target) {
      target = document.createElement("div");
      scriptEl.parentNode.insertBefore(target, scriptEl);
    }
    target.className = (target.className || "") + " wsm-dw";
    target.style.display = "flex";
    target.style.justifyContent = "center";
    target.style.padding = "24px 0";

    function render() {
      target.innerHTML = '<div class="wsm-dw-card">' + renderCard(false) + '</div>';
    }

    bindEvents(target, render);
    render();
  }

  // ── Init ──
  function init() {
    if (config.placement === "inline") initInline();
    else initSticky();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
