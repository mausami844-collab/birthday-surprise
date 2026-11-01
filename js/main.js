
(function () {
  "use strict";

  const $ = id => document.getElementById(id);
  const C = CONFIG;
  const MEDIA = "media/";

  const esc = s => String(s).replace(/[&<>"]/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;"
  }[c]));

  const au = $("audio");
  const mb = $("musicBtn");
  const gate = $("gate");
  const dots = $("dots");

  // Support both old welcome IDs and the new Shinchan IDs
  const welcome = $("shinIntro") || $("welcome");
  const welcomeYes = $("shinYes") || $("welcomeYes");
  const welcomeNo = $("shinNo") || $("welcomeNo");
  const welcomeHint = $("welcome-hint") || $("shinHint");

  document.title = "🎂 Happy Birthday " + C.name + "!";

  dots.hidden = true;
  gate.hidden = true;

  /* ---------- fill content ---------- */

  $("bName").textContent = C.name;
  $("bSub").textContent = C.subtitle;

  $("petals").innerHTML = Array.from(
    { length: 16 },
    () => `<span style="left:${Math.random() * 100}%;animation-duration:${6 + Math.random() * 6}s;animation-delay:-${Math.random() * 8}s"></span>`
  ).join("");

  $("car").innerHTML = C.photos.map((p, i) => `
    <div class="slide">
      <figure class="pol" style="--r:${i % 2 ? 2 : -2}deg">
        <div class="ph">
          <img src="${MEDIA}photos/${esc(p.file)}"
               alt="${esc(p.caption)}" loading="lazy">
          <span hidden>Add ${esc(p.file)} to media/photos</span>
        </div>
        <p>${esc(p.caption)}</p>
      </figure>
    </div>
  `).join("");

  document.querySelectorAll(".pol").forEach(p => {
    const im = p.querySelector("img");

    im.addEventListener("error", () => {
      im.hidden = true;
      p.querySelector("span").hidden = false;
    }, { once: true });
  });

  $("vids").innerHTML = C.videos.map(v => `
    <div class="vf">
      <video controls playsinline preload="metadata"
             src="${MEDIA}videos/${esc(v.file)}"></video>
      <p>${esc(v.caption)}</p>
    </div>
  `).join("");

  document.querySelectorAll(".vf video").forEach(v => {
    v.addEventListener("error", () => {
      const d = document.createElement("div");
      d.className = "miss";
      d.textContent = "Add this video to media/videos/";
      v.replaceWith(d);
    }, { once: true });

    v.addEventListener("play", () => {
      au.pause();
      mb.classList.remove("on");

      document.querySelectorAll(".vf video").forEach(o => {
        if (o !== v) o.pause();
      });
    });
  });

  $("paper").innerHTML =
    `<h3>${esc(C.letterTitle.replace("{name}", C.name))}</h3>` +
    C.letter.map(p => `<p>${esc(p)}</p>`).join("") +
    `<p>(Hehe !!!Hateeeee u ),<br>${esc(C.from)}</p>`;

  const cn = $("canopy");

  cn.innerHTML = C.wishes.map((w, i, a) => {
    const r = Math.sqrt((i + 0.5) / a.length) * 44;
    const t = i * 2.399;

    return `
      <button class="hrt"
        style="left:${50 + r * Math.cos(t)}%;
               top:${50 + r * Math.sin(t)}%;
               font-size:${22 + (i * 7) % 16}px;
               animation-delay:-${(i * 0.37) % 2}s"
        aria-label="Wish ${i + 1}" data-i="${i}">
        ${["💖", "💗", "💝", "💘"][i % 4]}
      </button>
    `;
  }).join("");

  /* ---------- toast + confetti ---------- */

  let tt;

  function toast(m) {
    const t = $("toast");
    t.textContent = m;
    t.classList.add("show");

    clearTimeout(tt);

    tt = setTimeout(() => {
      t.classList.remove("show");
    }, 3200);
  }

  const cv = $("confetti");
  const cx = cv.getContext("2d");

  let parts = [];
  let run = false;

  function size() {
    cv.width = innerWidth;
    cv.height = innerHeight;
  }

  size();
  addEventListener("resize", size);

  function burst(n) {
    const cols = [
      "#ff8fb1", "#ffd27a", "#b9a4ff",
      "#8fd3ff", "#ffffff", "#ff7a3d"
    ];

    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2;
      const s = 4 + Math.random() * 9;

      parts.push({
        x: innerWidth / 2,
        y: innerHeight / 2.2,
        vx: Math.cos(a) * s,
        vy: Math.sin(a) * s - 5,
        w: 6 + Math.random() * 6,
        h: 4 + Math.random() * 6,
        r: Math.random() * 6,
        vr: Math.random() * 0.4 - 0.2,
        c: cols[i % 6],
        l: 120 + Math.random() * 60
      });
    }

    if (!run) {
      run = true;
      requestAnimationFrame(tick);
    }
  }

  function tick() {
    cx.clearRect(0, 0, cv.width, cv.height);

    parts = parts.filter(p => p.l-- > 0);

    parts.forEach(p => {
      p.vy += 0.22;
      p.vx *= 0.99;
      p.x += p.vx;
      p.y += p.vy;
      p.r += p.vr;

      cx.save();
      cx.translate(p.x, p.y);
      cx.rotate(p.r);
      cx.fillStyle = p.c;
      cx.globalAlpha = Math.min(1, p.l / 40);
      cx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      cx.restore();
    });

    if (parts.length) {
      requestAnimationFrame(tick);
    } else {
      run = false;
      cx.clearRect(0, 0, cv.width, cv.height);
    }
  }

  /* ---------- welcome / Shinchan screen ---------- */

  let noCount = 0;
  let lastWelcomeMove = 0;

  function moveWelcomeNo(e) {
    if (e) e.preventDefault();

    const now = Date.now();
    if (now - lastWelcomeMove < 180) return;

    lastWelcomeMove = now;

    const r = welcomeNo.getBoundingClientRect();

    const maxX = Math.max(10, innerWidth - r.width - 10);
    const maxY = Math.max(10, innerHeight - r.height - 10);

    welcomeNo.style.position = "fixed";
    welcomeNo.style.left =
      Math.max(10, Math.random() * maxX) + "px";
    welcomeNo.style.top =
      Math.max(10, Math.random() * maxY) + "px";

    const messages = [
      "Pakad ke dikhao 😂",
      "Nahi milega NO button 😜",
      "YES hi dabana padega madam 😂",
      "Hahaha try again! 🤣",
      "Arre YES dabao naaa 😂"
    ];

    if (welcomeHint) {
      welcomeHint.textContent =
        messages[noCount % messages.length];
    }

    noCount++;
  }

  if (welcomeNo) {
    welcomeNo.addEventListener("pointerenter", moveWelcomeNo);
    welcomeNo.addEventListener("pointerdown", moveWelcomeNo);
    welcomeNo.addEventListener("click", moveWelcomeNo);
  }

  if (welcomeYes) {
    welcomeYes.addEventListener("click", () => {
      welcome.classList.add("welcome-out");

      welcome.style.transition = "opacity .6s, transform .6s";
      welcome.style.opacity = "0";
      welcome.style.transform = "scale(1.05)";

      burst(70);

      setTimeout(() => {
        welcome.hidden = true;
        welcome.style.display = "none";

        gate.hidden = false;
        gate.classList.remove("gone");

        $("gateInput").focus();
      }, 600);
    });
  }

  /* ---------- stages ---------- */

  const stages = [...document.querySelectorAll(".stage")];

  let cur = 0;
  let reached = 0;
  let bakeT;

  dots.innerHTML = stages.map((_, i) => `
    <button aria-label="Step ${i + 1}" data-i="${i}"></button>
  `).join("");

  dots.addEventListener("click", e => {
    const b = e.target.closest("button");

    if (b && +b.dataset.i <= reached) {
      go(+b.dataset.i);
    }
  });

  function go(i) {
    if (i < 0 || i >= stages.length) return;

    if (stages[cur]) {
      stages[cur].classList.remove("active");
    }

    cur = i;
    reached = Math.max(reached, i);

    const s = stages[i];

    s.classList.add("active");
    s.scrollTop = 0;

    [...dots.children].forEach((d, k) => {
      d.classList.toggle("on", k === i);
      d.classList.toggle("seen", k <= reached);
    });

    clearTimeout(bakeT);

    document.querySelectorAll(".vf video").forEach(v => {
      v.pause();
    });

    if (s.id === "st-bake") {
      const f = $("barFill");

      f.style.transition = "none";
      f.style.width = "0";

      void f.offsetWidth;

      f.style.transition = "";
      f.style.width = "100%";

      bakeT = setTimeout(() => {
        if (cur === i) {
          burst(80);
          go(i + 1);
        }
      }, 3300);
    }
  }

  document.querySelectorAll(".next").forEach(b => {
    b.addEventListener("click", () => go(cur + 1));
  });

  /* ---------- password gate ---------- */

  const gi = $("gateInput");

  let wi = 0;
  let hi = 0;

  $("gateTitle").textContent = C.gateTitle;
  $("gateHint").textContent = C.gateText;

  function start(quick) {
    if (welcome) {
      welcome.hidden = true;
      welcome.style.display = "none";
    }

    gate.hidden = true;
    $("app").hidden = false;
    dots.hidden = false;
    mb.hidden = false;

    if (!quick) {
      burst(150);
    }

    go(0);
  }

  function tryGate() {
    if (
      gi.value.trim().toLowerCase() ===
      String(C.passcode).toLowerCase()
    ) {
      start(false);
    } else {
      $("gateHint").textContent =
        C.wrongReplies[wi++ % C.wrongReplies.length];

      gate.classList.remove("shake");
      void gate.offsetWidth;
      gate.classList.add("shake");

      gi.value = "";
    }
  }

  $("gateBtn").addEventListener("click", tryGate);

  gi.addEventListener("keydown", e => {
    if (e.key === "Enter") tryGate();
  });

  $("hintBtn").addEventListener("click", () => {
    $("gateHint").textContent = C.hints[hi++ % C.hints.length];
  });

  // Replay shortcut: only replay button can activate this
  try {
    if (sessionStorage.getItem("ok") === "1") {
      sessionStorage.removeItem("ok");
      start(true);
    }
  } catch (e) {}

  /* ---------- cartoons ---------- */

  document.querySelectorAll(".toons .toon").forEach(b => {
    b.addEventListener("click", () => {
      toast(C.toonReplies[b.dataset.i]);

      b.classList.add("hit");

      setTimeout(() => {
        b.classList.remove("hit");
      }, 600);
    });
  });

  /* ---------- balloons ---------- */

  let popped = 0;

  const cols = [
    "#ff6b9d", "#ffb347", "#6bcbff",
    "#9b7bff", "#5fd38d", "#ff8a65"
  ];

  $("balloons").innerHTML = C.reasons.map((r, i) => `
    <button class="bl"
      style="--c:${cols[i % 6]};animation-delay:-${i * 0.5}s"
      data-i="${i}" aria-label="Balloon ${i + 1}">
    </button>
  `).join("");

  $("balloons").addEventListener("click", e => {
    const b = e.target.closest(".bl");

    if (!b || b.classList.contains("pop")) return;

    b.classList.add("pop");
    popped++;

    burst(20);

    $("reasons").insertAdjacentHTML(
      "afterbegin",
      `<div class="glass rc">
        <small>REASON NO.${popped}</small><br>
        ${esc(C.reasons[b.dataset.i])}
      </div>`
    );

    if (popped >= C.reasons.length) {
      $("popNext").hidden = false;
    }
  });

  /* ---------- Yes / No dodging ---------- */

  $("pQ").textContent = C.pleadQuestion;
  $("pLine").textContent = C.pleadIntro;
  $("yesBtn").textContent = C.pleadYes;
  $("noBtn").textContent = C.pleadNoText;

  const yes = $("yesBtn");
  const no = $("noBtn");

  const faces = [
    "🥺", "😜", "🐢", "😂",
    "😈", "🤡", "🧸", "🙏"
  ];

  let pc = 0;
  let lastDodge = 0;

  function overlap(a, b) {
    return !(
      a.right < b.left - 12 ||
      a.left > b.right + 12 ||
      a.bottom < b.top - 12 ||
      a.top > b.bottom + 12
    );
  }

  function dodge(e) {
    if (e) e.preventDefault();

    const now = Date.now();
    if (now - lastDodge < 180) return;

    lastDodge = now;

    const w = innerWidth;
    const h = innerHeight;

    const r = no.getBoundingClientRect();
    const bw = r.width;
    const bh = r.height;

    if (!no.classList.contains("run")) {
      no.style.left = r.left + "px";
      no.style.top = r.top + "px";
      no.classList.add("run");
      void no.offsetWidth;
    }

    const yr = yes.getBoundingClientRect();

    let x, y, k = 0;

    do {
      x = 10 + Math.random() * Math.max(1, w - bw - 20);
      y = 70 + Math.random() * Math.max(1, h - bh - 90);
      k++;
    } while (
      k < 15 &&
      (
        Math.hypot(x - r.left, y - r.top) < 110 ||
        overlap({
          left: x,
          top: y,
          right: x + bw,
          bottom: y + bh
        }, yr)
      )
    );

    no.style.left = x + "px";
    no.style.top = y + "px";

    $("pLine").textContent =
      C.pleadLines[pc % C.pleadLines.length];

    $("pFace").textContent = faces[pc % faces.length];

    pc++;

    yes.style.transform =
      "scale(" + Math.min(1.5, 1 + pc * 0.06) + ")";
  }

  no.addEventListener("pointerenter", dodge);
  no.addEventListener("pointerdown", dodge);
  no.addEventListener("click", dodge);

  yes.addEventListener("click", () => {
    $("pFace").textContent = "🥳";
    $("pLine").textContent = C.pleadDone;

    burst(220);

    no.hidden = true;
    yes.hidden = true;

    $("pleadPics").innerHTML = C.pleadPhotos.map((p, i) => `
      <figure class="pol pc"
        style="--r:${(i % 2 ? 2 : -2) - i % 3}deg;
               animation-delay:${i * 0.25}s">
        <div class="ph">
          <img src="${MEDIA}photos/${esc(p.file)}"
               alt="${esc(p.caption)}">
          <span hidden>Add ${esc(p.file)}</span>
        </div>
        <p>${esc(p.caption)}</p>
      </figure>
    `).join("");

    document.querySelectorAll("#pleadPics .pol").forEach(p => {
      const im = p.querySelector("img");

      im.addEventListener("error", () => {
        im.hidden = true;
        p.querySelector("span").hidden = false;
      }, { once: true });
    });

    $("pleadNext").hidden = false;
  });

  /* ---------- wish tree ---------- */

  cn.addEventListener("click", e => {
    const b = e.target.closest(".hrt");

    if (!b) return;

    $("wishShow").textContent = C.wishes[b.dataset.i];

    b.classList.add("seen");

    burst(25);
  });

  /* ---------- letter ---------- */

  function openLetter() {
    $("paper").hidden = false;
    $("env").hidden = true;
    $("letterNext").hidden = false;
  }

  $("env").addEventListener("click", openLetter);

  $("env").addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openLetter();
    }
  });

  /* ---------- final wish + replay ---------- */

  $("wishBtn").addEventListener("click", () => {
    $("cake").classList.add("out");
    $("wishBtn").hidden = true;

    burst(260);

    setTimeout(() => burst(180), 500);

    $("finalText").textContent = C.finalMessage;
    $("finalMsg").hidden = false;
  });

  $("replayBtn").addEventListener("click", () => {
    try {
      sessionStorage.setItem("ok", "1");
    } catch (e) {}

    location.reload();
  });

  /* ---------- music ---------- */

  au.src = C.music;

  mb.addEventListener("click", () => {
    if (au.paused) {
      au.play()
        .then(() => mb.classList.add("on"))
        .catch(() => toast("Add a song at " + C.music + " 🎵"));
    } else {
      au.pause();
      mb.classList.remove("on");
    }
  });

})();
