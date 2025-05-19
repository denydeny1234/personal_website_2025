const customCursor = document.querySelector('.custom-cursor');
const cursorText = customCursor.querySelector('span');

// Show and move the cursor
document.addEventListener('mousemove', (e) => {
  customCursor.classList.add('visible');

  // Move with the mouse
  gsap.to(customCursor, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.2,
    ease: 'power2.out'
  });

  // Detect if element under cursor is clickable
  const element = document.elementFromPoint(e.clientX, e.clientY);
  const isClickable =
    element?.tagName === 'A' ||
    element?.tagName === 'BUTTON' ||
    element?.onclick ||
    getComputedStyle(element).cursor === 'pointer';

  // Update text
  cursorText.textContent = isClickable ? 'Click' : 'Scroll';
});

// Optional: hide on mouse leave
document.addEventListener('mouseleave', () => {
  customCursor.classList.remove('visible');
});
