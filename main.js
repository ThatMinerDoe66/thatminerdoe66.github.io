/**
 * Scroll-triggered fade-in for sections.
 * Adds the `.visible` class when a card enters the viewport.
 * CSS handles the actual transition via animation-play-state.
 */
document.addEventListener('DOMContentLoaded', () => {

  /* ── Intersection Observer: reveal cards on scroll ── */
  const cards = document.querySelectorAll('.card');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // fire once only
        }
      });
    },
    { threshold: 0.12 }
  );

  cards.forEach((card) => observer.observe(card));


  /* ── Tag hover: ripple effect ── */
  document.querySelectorAll('.tag').forEach((tag) => {
    tag.addEventListener('click', (e) => {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');

      const rect = tag.getBoundingClientRect();
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        animation: ripple-anim 0.45s linear;
        background: rgba(255,255,255,0.25);
        width: 80px; height: 80px;
        left: ${e.clientX - rect.left - 40}px;
        top:  ${e.clientY - rect.top  - 40}px;
        pointer-events: none;
      `;

      tag.style.position = 'relative';
      tag.style.overflow = 'hidden';
      tag.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });


  /* ── Project cards: subtle parallax on mouse move ── */
  document.querySelectorAll('.project-item').forEach((item) => {
    item.addEventListener('mousemove', (e) => {
      const rect  = item.getBoundingClientRect();
      const x     = (e.clientX - rect.left) / rect.width  - 0.5;
      const y     = (e.clientY - rect.top)  / rect.height - 0.5;
      item.style.transform = `perspective(600px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) translateY(-3px)`;
    });
    item.addEventListener('mouseleave', () => {
      item.style.transform = '';
    });
  });

});


/* ── Inject ripple keyframe into <head> once ── */
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes ripple-anim {
    to { transform: scale(2.5); opacity: 0; }
  }
`;
document.head.appendChild(rippleStyle);