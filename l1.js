document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".iframe-section");

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const section = entry.target;

      if (section.dataset.loaded) {
        observer.unobserve(section);
        return;
      }

      const iframe = document.createElement("iframe");
      iframe.src = section.dataset.src;
      iframe.loading = "lazy";

      iframe.onload = () => {
        section.classList.add("loaded");
        section.dataset.loaded = "true";
      };

      section.classList.add("loading");
      section.appendChild(iframe);

      observer.unobserve(section);
    });
  }, options);

  sections.forEach(section => observer.observe(section));
});