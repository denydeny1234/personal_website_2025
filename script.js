document.addEventListener("DOMContentLoaded", () => {


  const windowWidth = window.innerWidth;
  const wrapperWidth = 180;
  const finalPosition = windowWidth - wrapperWidth;
  const stepDistance = finalPosition / 6;
  const tl = gsap.timeline();
    
  tl.to(".count", {
    x: -900,
    duration: 0.85,
    delay: 0.5,
    ease: "power4.inOut",
  });

  for (let i = 1; i <= 6; i++) {
    const xPosition = -900 + i * 180;
    tl.to(".count", {
      x: xPosition,
      duration: 0.85,
      ease: "power4.inOut",
      onStart: () => {
        gsap.to(".count-wrapper", {
          x: stepDistance * i,
          duration: 0.85,
          ease: "power4.inOut",
        });
      },
    });
  }

  gsap.set(".revealer svg", { scale: 0 });

  const delays = [6, 6.5, 7];
  document.querySelectorAll(".revealer svg").forEach((el, i) => {
    gsap.to(el, {
      scale: 45,
      duration: 1.5,
      ease: "power4.inOut",
      delay: delays[i],
      onComplete: () => {
        if (i === delays.length - 1) {
          document.querySelector(".loader").remove();
      
          
      
       
          gsap.to([".all-projects", ".shiny-button"], {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            stagger: 0.2,
            pointerEvents: "auto"
          });
      
          ScrollTrigger.create({
            trigger: "#section3",
            start: "top center",
            once: true,
            onEnter: () => {
              if (!threeInitialized) {
                initThreeJSInSection3();
                threeInitialized = true;
              }
            },
          });
        }
      }
      
      ,
    });
  });


  


  gsap.to(".header h1", {
    onStart: () => {
      gsap.to(".toggle-btn", {
        scale: 1,
        duration: 1,
        ease: "power4.inOut",
      });
      gsap.to(".all-projects", {
        backgroundPosition: "200% center",
        duration: 2,
        repeat: -1,
        ease: "power2.inOut"
      });
      gsap.to(".text-shine", {
        backgroundPosition: "200% center",
        duration: 2.5,
        repeat: -1,
        ease: "power2.inOut",
      });
      gsap.to("p", {
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });
      gsap.to("h1", {
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });
      gsap.to(".womanGlass", {
        opacity: 1,
        duration: 2,
        ease: "power3.out",
        delay: 0.2, 
      });
    },
    rotateY: 0,
    opacity: 1,
    duration: 2,
    ease: "power3.out",
    delay: 8,
  });

  gsap.from("#section2 div h1", {
    scrollTrigger: {
      trigger: "#section2 div h1",
      start: "top 80%", 
      toggleActions: "play none none none",
    },
    y: 100,
    opacity: 0,
    duration: 10,
    ease: "power3.out",
  });


  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
  
 
  ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.5,
    effects: true
  });


const sections = document.querySelectorAll("section");


sections.forEach((section, index) => {
  ScrollTrigger.create({
    trigger: section,
    start: "top top",
    end: "bottom top",
    snap: 1, 
    onEnter: () => {
      gsap.to(window, {
        scrollTo: {
          y: section,
          autoKill: false,
        },
        duration: 20,
        ease: "power2.out",
      });
    },
    onEnterBack: () => {
      gsap.to(window, {
        scrollTo: {
          y: section,
          autoKill: false,
        },
        duration: 20,
        ease: "power2.out",
      });
    },
  });
});
  
});




document.querySelector('.toggle-btn').addEventListener('click', () => {
  window.location.href = 'contact.html';
});



