(function () {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let interactionsReady = false;

  function canAnimate() {
    return !reducedMotion && typeof window.anime === 'function';
  }

  function staggerTargets(selector) {
    return Array.from(document.querySelectorAll(selector)).filter((el) => {
      return el.offsetParent !== null || getComputedStyle(el).position === 'fixed';
    });
  }

  function animateHeader() {
    const headerItems = document.querySelectorAll('.page-title, .page-subtitle');

    if (!headerItems.length) {
      return;
    }

    window.anime({
      targets: headerItems,
      opacity: [0, 1],
      translateY: [18, 0],
      easing: 'easeOutCubic',
      duration: 620,
      delay: window.anime.stagger(85)
    });
  }

  function animateGlassItems() {
    const targets = staggerTargets('.card, .file-item, .movie-card, .file-list, .player-wrapper');

    if (!targets.length) {
      return;
    }

    window.anime({
      targets,
      translateY: [10, 0],
      easing: 'easeOutCubic',
      duration: 520,
      delay: window.anime.stagger(36, { start: 40 })
    });
  }

  function animateOrbs() {
    const orbs = document.querySelectorAll('.bg-orb');

    if (!orbs.length) {
      return;
    }

    window.anime({
      targets: orbs,
      opacity: [0, 1],
      easing: 'easeOutSine',
      duration: 900,
      delay: window.anime.stagger(120)
    });
  }

  function initGlassInteractions() {
    if (interactionsReady) {
      return;
    }

    interactionsReady = true;

    document.addEventListener('pointerenter', (event) => {
      const target = event.target.closest('.card, .file-item, .movie-card, .download-link, .card-button, .back-btn');

      if (!target || !canAnimate()) {
        return;
      }

      window.anime.remove(target);
      window.anime({
        targets: target,
        translateY: target.matches('.card, .file-item, .movie-card') ? -4 : -2,
        scale: target.matches('.download-link, .card-button, .back-btn') ? 1.025 : 1,
        easing: 'easeOutQuad',
        duration: 220
      });
    }, true);

    document.addEventListener('pointerleave', (event) => {
      const target = event.target.closest('.card, .file-item, .movie-card, .download-link, .card-button, .back-btn');

      if (!target || !canAnimate()) {
        return;
      }

      window.anime.remove(target);
      window.anime({
        targets: target,
        translateY: 0,
        scale: 1,
        easing: 'easeOutQuad',
        duration: 260
      });
    }, true);
  }

  window.runGlassAnimations = function () {
    if (!canAnimate()) {
      return;
    }

    requestAnimationFrame(() => {
      animateOrbs();
      animateHeader();
      animateGlassItems();
      initGlassInteractions();
    });
  };
})();
