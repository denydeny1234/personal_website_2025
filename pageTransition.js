// pageTransition.js
document.addEventListener("DOMContentLoaded", () => {
    const transitionDiv = document.querySelector(".page-transition");
  
    if (transitionDiv) {
      // FADE OUT transition layer on page load
      transitionDiv.style.display = "block";
      gsap.fromTo(
        transitionDiv,
        { opacity: 1 },
        {
          opacity: 0,
          duration: 1,
          delay: 2.2,
          ease: "power2.out",
          onComplete: () => {
            transitionDiv.style.display = "none";
          },
        }
      );
    }
  
    // Add transition before navigating away
    document.querySelectorAll("a, button[data-link]").forEach((el) => {
      el.addEventListener("click", (e) => {
        const href = el.getAttribute("href") || el.dataset.link;
  
        // Only transition for internal links (skip anchors, external)
        if (
          href &&
          !href.startsWith("#") &&
          !href.startsWith("http") &&
          !href.endsWith(".pdf") &&
          !href.startsWith("mailto:")
        ) {
          e.preventDefault();
  
          // Show and animate the white transition
          if (transitionDiv) {
            transitionDiv.style.display = "block";
            gsap.fromTo(
              transitionDiv,
              { opacity: 0 },
              {
                opacity: 1,
                duration: 0.8,
                ease: "power2.inOut",
                onComplete: () => {
                  window.location.href = href;
                },
              }
            );
          } else {
            // If no transition div, just navigate
            window.location.href = href;
          }
        }
      });
    });
  });
  