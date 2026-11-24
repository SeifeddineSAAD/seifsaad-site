/* ==========================================================
   seifsaad.com — interactions, i18n, animations
   ========================================================== */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const page = document.body.dataset.page;

  /* ---------- Language ---------- */
  const store = {
    get: () => { try { return localStorage.getItem("lang"); } catch (e) { return null; } },
    set: (v) => { try { localStorage.setItem("lang", v); } catch (e) {} }
  };
  let lang = store.get() || ((navigator.language || "fr").toLowerCase().startsWith("fr") ? "fr" : (navigator.language || "").toLowerCase().startsWith("ar") ? "fr" : "en");

  // Capture the French source text once
  $$("[data-i18n]").forEach(el => { el.dataset.fr = el.innerHTML; });

  function t(key) { return lang === "en" && EN[key] ? EN[key] : null; }

  function applyLang(l, first) {
    lang = l;
    document.documentElement.lang = l;
    $$("[data-i18n]").forEach(el => {
      const v = t(el.dataset.i18n);
      el.innerHTML = v != null ? v : el.dataset.fr;
    });
    $$(".split").forEach(splitWords);
    $$(".lang button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.lang === l)));
    renderDynamic();
    if (!first) {
      $$(".split, .mark").forEach(el => el.classList.add("in"));
      $$("[data-i18n]").forEach(el => { if (el.closest("[data-reveal].in")) el.querySelectorAll(".mark").forEach(m => m.classList.add("in")); });
      runTerminal();
    }
    observeAll();
  }

  /* ---------- Word split for headline reveal ---------- */
  function splitWords(el) {
    let i = 0;
    const out = document.createDocumentFragment();
    const wrap = (word, tag) => {
      const w = document.createElement("span"); w.className = "w";
      const s = document.createElement("span"); s.style.setProperty("--i", i++);
      if (tag) { const e = document.createElement(tag); e.textContent = word; s.appendChild(e); } else s.textContent = word;
      w.appendChild(s); return w;
    };
    [...el.childNodes].forEach(n => {
      const tag = n.nodeType === 1 ? n.tagName.toLowerCase() : null;
      const words = (n.textContent || "").split(/(\s+)/);
      words.forEach(part => {
        if (!part) return;
        if (/^\s+$/.test(part)) out.appendChild(document.createTextNode(" "));
        else out.appendChild(wrap(part, tag));
      });
    });
    el.innerHTML = ""; el.appendChild(out);
  }

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      el.classList.add("in");
      el.querySelectorAll(".mark").forEach(m => m.classList.add("in"));
      if (el.dataset.count != null) countUp(el);
      el.querySelectorAll("[data-count]").forEach(countUp);
      io.unobserve(el);
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });

  function observeAll() {
    $$("[data-reveal]:not(.in), .split:not(.in), [data-count]:not(.done)").forEach(el => io.observe(el));
  }

  function countUp(el) {
    if (el.classList.contains("done")) return;
    el.classList.add("done");
    const end = +el.dataset.count;
    if (reduce) { el.textContent = end; return; }
    const dur = 1400, t0 = performance.now();
    const step = now => {
      const p = Math.min(1, (now - t0) / dur);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 4)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /* ---------- Terminal typing ---------- */
  let termRun = 0;
  function runTerminal() {
    const box = $("#term"); if (!box) return;
    const run = ++termRun;
    const lines = TERM[lang];
    box.innerHTML = "";
    if (reduce) {
      box.innerHTML = lines.map(l => l.map(([c, s]) => `<span class="${c}">${esc(s)}</span>`).join("")).join("\n") + '<span class="caret"></span>';
      return;
    }
    let li = 0, si = 0, ci = 0, span = null;
    const caret = document.createElement("span"); caret.className = "caret";
    box.appendChild(caret);
    const tick = () => {
      if (run !== termRun) return;
      if (li >= lines.length) return;
      const seg = lines[li][si];
      if (!span) { span = document.createElement("span"); span.className = seg[0]; box.insertBefore(span, caret); }
      const fast = li > 0;
      const chunk = fast ? 2 : 1;
      span.textContent += seg[1].slice(ci, ci + chunk); ci += chunk;
      if (ci >= seg[1].length) {
        si++; ci = 0; span = null;
        if (si >= lines[li].length) {
          si = 0; li++;
          if (li < lines.length) box.insertBefore(document.createTextNode("\n"), caret);
          return setTimeout(tick, li === 1 ? 420 : li === lines.length - 1 ? 380 : 90);
        }
      }
      setTimeout(tick, fast ? 14 : 38 + Math.random() * 40);
    };
    setTimeout(tick, 900);
  }
  const esc = s => s.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ---------- Products ---------- */
  const K = () => KIND_TEXT[lang];
  const money = n => lang === "fr" ? `${n} €` : `€${n}`;

  function bookHTML(p) {
    const k = K();
    const info = CERT_INFO[p.cert];
    const cover = p.cover || info.cover;
    const foot = info ? info.foot : "AWS · TF";
    return `<div class="book ${p.cert}" aria-hidden="true"><div class="b-in">
      <div class="b-brand"><span>Exam Eve</span><span>${p.kind === "full" ? "3 certs" : p.kind === "cloudai" ? "2 certs" : info.code}</span></div>
      <div class="b-code">${cover}</div>
      <div class="b-kind">${k.short[p.kind]}</div>
      <div class="b-foot"><span>${foot}</span><span class="b-flag">FR+EN</span></div>
    </div></div>`;
  }

  function productTitle(p) {
    const k = K();
    if (p.cert === "multi") return `${k.label[p.kind]} · ${k.multiName[p.kind]}`;
    const c = CERT_INFO[p.cert];
    return `${c.name} ${c.code} · ${k.label[p.kind]}`;
  }

  function cardHTML(p, i) {
    const k = K();
    const c = CERT_INFO[p.cert] || {};
    const pct = p.was ? Math.round((1 - p.price / p.was) * 100) : 0;
    const badge = p.hot ? `<span class="badge hot mono">${lang === "fr" ? "★ Meilleure offre" : "★ Best deal"}</span>`
      : p.was ? `<span class="badge mono">${k.save(pct)}</span>` : "";
    return `<article class="p-card" data-cert="${p.cert}" data-pack="${p.was ? 1 : 0}" data-reveal style="--d:${(i % 3) * 80}ms">
      <div class="p-stage">${badge}${bookHTML(p)}</div>
      <div class="p-body">
        <span class="mono">${p.cert === "multi" ? (lang === "fr" ? "Pack multi-certifications" : "Multi-cert bundle") : c.name + " · " + c.code}</span>
        <h3>${productTitle(p)}</h3>
        <p class="use">${k.use[p.kind]}</p>
        <ul>${k.bullets(p, c).map(b => `<li>${b}</li>`).join("")}</ul>
        <div class="p-foot">
          <div class="p-price"><b>${money(p.price)}</b>${p.was ? `<s>${money(p.was)}</s>` : ""}</div>
          <a class="btn btn-sm buy" data-mag href="${p.url}" target="_blank" rel="noopener">${k.buy} <span class="arr">→</span></a>
        </div>
      </div>
    </article>`;
  }

  let filter = "all";
  function renderShop() {
    const grid = $("#grid"); if (!grid) return;
    grid.innerHTML = PRODUCTS.map(cardHTML).join("");
    const k = K();
    const opts = [
      ["all", k.all, PRODUCTS.length],
      ["clf", "AWS CLF-C02", PRODUCTS.filter(p => p.cert === "clf").length],
      ["aif", "AWS AIF-C01", PRODUCTS.filter(p => p.cert === "aif").length],
      ["tf", "Terraform 004", PRODUCTS.filter(p => p.cert === "tf").length],
      ["packs", k.packs, PRODUCTS.filter(p => p.was).length]
    ];
    $("#filters").innerHTML = opts.map(([v, l, n]) => `<button class="chip" type="button" data-f="${v}" aria-pressed="${v === filter}">${l}<i>${n}</i></button>`).join("");
    applyFilter(false);
    bindTilt();

    // Compare table
    const C = COMPARE[lang];
    $("#compare").innerHTML = `<thead><tr>${C.head.map(h => `<th>${h}</th>`).join("")}</tr></thead><tbody>${C.rows.map(r => `
      <tr class="${r[7] ? "best" : ""}"><td>${r[0]}</td><td>${r[1]}</td><td class="num">${r[2]}</td><td>${r[3] === "—" ? "—" : `<s>${r[3]}</s>`}</td><td class="gain">${r[4]}</td>
      <td><a class="btn btn-sm ${r[7] ? "" : "btn-ghost"}" href="${r[5]}" ${r[5].startsWith("http") ? 'target="_blank" rel="noopener"' : ""}>${r[6]}</a></td></tr>`).join("")}</tbody>`;

    // FAQ
    $("#faqList").innerHTML = FAQ[lang].map(([q, a], i) => `<details ${i === 0 ? "open" : ""}><summary>${q}<span class="pm"></span></summary><p class="ans">${a}</p></details>`).join("");

    // Shelves
    const packs = ["clf-pack", "pack-integral", "terraform-pack"].map(id => PRODUCTS.find(p => p.id === id));
    $("#featShelf").innerHTML = packs.map((p, i) => bookHTML(p).replace('class="book', `style="--k:${i}" class="book`)).join("");
    const trio = ["clf-pack", "aif-pack", "terraform-pack"].map(id => PRODUCTS.find(p => p.id === id));
    $("#heroShelf").innerHTML = trio.map((p, i) => bookHTML(p).replace('class="book', `style="--k:${i}" class="book`)).join("");
  }

  function applyFilter(animate) {
    $$(".chip").forEach(c => c.setAttribute("aria-pressed", String(c.dataset.f === filter)));
    $$(".p-card").forEach(card => {
      const show = filter === "all" || (filter === "packs" ? card.dataset.pack === "1" : card.dataset.cert === filter);
      card.classList.toggle("hidden", !show);
      if (show && animate) { card.classList.remove("in"); requestAnimationFrame(() => requestAnimationFrame(() => card.classList.add("in"))); }
    });
  }

  document.addEventListener("click", e => {
    const chip = e.target.closest(".chip");
    if (chip) { filter = chip.dataset.f; applyFilter(true); }
  });

  function renderHome() {
    const certs = $("#certs");
    if (certs) {
      certs.innerHTML = CERTS.map((c, i) => `<div class="cert" data-reveal style="--d:${(i % 3) * 70}ms">
        <div class="issuer mono"><span>${c.issuer}</span><span>${String(i + 1).padStart(2, "0")}</span></div>
        <div><h4>${c.name}</h4><span class="code">${c.code}</span></div></div>`).join("");
    }
    const list = $("#bandList");
    if (list) {
      const ids = ["pack-integral", "pack-cloud-ia", "clf-pack", "aif-pack", "terraform-pack"];
      list.innerHTML = ids.map(id => PRODUCTS.find(p => p.id === id)).map(p =>
        `<li><span>${productTitle(p)}</span><span>${p.was ? `<s>${money(p.was)}</s>` : ""}${money(p.price)}</span></li>`).join("");
      const trio = ["clf-pack", "pack-integral", "aif-pack"].map(id => PRODUCTS.find(p => p.id === id));
      $("#bandShelf").innerHTML = trio.map((p, i) => bookHTML(p).replace('class="book', `style="--k:${i}" class="book`)).join("");
    }
    // Contact
    const em = $("#cEmail"), ph = $("#cPhone");
    if (em) { em.href = "mailto:" + CONTACT.email; em.querySelector("b").textContent = CONTACT.email; }
    if (ph) { ph.href = "tel:" + CONTACT.phone.replace(/[^\d+]/g, ""); ph.querySelector("b").textContent = CONTACT.phone; }
  }

  function renderDynamic() {
    if (page === "shop") renderShop(); else renderHome();
  }

  /* ---------- Book tilt ---------- */
  function bindTilt() {
    if (reduce || matchMedia("(hover: none)").matches) return;
    $$(".p-stage").forEach(st => {
      const b = $(".book", st);
      st.addEventListener("pointermove", e => {
        const r = st.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        b.style.transform = `rotateY(${x * 34 - 6}deg) rotateX(${-y * 18}deg) translateY(-8px) scale(1.04)`;
      });
      st.addEventListener("pointerleave", () => { b.style.transform = ""; });
    });
  }

  /* ---------- Nav ---------- */
  const nav = $(".nav");
  let lastY = scrollY;
  addEventListener("scroll", () => {
    const y = scrollY;
    nav.classList.toggle("scrolled", y > 20);
    if (!nav.classList.contains("open")) nav.classList.toggle("hide", y > 500 && y > lastY + 2);
    if (y < lastY - 2) nav.classList.remove("hide");
    lastY = y;
  }, { passive: true });
  $(".burger").addEventListener("click", () => nav.classList.toggle("open"));
  $$(".nav-links a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
  $$(".lang button").forEach(b => b.addEventListener("click", () => { if (b.dataset.lang !== lang) { store.set(b.dataset.lang); applyLang(b.dataset.lang); } }));

  /* ---------- Page transition ---------- */
  document.addEventListener("click", e => {
    const a = e.target.closest("a[href]");
    if (!a || a.target === "_blank" || e.metaKey || e.ctrlKey || reduce) return;
    const href = a.getAttribute("href");
    if (!/\.html(#.*)?$/.test(href)) return;
    const url = new URL(href, location.href);
    if (url.pathname === location.pathname) return;
    e.preventDefault();
    $(".veil").classList.add("leaving");
    setTimeout(() => { location.href = url.href; }, 420);
  });
  addEventListener("pageshow", e => { if (e.persisted) $(".veil").classList.remove("leaving"); });

  /* ---------- Magnetic buttons + cursor ---------- */
  if (!reduce && matchMedia("(hover: hover)").matches) {
    document.addEventListener("pointermove", e => {
      const m = e.target.closest("[data-mag]");
      $$("[data-mag].magged").forEach(x => { if (x !== m) { x.style.transform = ""; x.classList.remove("magged"); } });
      if (m) {
        const r = m.getBoundingClientRect();
        m.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .18}px, ${(e.clientY - r.top - r.height / 2) * .28}px)`;
        m.classList.add("magged");
      }
    });
    const cur = $(".cursor");
    let cx = 0, cy = 0, tx = 0, ty = 0;
    document.addEventListener("pointermove", e => {
      tx = e.clientX; ty = e.clientY; cur.classList.add("on");
      cur.classList.toggle("big", !!e.target.closest("a, button, .p-stage, summary"));
    });
    document.addEventListener("pointerleave", () => cur.classList.remove("on"));
    const loop = () => { cx += (tx - cx) * .22; cy += (ty - cy) * .22; cur.style.transform = `translate(${cx}px, ${cy}px)`; requestAnimationFrame(loop); };
    loop();
  }

  /* ---------- Init ---------- */
  const yr = $("#year"); if (yr) yr.textContent = new Date().getFullYear();
  applyLang(lang, true);
  runTerminal();
})();
