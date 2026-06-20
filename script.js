// stressweg – interactions

(function () {
  "use strict";

  const nav = document.getElementById("nav");
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");

  function setMenu(open) {
    nav.classList.toggle("is-open", open);
    toggle.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
  }

  if (toggle) {
    toggle.addEventListener("click", () =>
      setMenu(!nav.classList.contains("is-open"))
    );
  }

  if (menu) {
    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenu(false));
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMenu(false);
  });

  let ticking = false;
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        nav.classList.toggle("is-scrolled", window.scrollY > 8);
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const reveals = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const delay = Math.min(i * 60, 180);
          entry.target.style.transitionDelay = delay + "ms";
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  // ==========================================
  // Floating Buttons (SAFE + inside DOM scope)
  // ==========================================

  const floatingContact = document.querySelector(".floating-contact");

  if (floatingContact) {
    const toggleFloatingButtons = () => {
      const show = window.scrollY > 400;

      floatingContact.classList.toggle("floating-visible", show);
      floatingContact.classList.toggle("floating-hidden", !show);
    };

    window.addEventListener("scroll", toggleFloatingButtons, {
      passive: true,
    });

    toggleFloatingButtons();
  }
})();
