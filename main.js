const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
const header = document.querySelector(".site-header");

const revealTargets = document.querySelectorAll(
  ".section, .feature-grid article, .product-card, .catalog article, .gallery figure, .process article, .testimonial, .cta-band, .page-hero, .contact-layout > *, .product-showcase article, .stats-band article, .feedback-section"
);

revealTargets.forEach((target) => target.classList.add("reveal"));

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealTargets.forEach((target) => revealObserver.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add("visible"));
}

const updateHeader = () => {
  if (header) {
    header.classList.toggle("scrolled", window.scrollY > 12);
  }
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
}

document.querySelectorAll("[data-lead-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    const note = form.querySelector("[data-form-note]");
    if (note) {
      note.textContent = "Sending your appointment request...";
      note.classList.add("success");
    }
  });
});

document.querySelectorAll("[data-feedback-form]").forEach((form) => {
  let selectedRating = 5;
  const stars = Array.from(form.querySelectorAll(".star"));
  const note = form.querySelector("[data-feedback-note]");
  const ratingInput = form.querySelector("[data-rating-input]");

  const paintStars = (rating) => {
    stars.forEach((star) => {
      const value = Number(star.dataset.rating);
      star.classList.toggle("active", value <= rating);
    });
    if (ratingInput) {
      ratingInput.value = String(rating);
    }
  };

  stars.forEach((star) => {
    star.addEventListener("click", () => {
      selectedRating = Number(star.dataset.rating);
      paintStars(selectedRating);
    });

    star.addEventListener("mouseenter", () => {
      paintStars(Number(star.dataset.rating));
    });
  });

  form.querySelector(".star-rating")?.addEventListener("mouseleave", () => {
    paintStars(selectedRating);
  });

  form.addEventListener("submit", (event) => {
    paintStars(selectedRating);
    if (note) {
      note.textContent = `Sending your ${selectedRating}-star feedback...`;
      note.classList.add("success");
    }
  });
});

