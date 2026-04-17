// Typing Effect
const words = ["AI Developer", "Full Stack Developer", "ML Enthusiast"];
let i = 0;
let j = 0;
let currentWord = "";
let isDeleting = false;

function type() {
  currentWord = words[i];
  const typingEl = document.getElementById("typing");
  if (!typingEl) return;

  if (!isDeleting) {
    typingEl.textContent = currentWord.slice(0, j++);
    if (j > currentWord.length + 2) isDeleting = true;
  } else {
    typingEl.textContent = currentWord.slice(0, j--);
    if (j === 0) {
      isDeleting = false;
      i = (i + 1) % words.length;
    }
  }
  setTimeout(type, 120);
}

type();

// Fade Animation
const faders = document.querySelectorAll(".fade");
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  faders.forEach((el) => observer.observe(el));
} else {
  // Fallback for older browsers.
  faders.forEach((el) => el.classList.add("show"));
}

// Active Navigation Highlight
function setActiveLink() {
  let currentSectionId = "home";
  const scrollPosition = window.scrollY + 140;

  sections.forEach((section) => {
    if (scrollPosition >= section.offsetTop) {
      currentSectionId = section.id;
    }
  });

  navAnchors.forEach((anchor) => {
    const isActive = anchor.getAttribute("href") === `#${currentSectionId}`;
    anchor.classList.toggle("active", isActive);
  });
}

setActiveLink();
window.addEventListener("scroll", setActiveLink);

// Mobile Navigation
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Theme Toggle
const themeToggle = document.getElementById("theme-toggle");
const storedTheme = localStorage.getItem("theme");
const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
const initialTheme = storedTheme || (prefersLight ? "light" : "dark");

document.body.setAttribute("data-theme", initialTheme);

if (themeToggle) {
  themeToggle.textContent = initialTheme === "light" ? "Dark" : "Light";

  themeToggle.addEventListener("click", () => {
    const nextTheme = document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
    document.body.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
    themeToggle.textContent = nextTheme === "light" ? "Dark" : "Light";
  });
}

// Contact Form Validation
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name")?.value.trim() || "";
    const email = document.getElementById("email")?.value.trim() || "";
    const message = document.getElementById("message")?.value.trim() || "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    formStatus.classList.remove("success", "error");

    if (!name || !email || !message) {
      formStatus.textContent = "Please fill in all fields.";
      formStatus.classList.add("error");
      return;
    }

    if (!emailRegex.test(email)) {
      formStatus.textContent = "Please enter a valid email address.";
      formStatus.classList.add("error");
      return;
    }

    formStatus.textContent = "Message validated successfully. Connect Formspree to receive emails.";
    formStatus.classList.add("success");
    contactForm.reset();
  });
}
