const revealItems = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((item) => observer.observe(item));

document.querySelectorAll(".copy-button").forEach((button) => {
  button.addEventListener("click", async () => {
    const targetId = button.dataset.copyTarget;
    const target = document.getElementById(targetId);
    if (!target) {
      return;
    }

    try {
      await navigator.clipboard.writeText(target.innerText.trim());
      const previousText = button.innerText;
      button.innerText = "Copied";
      window.setTimeout(() => {
        button.innerText = previousText;
      }, 1400);
    } catch (error) {
      button.innerText = "Copy failed";
      window.setTimeout(() => {
        button.innerText = "Copy";
      }, 1400);
    }
  });
});
