/* =========================================================
   ESPACIO GAMER · General Lagos — Landing Page
   Lógica de interacción (vanilla JS, sin dependencias).
   - Menú móvil accesible
   - Sombra del header al hacer scroll
   - Revelado de secciones al hacer scroll (IntersectionObserver)
   - Acordeón de preguntas frecuentes (apertura única)
   - Validación visual del formulario de contacto
   - Año dinámico en el footer
   ========================================================= */
(function () {
  "use strict";

  /* ----------------------------------------------------------
     1. Menú móvil
     ---------------------------------------------------------- */
  const navToggle = document.getElementById("nav-toggle");
  const mainNav = document.getElementById("main-nav");

  function closeMenu() {
    if (!mainNav.classList.contains("open")) return;
    mainNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Abrir menú de navegación");
  }

  function openMenu() {
    mainNav.classList.add("open");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Cerrar menú de navegación");
  }

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      const isOpen = mainNav.classList.contains("open");
      isOpen ? closeMenu() : openMenu();
    });

    // Cerrar al hacer clic en un enlace o CTA del menú
    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    // Cerrar con la tecla Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });

    // Cerrar al hacer clic fuera del menú
    document.addEventListener("click", function (e) {
      if (
        mainNav.classList.contains("open") &&
        !mainNav.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        closeMenu();
      }
    });
  }

  /* ----------------------------------------------------------
     2. Sombra del header al hacer scroll
     ---------------------------------------------------------- */
  const header = document.querySelector(".site-header");

  function onScroll() {
    if (window.scrollY > 12) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  if (header) {
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ----------------------------------------------------------
     3. Revelado al hacer scroll
     ---------------------------------------------------------- */
  const revealEls = document.querySelectorAll("[data-reveal]");
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    // Mostrar todo sin animación
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    const observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ----------------------------------------------------------
     4. Acordeón FAQ — abrir solo uno a la vez
     ---------------------------------------------------------- */
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (!item.open) return;
      faqItems.forEach(function (other) {
        if (other !== item) other.open = false;
      });
    });
  });

  /* ----------------------------------------------------------
     5. Validación del formulario de contacto
     ---------------------------------------------------------- */
  const form = document.getElementById("contact-form");
  const successBox = document.getElementById("form-success");

  // Mensajes de error por campo
  const messages = {
    adulto: "Ingresá el nombre del adulto responsable.",
    alumno: "Ingresá el nombre del alumno/a.",
    edad: "Indicá una edad entre 4 y 18 años.",
    telefono: "Ingresá un teléfono de contacto.",
    email: "Ingresá un email válido.",
  };

  function validateField(field) {
    const group = field.closest(".form-group");
    const errorEl = group ? group.querySelector(".form-error") : null;
    let valid = field.checkValidity();

    // Validación extra para edad (rango)
    if (field.id === "edad" && field.value !== "") {
      const n = Number(field.value);
      if (n < 4 || n > 18) valid = false;
    }

    if (group) group.classList.toggle("invalid", !valid);
    if (errorEl) errorEl.textContent = valid ? "" : messages[field.id] || "Revisá este campo.";
    return valid;
  }

  if (form) {
    const fields = Array.from(
      form.querySelectorAll("input[required], textarea[required]")
    );

    // Validar en tiempo real una vez que el campo perdió el foco
    fields.forEach(function (field) {
      field.addEventListener("blur", function () {
        validateField(field);
      });
      field.addEventListener("input", function () {
        if (field.closest(".form-group").classList.contains("invalid")) {
          validateField(field);
        }
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      let allValid = true;
      let firstInvalid = null;

      fields.forEach(function (field) {
        const ok = validateField(field);
        if (!ok && !firstInvalid) firstInvalid = field;
        if (!ok) allValid = false;
      });

      if (!allValid) {
        if (successBox) successBox.hidden = true;
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Sin backend: mostramos confirmación visual y reseteamos
      if (successBox) {
        successBox.hidden = false;
        successBox.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      form.reset();
      form.querySelectorAll(".form-group.invalid").forEach(function (g) {
        g.classList.remove("invalid");
      });

      // Ocultar el mensaje luego de unos segundos
      window.setTimeout(function () {
        if (successBox) successBox.hidden = true;
      }, 8000);
    });
  }

  /* ----------------------------------------------------------
     6. Año dinámico en el footer
     ---------------------------------------------------------- */
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
