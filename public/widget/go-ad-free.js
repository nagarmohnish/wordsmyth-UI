/**
 * Go Ads-Free Widget — v4 Modern
 * Transparent glassmorphism overlay on ads + full popup subscription flow.
 * Zero dependencies. Works on any site.
 *
 * Usage:
 *   <script src="https://kids.wordsmyth.net/widget/go-ad-free.js"
 *     data-subscribe-url="https://kids.wordsmyth.net/subscribe"
 *     data-delay="1500"
 *     data-poll="3000"
 *     data-selectors=".my-ad"
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
  if (config.utmParam) redirectUrl += (redirectUrl.indexOf("?") === -1 ? "?" : "&") + config.utmParam;

  // ── Copy ──
  var wideCopy = [
    "Tired of ads? Read without distractions.",
    "Plot twist: this ad vanishes when you subscribe.",
    "Imagine this space — completely yours.",
    "Fun fact: subscribers never see this.",
    "Support education. Lose the ads.",
    "Less noise. More learning.",
  ];
  var narrowCopy = ["No more ads?", "Go clean", "Lose the ads", "Distraction-free"];
  var wI = 0, nI = 0;
  function getCopy(narrow) {
    if (narrow) { var c = narrowCopy[nI % narrowCopy.length]; nI++; return c; }
    var w = wideCopy[wI % wideCopy.length]; wI++; return w;
  }

  // ── Ad selectors ──
  var sels = [
    'ins.adsbygoogle','[id^="google_ads"]','[id^="div-gpt-ad"]','.gpt-ad','[data-google-query-id]','[id^="amzn-assoc"]',
    '[id*="freestar"]','[class*="freestar"]','[id^="mediavine"]','[class*="mediavine"]','[data-mediavine]','[class*="adthrive"]',
    '[class*="ad-slot"]','[class*="ad_slot"]','[class*="adSlot"]','[class*="ad-container"]','[class*="ad_container"]','[class*="adContainer"]',
    '[class*="ad-wrapper"]','[class*="ad_wrapper"]','[class*="adWrapper"]','[class*="ad-banner"]','[class*="ad_banner"]',
    '[class*="advertisement"]','[class*="sponsored"]','[id*="ad-slot"]','[id*="ad_slot"]','[id*="ad-container"]',
    '[id*="ad_container"]','[id*="ad-banner"]','[id*="ad_banner"]','[id*="advertisement"]',
    '[data-ad]','[data-ad-slot]','[data-ad-unit]','[data-adunit]','[data-dfp]',
    'iframe[src*="doubleclick"]','iframe[src*="googlesyndication"]','iframe[src*="amazon-adsystem"]','iframe[id^="google_ads"]',
  ];
  if (config.extraSelectors) config.extraSelectors.split(",").forEach(function (s) { var t = s.trim(); if (t) sels.push(t); });
  var selector = sels.join(", ");

  // ── Colors (indigo theme matching reference UI) ──
  var P = "#5468ff", PD = "#4354e0", PL = "#eef0ff", PT = "rgba(84,104,255,0.25)";

  // ── Inject CSS ──
  var sid = "gafw-v4";
  if (!document.getElementById(sid)) {
    var css = document.createElement("style");
    css.id = sid;
    css.textContent = '\
[data-gafw]{overflow:hidden!important}\
.gafw4{position:absolute;top:0;left:0;right:0;z-index:999999;display:flex;align-items:center;justify-content:space-between;\
height:34px;padding:0 10px 0 12px;\
background:rgba(255,255,255,0.88);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);\
border-bottom:1px solid rgba(0,0,0,0.06);\
font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;opacity:0;animation:gafw4in .35s ease-out .1s forwards;cursor:pointer}\
@keyframes gafw4in{to{opacity:1}}\
.gafw4-txt{color:#555;font-size:11.5px;font-weight:500;letter-spacing:.15px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1;min-width:0}\
.gafw4-cta{display:inline-flex;align-items:center;gap:5px;padding:5px 16px;\
background:'+P+';color:#fff!important;font-size:11px;font-weight:700;\
border-radius:50px;text-decoration:none!important;cursor:pointer;white-space:nowrap;\
box-shadow:0 2px 8px '+PT+';transition:all .2s;border:none;flex-shrink:0;margin-left:8px}\
.gafw4-cta:hover{transform:scale(1.05);box-shadow:0 4px 14px '+PT+'}\
.gafw4-cta:active{transform:scale(.97)}\
.gafw4-cta .dot{display:none}\
.gafw4-cta .arr{transition:transform .2s;font-size:10px}\
.gafw4-cta:hover .arr{transform:translateX(2px)}\
.gafw4--sm{height:28px;padding:0 6px;justify-content:center}\
.gafw4--sm .gafw4-txt{display:none}\
.gafw4--sm .gafw4-cta{padding:4px 12px;font-size:10px;margin-left:0}\
\
.gafw4-modal{position:fixed;inset:0;z-index:9999999;display:flex;align-items:center;justify-content:center;\
background:rgba(0,0,0,.45);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);\
font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;\
animation:gafw4fade .25s ease-out;padding:16px}\
@keyframes gafw4fade{from{opacity:0}to{opacity:1}}\
.gafw4-popup{width:440px;max-width:100%;max-height:90vh;overflow-y:auto;background:#fff;border-radius:20px;\
box-shadow:0 24px 80px rgba(0,0,0,.2);animation:gafw4pop .3s cubic-bezier(.16,1,.3,1);position:relative}\
@keyframes gafw4pop{from{opacity:0;transform:scale(.94) translateY(10px)}to{opacity:1;transform:none}}\
.gafw4-popup *{box-sizing:border-box;margin:0;padding:0}\
.gafw4-close{position:absolute;top:14px;right:16px;background:none;border:none;font-size:20px;color:#bbb;cursor:pointer;z-index:2;line-height:1;padding:4px}\
.gafw4-close:hover{color:#666}\
input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none}\
input[type=number]{-moz-appearance:textfield}\
';
    document.head.appendChild(css);
  }

  // ──────────────────────────────────────────
  //  POPUP — Full subscription flow
  // ──────────────────────────────────────────
  var modal = null;
  var popup = null;
  var S = { screen: "widget", freq: "quarterly", preset: 25, custom: "", isCustom: false, method: null, name: "", email: "" };
  var PRESETS = [5, 10, 25, 50];
  var POPULAR = 25;
  var FREQS = ["one-time", "monthly", "quarterly", "yearly"];

  function gAmt() { return S.isCustom ? (parseInt(S.custom, 10) || 0) : S.preset; }
  function gFL() { return { "one-time": "", monthly: " / month", quarterly: " / quarter", yearly: " / year" }[S.freq] || ""; }
  function gFT() { return { "one-time": "one-time", monthly: "every month", quarterly: "every quarter", yearly: "every year" }[S.freq] || ""; }
  function gDaily() { var a = gAmt(); if (a <= 0) return null; var d = { "one-time": null, monthly: 30, quarterly: 90, yearly: 365 }[S.freq]; return d ? "$" + (a / d).toFixed(2) + "/day" : null; }

  function openPopup() {
    if (modal) return;
    S.screen = "widget";
    modal = document.createElement("div");
    modal.className = "gafw4-modal";
    modal.onclick = function (e) { if (e.target === modal) closePopup(); };
    popup = document.createElement("div");
    popup.className = "gafw4-popup";
    modal.appendChild(popup);
    document.body.appendChild(modal);
    document.body.style.overflow = "hidden";
    renderPopup();
  }

  function closePopup() {
    if (modal) { document.body.removeChild(modal); modal = null; popup = null; document.body.style.overflow = ""; }
  }

  function renderPopup() {
    if (!popup) return;
    if (S.screen === "widget") renderWidget();
    else if (S.screen === "checkout") renderCheckout();
    else if (S.screen === "success") renderSuccess();
  }

  // ── Screen: Widget ──
  function renderWidget() {
    var a = gAmt(), daily = gDaily();
    var h = '<button class="gafw4-close" data-a="close">&times;</button>';
    h += '<div style="padding:32px 28px 28px">';
    h += '<h2 style="font-size:1.35em;font-weight:800;text-align:center;color:#1a1a2e;margin-bottom:16px">Support Free Learning</h2>';

    // Frequency dropdown
    h += '<div style="display:flex;justify-content:center;margin-bottom:18px">';
    h += '<div style="position:relative;display:inline-block">';
    h += '<select data-a="freq" style="appearance:none;-webkit-appearance:none;padding:9px 36px 9px 18px;border:1.5px solid #e0e0e0;border-radius:50px;font-size:13px;font-weight:600;color:#333;background:#fff;cursor:pointer;outline:none;min-width:140px;text-align:center">';
    FREQS.forEach(function (f) {
      var label = f.charAt(0).toUpperCase() + f.slice(1).replace("-", "-");
      h += '<option value="' + f + '"' + (S.freq === f ? ' selected' : '') + '>' + label + '</option>';
    });
    h += '</select>';
    h += '<span style="position:absolute;right:14px;top:50%;transform:translateY(-50%);pointer-events:none;font-size:10px;color:#999">&#x25BC;</span>';
    h += '</div></div>';

    // Amount display + daily
    h += '<div style="display:flex;align-items:center;justify-content:space-between;border:1.5px solid #e8e8e8;border-radius:12px;padding:14px 18px;margin-bottom:14px">';
    h += '<div style="display:flex;align-items:baseline;gap:3px"><span style="font-size:16px;color:#999;font-weight:600">$</span>';
    h += '<input type="number" min="1" value="' + a + '" data-a="amt-input" style="border:none;outline:none;font-size:2em;font-weight:800;color:#1a1a2e;width:100px;background:transparent;font-family:inherit"></div>';
    if (daily) h += '<span style="font-size:12px;color:#999;font-weight:500">' + daily + '</span>';
    h += '</div>';

    // Presets
    h += '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:16px">';
    PRESETS.forEach(function (p) {
      var ac = !S.isCustom && S.preset === p;
      h += '<div style="position:relative;text-align:center">';
      if (p === POPULAR) h += '<span style="position:absolute;top:-8px;left:50%;transform:translateX(-50%);font-size:8px;font-weight:700;color:' + P + ';white-space:nowrap">Popular</span>';
      h += '<button data-preset="' + p + '" style="width:100%;padding:10px 0;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;transition:all .15s;border:1.5px solid ' + (ac ? P : '#e0e0e0') + ';background:' + (ac ? ''+PL+'' : '#fff') + ';color:' + (ac ? P : '#333') + '">$' + p + '</button></div>';
    });
    h += '</div>';

    // Perk
    h += '<p style="text-align:center;font-size:12px;color:' + P + ';font-weight:500;margin-bottom:18px"><span style="font-size:14px">&#x2714;</span> Includes ads-free experience</p>';

    // CTA
    var label = a > 0 ? "Continue with $" + a + gFL() : "Continue";
    h += '<button data-a="continue" style="width:100%;padding:15px;background:' + P + ';color:#fff;border:none;border-radius:12px;font-size:15px;font-weight:700;cursor:pointer;transition:background .15s;box-shadow:0 4px 16px '+PT+'">' + label + '</button>';

    // Trust
    h += '<div style="margin-top:14px;text-align:center;font-size:10.5px;color:#bbb;display:flex;align-items:center;justify-content:center;gap:6px">&#x1F512; Secure payment';
    h += '<span style="color:#ddd">|</span>';
    ["ApplePay", "Visa", "MC"].forEach(function (n) { h += '<span style="border:1px solid #e0e0e0;border-radius:3px;padding:1px 5px;font-size:9px;font-weight:600;color:#999">' + n + '</span>'; });
    h += '</div>';
    h += '<div style="margin-top:8px;display:flex;justify-content:center;gap:14px;font-size:9.5px;color:#ccc"><span>Secure &amp; encrypted</span><span>Cancel anytime</span><span>Takes &lt;10 seconds</span></div>';
    h += '</div>';
    popup.innerHTML = h;
  }

  // ── Screen: Checkout ──
  function renderCheckout() {
    var a = gAmt();
    var h = '<button class="gafw4-close" data-a="close">&times;</button>';
    h += '<div style="padding:28px 28px 24px">';
    h += '<p style="font-size:12px;color:#999;margin-bottom:2px">You\'re supporting</p>';
    h += '<p style="font-size:2em;font-weight:800;color:#1a1a2e;margin-bottom:2px;font-family:inherit">$' + a + gFL() + '</p>';
    h += '<p style="font-size:11.5px;color:' + P + ';font-weight:500;margin-bottom:22px">Helping children discover new words every day</p>';

    // Email
    h += '<div style="margin-bottom:14px"><label style="display:block;font-size:11px;font-weight:600;color:#666;margin-bottom:4px">Email address</label>';
    h += '<input type="email" placeholder="you@example.com" data-a="email" value="' + (S.email || '') + '" style="width:100%;padding:11px 14px;border:1.5px solid #e0e0e0;border-radius:10px;font-size:13px;color:#333;outline:none;background:#fff;transition:border-color .15s"></div>';

    h += '<p style="font-size:13px;font-weight:600;margin-bottom:12px">Select payment method</p>';

    // Bank
    h += '<div data-a="method-bank" style="width:100%;padding:14px;margin-bottom:8px;border:1.5px solid ' + (S.method === "bank" ? P : '#e0e0e0') + ';border-radius:12px;background:' + (S.method === "bank" ? ''+PL+'' : '#fff') + ';cursor:pointer;display:flex;align-items:center;justify-content:space-between;transition:all .15s">';
    h += '<div style="display:flex;align-items:center;gap:10px"><span style="width:34px;height:34px;border-radius:8px;background:#f5f5f5;display:flex;align-items:center;justify-content:center;font-size:15px">&#x1F3E6;</span><div><span style="font-size:13px;font-weight:600;display:block">Direct Bank Transfer (ACH)</span><span style="font-size:10px;color:' + P + '">Best for long-term support</span></div></div>';
    h += '<span style="font-size:12px;color:#999">&#x25BE;</span></div>';

    // Express
    h += '<div style="text-align:center;margin:16px 0 10px"><span style="font-size:11px;color:#999">Express checkout</span></div>';
    h += '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:14px">';
    ["Apple Pay", "Google Pay", "PayPal", "Venmo"].forEach(function (n) {
      h += '<button style="padding:10px 4px;border-radius:8px;border:1.5px solid #e0e0e0;background:#fff;font-size:11px;font-weight:600;color:#333;cursor:pointer;transition:border-color .15s">' + n + '</button>';
    });
    h += '</div>';

    // Card
    h += '<div data-a="method-card" style="width:100%;padding:14px;margin-bottom:4px;border:1.5px solid ' + (S.method === "card" ? P : '#e0e0e0') + ';border-radius:12px;background:' + (S.method === "card" ? ''+PL+'' : '#fff') + ';cursor:pointer;display:flex;align-items:center;justify-content:space-between;transition:all .15s">';
    h += '<div style="display:flex;align-items:center;gap:10px"><span style="width:34px;height:34px;border-radius:8px;background:#f5f5f5;display:flex;align-items:center;justify-content:center;font-size:15px">&#x1F4B3;</span><span style="font-size:13px;font-weight:600">Card payment</span></div>';
    h += '<span style="font-size:12px;color:#999;transition:transform .2s;' + (S.method === "card" ? "transform:rotate(180deg)" : "") + '">&#x25BE;</span></div>';

    if (S.method === "card") {
      h += '<div style="border:1px solid #e0e0e0;border-top:none;border-radius:0 0 12px 12px;padding:14px;background:#fff;margin-bottom:4px">';
      h += '<div style="margin-bottom:10px"><label style="display:block;font-size:10px;font-weight:600;color:#666;margin-bottom:3px">Name on card</label><input type="text" placeholder="John Doe" data-a="name" value="' + (S.name || '') + '" style="width:100%;padding:10px 12px;border:1.5px solid #e0e0e0;border-radius:8px;font-size:13px;color:#333;outline:none"></div>';
      h += '<div style="margin-bottom:10px"><label style="display:block;font-size:10px;font-weight:600;color:#666;margin-bottom:3px">Card number</label><input type="text" placeholder="1234 5678 9012 3456" style="width:100%;padding:10px 12px;border:1.5px solid #e0e0e0;border-radius:8px;font-size:13px;color:#333;outline:none"></div>';
      h += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">';
      h += '<div><label style="display:block;font-size:10px;font-weight:600;color:#666;margin-bottom:3px">Expiry</label><input type="text" placeholder="MM / YY" style="width:100%;padding:10px 12px;border:1.5px solid #e0e0e0;border-radius:8px;font-size:13px;color:#333;outline:none"></div>';
      h += '<div><label style="display:block;font-size:10px;font-weight:600;color:#666;margin-bottom:3px">CVC</label><input type="text" placeholder="123" style="width:100%;padding:10px 12px;border:1.5px solid #e0e0e0;border-radius:8px;font-size:13px;color:#333;outline:none"></div>';
      h += '</div></div>';
    }

    h += '<p style="text-align:center;font-size:10.5px;color:#bbb;margin:16px 0">&#x1F512; Secure payment &bull; Powered by Stripe</p>';
    h += '<button data-a="pay" style="width:100%;padding:16px;background:' + P + ';color:#fff;border:none;border-radius:12px;font-size:15px;font-weight:700;cursor:pointer;box-shadow:0 4px 16px '+PT+';transition:background .15s">Complete Payment &mdash; $' + a + gFL() + '</button>';
    h += '</div>';
    popup.innerHTML = h;
  }

  // ── Screen: Success / Certificate ──
  function renderSuccess() {
    var a = gAmt(), name = S.name || "Supporter";
    var date = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    var shareText = encodeURIComponent("I just supported Wordsmyth — a free dictionary helping 50,000+ children learn new words daily. Join me! https://kids.wordsmyth.net/support");

    var h = '<button class="gafw4-close" data-a="close">&times;</button>';
    // Header
    h += '<div style="padding:28px 24px 20px;text-align:center;border-bottom:1px solid #f0f0f0">';
    h += '<div style="width:48px;height:48px;border-radius:50%;background:'+PL+';border:2px solid ' + P + ';display:flex;align-items:center;justify-content:center;margin:0 auto 12px;font-size:20px;color:' + P + '">&#x2714;</div>';
    h += '<p style="font-size:13px;color:#666;line-height:1.5">Your $' + a + ' ' + gFT() + ' support is confirmed.</p>';
    h += '<p style="font-size:13px;color:#666;line-height:1.5;margin-bottom:12px">You\'re now one of us &mdash; helping keep learning free for children worldwide.</p>';
    h += '<span style="display:inline-flex;align-items:center;gap:5px;padding:6px 16px;border-radius:20px;border:1px solid ' + P + ';background:'+PL+';font-size:11px;font-weight:600;color:' + P + '">&#x1F499; Official Supporter of Free Learning</span>';
    h += '</div>';

    // Certificate
    h += '<div style="padding:20px 24px">';
    h += '<div style="border-radius:14px;overflow:hidden;box-shadow:0 6px 24px rgba(0,0,0,.1);border:1px solid #e8e8e8">';
    // Light certificate card (matching reference screenshots)
    h += '<div style="background:#fff;padding:24px 22px;text-align:center;position:relative">';
    h += '<div style="position:absolute;top:12px;left:16px;font-size:14px;color:' + P + '">&#x1F499;</div>';
    h += '<div style="position:absolute;top:12px;right:16px;font-size:14px;color:#ccc;cursor:pointer">&#x2197;</div>';
    h += '<p style="font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#999;margin:8px 0 16px">Certificate of Support</p>';
    h += '<div style="width:36px;height:1.5px;background:#e0e0e0;margin:0 auto 14px"></div>';
    h += '<p style="font-size:11px;color:#999">This certifies that</p>';
    h += '<p style="font-size:1.4em;font-weight:800;color:#1a1a2e;margin:4px 0 12px">' + name + '</p>';
    h += '<p style="font-size:11px;color:#999;margin-bottom:10px">is a proud supporter of</p>';
    // Logo
    h += '<div style="display:flex;align-items:center;justify-content:center;gap:6px;margin-bottom:14px">';
    h += '<div style="width:30px;height:30px;border-radius:50%;background:' + P + ';display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#fff">W</div>';
    h += '<span style="font-size:1.15em;font-weight:700;letter-spacing:1px"><span style="color:' + P + '">WORD</span><span style="color:#999">SMYTH</span></span></div>';
    h += '<div style="width:36px;height:1px;background:#e8e8e8;margin:0 auto 14px"></div>';
    h += '<p style="font-size:11px;color:#999;font-style:italic;margin-bottom:10px">For keeping learning free &amp; accessible for every child</p>';
    h += '<p style="font-size:1em;font-weight:700;color:#1a1a2e;margin-bottom:2px">$' + a + ' ' + gFT() + '</p>';
    h += '<p style="font-size:11px;color:#bbb">' + date + '</p>';
    h += '</div>';
    // Perk
    h += '<div style="background:'+PL+';padding:12px 16px;border-top:1px solid #f0f0f0;display:flex;align-items:center;gap:8px;font-size:11px;color:#333">';
    h += '<span style="color:' + P + ';font-size:14px">&#x2714;</span> Your Wordsmyth experience will be <strong style="color:' + P + '">&nbsp;ads-free&nbsp;</strong> while your support is active.</div>';
    h += '</div>';

    // Share
    h += '<div style="margin-top:18px;text-align:center">';
    h += '<p style="font-size:9px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#bbb;margin-bottom:8px">Show others you support free learning</p>';
    h += '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px">';
    h += '<a href="https://twitter.com/intent/tweet?text=' + shareText + '" target="_blank" rel="noopener" style="display:flex;align-items:center;justify-content:center;padding:8px;border-radius:8px;background:#1a1a2e;color:#fff;font-size:11px;font-weight:600;text-decoration:none;gap:4px">&#x1D54F; X</a>';
    h += '<a href="https://www.linkedin.com/sharing/share-offsite/?url=https://kids.wordsmyth.net/support" target="_blank" rel="noopener" style="display:flex;align-items:center;justify-content:center;padding:8px;border-radius:8px;background:#0A66C2;color:#fff;font-size:11px;font-weight:600;text-decoration:none">in LinkedIn</a>';
    h += '<a href="https://wa.me/?text=' + shareText + '" target="_blank" rel="noopener" style="display:flex;align-items:center;justify-content:center;padding:8px;border-radius:8px;background:#25D366;color:#fff;font-size:11px;font-weight:600;text-decoration:none">WhatsApp</a>';
    h += '</div></div>';

    h += '<div style="text-align:center;margin-top:14px"><a href="' + redirectUrl + '" style="font-size:12px;color:#999;text-decoration:underline">Manage your support</a></div>';
    h += '<p style="text-align:center;font-size:10px;color:#ccc;margin-top:8px">&#x2709; Certificate and invoice sent to your email</p>';
    h += '</div>';
    popup.innerHTML = h;
  }

  // ── Popup event delegation ──
  function handlePopupClick(e) {
    var t = e.target; if (!t) return;
    var a = t.getAttribute("data-a") || t.closest("[data-a]")?.getAttribute("data-a");
    if (!a && t.closest) { var p = t.closest("[data-preset]"); if (p) a = null; }

    // Preset
    var pr = t.getAttribute("data-preset") || (t.closest && t.closest("[data-preset]")?.getAttribute("data-preset"));
    if (pr) { S.preset = parseInt(pr, 10); S.isCustom = false; S.custom = ""; renderPopup(); return; }

    if (a === "close") { closePopup(); return; }
    if (a === "freq") { S.freq = t.value; renderPopup(); return; }
    if (a === "continue") { S.screen = "checkout"; renderPopup(); return; }
    if (a === "method-bank" || (t.closest && t.closest("[data-a='method-bank']"))) { S.method = S.method === "bank" ? null : "bank"; renderPopup(); return; }
    if (a === "method-card" || (t.closest && t.closest("[data-a='method-card']"))) { S.method = S.method === "card" ? null : "card"; renderPopup(); return; }
    if (a === "pay") {
      // Save inputs
      var nameEl = popup.querySelector("[data-a='name']");
      var emailEl = popup.querySelector("[data-a='email']");
      if (nameEl) S.name = nameEl.value;
      if (emailEl) S.email = emailEl.value;
      t.textContent = "Processing...";
      t.style.background = "#c8cfff";
      t.style.cursor = "default";
      setTimeout(function () { S.screen = "success"; renderPopup(); }, 1800);
      return;
    }
  }

  function handlePopupInput(e) {
    var t = e.target; if (!t) return;
    if (t.getAttribute("data-a") === "amt-input") {
      S.custom = t.value; S.isCustom = true;
      var a = gAmt(), daily = gDaily();
      var cta = popup.querySelector("[data-a='continue']");
      if (cta) cta.textContent = a > 0 ? "Continue with $" + a + gFL() : "Continue";
    }
    if (t.getAttribute("data-a") === "name") S.name = t.value;
    if (t.getAttribute("data-a") === "email") S.email = t.value;
  }

  // Bind events via delegation on modal
  document.addEventListener("click", function (e) { if (modal && modal.contains(e.target)) handlePopupClick(e); });
  document.addEventListener("input", function (e) { if (modal && modal.contains(e.target)) handlePopupInput(e); });
  document.addEventListener("change", function (e) { if (modal && modal.contains(e.target)) handlePopupClick(e); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && modal) closePopup(); });

  // ──────────────────────────────────────────
  //  AD OVERLAY — transparent glassmorphism
  // ──────────────────────────────────────────
  var MK = "data-gafw";

  function attach(el) {
    if (el.getAttribute(MK)) return;
    el.setAttribute(MK, "1");

    var r = el.getBoundingClientRect();
    if (r.width < 40 || r.height < 20) return;

    var pos = window.getComputedStyle(el).position;
    if (pos === "static" || pos === "") el.style.position = "relative";

    var narrow = r.width < 200;
    var copy = getCopy(narrow);

    var overlay = document.createElement("div");
    overlay.className = "gafw4" + (narrow ? " gafw4--sm" : "");
    overlay.onclick = function (e) { e.preventDefault(); e.stopPropagation(); openPopup(); };

    var txt = document.createElement("div");
    txt.className = "gafw4-txt";
    txt.textContent = copy;

    var cta = document.createElement("button");
    cta.className = "gafw4-cta";
    cta.innerHTML = '<span class="dot"></span>Go Ads-Free<span class="arr">&rarr;</span>';

    overlay.appendChild(txt);
    overlay.appendChild(cta);
    el.appendChild(overlay);
  }

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
    } catch (e) { }
  }

  function observe() {
    if (!window.MutationObserver) return;
    var ob = new MutationObserver(function (muts) {
      for (var i = 0; i < muts.length; i++) {
        if (muts[i].addedNodes.length) { clearTimeout(observe._t); observe._t = setTimeout(scan, 500); return; }
      }
    });
    ob.observe(document.body, { childList: true, subtree: true });
  }

  function init() {
    setTimeout(function () { scan(); observe(); }, config.delay);
    if (config.poll > 0) setInterval(scan, config.poll);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
