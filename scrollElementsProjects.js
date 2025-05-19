
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  smooth: 1.5, 
  effects: true
});



gsap.registerPlugin(ScrollTrigger);

// Fade in each ".fade-block" element
gsap.utils.toArray(".fade-block").forEach(el => {
  gsap.from(el, {
    scrollTrigger: {
      trigger: el,
      start: "top 85%", // when it enters viewport
      toggleActions: "play none none none"
    },
    opacity: 0,
    y: 50,
    duration: 2,
    delay: 0.5,
    ease: "power2.out"
  });
});

// Animate line by line inside ".fade-lines" blocks
document.querySelectorAll('.fade-lines p').forEach(paragraph => {
  const lines = paragraph.innerText.split('. ');
  paragraph.innerHTML = lines.map(line => `<span class="line">${line.trim()}.</span>`).join('<br>');
});

gsap.utils.toArray(".line").forEach((line, i) => {
  gsap.from(line, {
    scrollTrigger: {
      trigger: line,
      start: "top 95%",
    },
    opacity: 0,
    y: 20,
    duration: 2,
    delay: i * 0.08,
    ease: "power1.out"
  });
});
