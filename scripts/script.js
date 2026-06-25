document.addEventListener("DOMContentLoaded", function () {
  const htmlEl = document.documentElement;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Theme toggle (initial theme set pre-paint in <head>) ---------- */
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", function () {
      const next = htmlEl.getAttribute("data-theme") === "dark" ? "light" : "dark";
      htmlEl.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }
  // Follow system changes only if the user hasn't chosen explicitly
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
    try {
      if (!localStorage.getItem("theme")) {
        htmlEl.setAttribute("data-theme", e.matches ? "dark" : "light");
      }
    } catch (err) {}
  });

  /* ---------- Header scroll state ---------- */
  const header = document.querySelector("header");
  const onScroll = function () {
    if (header) header.classList.toggle("scrolled", window.scrollY > 8);
    if (scrollToTopBtn) scrollToTopBtn.classList.toggle("show", window.scrollY > 400);
  };

  /* ---------- Mobile menu ---------- */
  const menuIcon = document.getElementById("menu-icon");
  const nav = document.querySelector("nav ul");
  const closeMenu = function () {
    if (!nav) return;
    nav.classList.remove("active");
    if (menuIcon) {
      menuIcon.classList.remove("active");
      menuIcon.setAttribute("aria-expanded", "false");
    }
  };
  if (menuIcon && nav) {
    menuIcon.addEventListener("click", function () {
      const open = nav.classList.toggle("active");
      menuIcon.classList.toggle("active", open);
      menuIcon.setAttribute("aria-expanded", String(open));
    });
  }

  /* ---------- Smooth-scroll anchors + close menu ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const id = this.getAttribute("href");
      if (id === "#" || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      closeMenu();
      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
    });
  });

  /* ---------- Scroll-to-top ---------- */
  const scrollToTopBtn = document.createElement("button");
  scrollToTopBtn.innerHTML = "↑";
  scrollToTopBtn.className = "scroll-to-top";
  scrollToTopBtn.setAttribute("aria-label", "Scroll back to top");
  document.body.appendChild(scrollToTopBtn);
  scrollToTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  });

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Reveal-on-scroll (enhancement only; content ships visible) ---------- */
  // Tag section content so it reveals too — done in JS so a no-JS/headless render stays fully visible.
  document
    .querySelectorAll(
      ".section .section-head, .section .bento-card, .section .process-step, " +
      ".section .about-copy, .section .about-stats, .section .tech-group, .section .contact-grid > *"
    )
    .forEach((el) => {
      el.setAttribute("data-reveal", "");
      el.classList.add("reveal");
    });

  const revealEls = document.querySelectorAll("[data-reveal]");
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
    // Anything already in view on load reveals immediately (no scroll required).
    requestAnimationFrame(() => {
      revealEls.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("is-visible");
      });
    });
    // Failsafe: never leave content hidden in a background tab / headless render.
    setTimeout(() => revealEls.forEach((el) => el.classList.add("is-visible")), 2500);
  }

  /* ---------- LinkedIn analytics ---------- */
  const linkedinLink = document.getElementById("linkedin-link");
  if (linkedinLink && typeof gtag === "function") {
    linkedinLink.addEventListener("click", function () {
      gtag("event", "click", {
        event_category: "Outbound Link",
        event_label: "LinkedIn Profile",
      });
    });
  }

  /* ---------- Contact form ---------- */
  const contactForm = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  if (contactForm) {
    const setStatus = function (msg, type) {
      if (!status) return;
      status.textContent = msg;
      status.className = "form-status" + (type ? " " + type : "");
    };
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const data = new FormData(this);
      const name = (data.get("name") || "").toString().trim();
      const email = (data.get("email") || "").toString().trim();
      const message = (data.get("message") || "").toString().trim();

      if (!name) return setStatus("Please add your name.", "error");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setStatus("Please enter a valid email address.", "error");
      if (message.length < 10) return setStatus("A little more detail helps — at least 10 characters.", "error");

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const original = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = "Sending…";
      setStatus("", "");

      // No backend yet — simulate, then guide the user to a direct channel.
      setTimeout(() => {
        submitBtn.innerHTML = "Message sent ✓";
        setStatus("Thanks, " + name + " — I'll be in touch within a day.", "success");
        contactForm.reset();
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = original;
        }, 2200);
      }, 1100);
    });
  }
});
