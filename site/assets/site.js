(function () {
  "use strict";
  var root = document.documentElement;

  /* ---------- Theme toggle (default: follow the system) ---------- */
  function currentTheme() {
    var t = root.getAttribute("data-theme");
    if (t) return t;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function labelThemeButtons() {
    var next = currentTheme() === "dark" ? "light" : "dark";
    document.querySelectorAll(".theme-btn").forEach(function (b) {
      b.setAttribute("aria-label", "Switch to " + next + " mode");
    });
  }
  document.querySelectorAll(".theme-btn").forEach(function (b) {
    b.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      labelThemeButtons();
    });
  });
  labelThemeButtons();

  /* ---------- Spectrogram helpers ---------- */
  var screen = document.querySelector(".screen");
  var screenSpec = screen ? screen.querySelector(".spec") : null;
  function specFor(src) { return "url(/assets/spec/spec-" + src.split("/").pop().replace(/\.mp3$/, "") + ".webp)"; }
  function setP(el, v) { if (el) el.style.setProperty("--p", v); }
  function showOnScreen(src, name, voice) {
    if (!screen || !src) return;
    screenSpec.style.setProperty("--m", specFor(src));
    var n = screen.querySelector(".now-name"), v = screen.querySelector(".now-voice");
    if (n && name) n.textContent = name;
    if (v && voice) v.textContent = voice + " voice";
  }

  /* ---------- Audio: one clip at a time ---------- */
  var audio = null, activeRow = null, voiceNow = "female";

  function stop() {
    if (audio) { audio.pause(); audio = null; }
    if (activeRow) {
      activeRow.classList.remove("is-playing");
      var b = activeRow.querySelector(".play");
      if (b) b.setAttribute("aria-label", b.getAttribute("data-label-play"));
      setP(activeRow.querySelector(".spec"), "100%");
      if (screen && activeRow.closest(".listen")) setP(screenSpec, "100%");
      activeRow = null;
    }
  }

  function play(row) {
    var btn = row.querySelector(".play");
    var src = row.getAttribute("data-src");
    if (!src) return;
    if (activeRow === row) { stop(); return; }
    stop();
    audio = new Audio(src);
    activeRow = row;
    row.classList.add("is-playing");
    if (btn) btn.setAttribute("aria-label", btn.getAttribute("data-label-pause"));
    var specs = [row.querySelector(".spec")];
    if (screen && row.closest(".listen")) {
      var label = row.querySelector(".mos-label strong, .fr-name");
      showOnScreen(src, label ? label.textContent.replace(/,\s*\d+\s*s$/, "") : "", voiceNow);
      specs.push(screenSpec);
    }
    specs.forEach(function (s) { setP(s, "0%"); });
    audio.addEventListener("timeupdate", function () {
      if (!audio || !audio.duration) return;
      var p = (100 * audio.currentTime / audio.duration).toFixed(2) + "%";
      specs.forEach(function (s) { setP(s, p); });
    });
    audio.addEventListener("ended", stop);
    audio.play().catch(stop);
  }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest ? e.target.closest(".play") : null;
    if (!btn) return;
    var row = btn.closest("[data-src]");
    if (row) play(row);
  });

  /* ---------- Voice switch (Walloon case study) ---------- */
  var seg = document.querySelector("[data-voice-switch]");
  function pct(v) { return ((v - 2.5) / 2.5 * 100).toFixed(1) + "%"; }

  function setVoice(voice) {
    stop();
    voiceNow = voice;
    document.querySelectorAll("[data-voice-switch] button").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-voice") === voice ? "true" : "false");
    });
    document.querySelectorAll("[data-" + voice + "]").forEach(function (row) {
      var d = row.getAttribute("data-" + voice).split("|"); // mean|lo|hi|src|secs
      var mean = parseFloat(d[0]), lo = parseFloat(d[1]), hi = parseFloat(d[2]);
      var dot = row.querySelector(".dot"), ci = row.querySelector(".ci"), val = row.querySelector(".mos-val");
      if (!isNaN(mean)) {
        if (dot) dot.style.left = pct(mean);
        if (ci) { ci.style.left = pct(lo); ci.style.width = ((hi - lo) / 2.5 * 100).toFixed(1) + "%"; }
        if (val) val.textContent = mean.toFixed(2);
      }
      var secs = row.querySelector(".secs");
      if (secs && d[4]) secs.textContent = d[4] + " s";
      if (d[3]) row.setAttribute("data-src", d[3]);
      var btn = row.querySelector(".play");
      if (btn) {
        var name = btn.getAttribute("data-name");
        btn.setAttribute("data-label-play", "Play " + name + ", " + voice + " voice");
        btn.setAttribute("data-label-pause", "Pause " + name + ", " + voice + " voice");
        btn.setAttribute("aria-label", "Play " + name + ", " + voice + " voice");
      }
    });
    var best = document.querySelector(".mos-row.best");
    if (best) showOnScreen(best.getAttribute("data-src"), best.querySelector(".mos-label strong").textContent, voice);
    setP(screenSpec, "100%");
  }
  if (seg) {
    seg.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-voice]");
      if (b) setVoice(b.getAttribute("data-voice"));
    });
    setVoice("female");
  }
  /* ---------- Looping demo videos: play while in view; never autoplay under reduced motion ---------- */
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var vids = document.querySelectorAll(".vid video");
  function run(v, on) { if (on) { var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); } else { v.pause(); } }
  vids.forEach(function (v) {
    var fig = v.closest(".vid"), btn = fig.querySelector(".vid-btn");
    v.addEventListener("play", function () { fig.classList.add("is-playing"); if (btn) btn.setAttribute("aria-label", "Pause " + btn.getAttribute("data-name")); });
    v.addEventListener("pause", function () { fig.classList.remove("is-playing"); if (btn) btn.setAttribute("aria-label", "Play " + btn.getAttribute("data-name")); });
    function toggle() { fig.setAttribute("data-user", v.paused ? "play" : "pause"); run(v, v.paused); }
    v.addEventListener("click", toggle);
    if (btn) btn.addEventListener("click", toggle);
  });
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var v = e.target, fig = v.closest(".vid"), user = fig.getAttribute("data-user");
        if (e.isIntersecting && e.intersectionRatio >= 0.5) { if (!reduce && user !== "pause") run(v, true); }
        else if (!v.paused) { run(v, false); }
      });
    }, { threshold: [0, 0.5] });
    vids.forEach(function (v) { io.observe(v); });
  }
})();
