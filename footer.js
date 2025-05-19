gsap.registerPlugin(ScrollTrigger);

// When footer comes into view
ScrollTrigger.create({
  trigger: ".footer-trigger",
  start: "top bottom", // when .footer-trigger hits bottom of viewport
  onEnter: () => {
    document.body.classList.add("footer-visible");
    document.querySelector(".footer-contact").classList.add("visible");
  },
  onLeaveBack: () => {
    document.body.classList.remove("footer-visible");
    document.querySelector(".footer-contact").classList.remove("visible");
  }
});


