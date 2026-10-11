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

  /* ---------- Audio: one clip at a time ---------- */
  var audio = null, activeRow = null;

  function stop() {
    if (audio) { audio.pause(); audio = null; }
    if (activeRow) {
      activeRow.classList.remove("is-playing");
      var b = activeRow.querySelector(".play");
      if (b) b.setAttribute("aria-label", b.getAttribute("data-label-play"));
      var bar = activeRow.querySelector(".prog i");
      if (bar) bar.style.width = "0";
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
    btn.setAttribute("aria-label", btn.getAttribute("data-label-pause"));
    var bar = row.querySelector(".prog i");
    audio.addEventListener("timeupdate", function () {
      if (bar && audio && audio.duration) bar.style.width = (100 * audio.currentTime / audio.duration).toFixed(1) + "%";
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
    document.querySelectorAll("[data-voice-switch] button").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-voice") === voice ? "true" : "false");
    });
    document.querySelectorAll("[data-" + voice + "]").forEach(function (row) {
      var d = row.getAttribute("data-" + voice).split("|"); // mean|lo|hi|src|secs
      var mean = parseFloat(d[0]), lo = parseFloat(d[1]), hi = parseFloat(d[2]);
      var dot = row.querySelector(".dot"), ci = row.querySelector(".ci"), val = row.querySelector(".mos-val");
      if (dot) dot.style.left = pct(mean);
      if (ci) { ci.style.left = pct(lo); ci.style.width = ((hi - lo) / 2.5 * 100).toFixed(1) + "%"; }
      if (val) val.textContent = mean.toFixed(2);
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
  }
  if (seg) {
    seg.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-voice]");
      if (b) setVoice(b.getAttribute("data-voice"));
    });
    setVoice("female");
  }
})();
