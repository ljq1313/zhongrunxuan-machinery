(function () {
  // year
  const y = document.getElementById("y");
  if (y) y.textContent = String(new Date().getFullYear());

  // mobile nav
  const toggle = document.querySelector("[data-nav-toggle]");
  const mnav = document.querySelector("[data-mnav]");
  if (toggle && mnav) {
    toggle.addEventListener("click", () => {
      const isOpen = mnav.style.display === "block";
      mnav.style.display = isOpen ? "none" : "block";
    });
  }

  // slider
  const slider = document.querySelector("[data-slider]");
  if (!slider) return;

  const slides = Array.from(slider.querySelectorAll(".slide"));
  const btnPrev = slider.querySelector("[data-prev]");
  const btnNext = slider.querySelector("[data-next]");
  const dotsWrap = slider.querySelector("[data-dots]");

  let idx = Math.max(0, slides.findIndex(s => s.classList.contains("is-active")));
  if (idx === -1) idx = 0;

  function setActive(i) {
    idx = (i + slides.length) % slides.length;
    slides.forEach((s, k) => s.classList.toggle("is-active", k === idx));
    if (dotsWrap) {
      Array.from(dotsWrap.children).forEach((d, k) => d.classList.toggle("active", k === idx));
    }
  }

  // dots
  if (dotsWrap) {
    dotsWrap.innerHTML = "";
    slides.forEach((_, i) => {
      const d = document.createElement("button");
      d.className = "dot" + (i === idx ? " active" : "");
      d.type = "button";
      d.setAttribute("aria-label", `Go to slide ${i + 1}`);
      d.addEventListener("click", () => {
        setActive(i);
        restart();
      });
      dotsWrap.appendChild(d);
    });
  }

  if (btnPrev) btnPrev.addEventListener("click", () => { setActive(idx - 1); restart(); });
  if (btnNext) btnNext.addEventListener("click", () => { setActive(idx + 1); restart(); });

  // auto play
  let timer = null;
  function start() {
    timer = window.setInterval(() => setActive(idx + 1), 6000);
  }
  function stop() {
    if (timer) window.clearInterval(timer);
    timer = null;
  }
  function restart() {
    stop();
    start();
  }

  slider.addEventListener("mouseenter", stop);
  slider.addEventListener("mouseleave", start);
  start();
})();
