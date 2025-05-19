


import SplitType from 'https://unpkg.com/split-type?module';
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/GLTFLoader.js';
import { ScrollTrigger } from 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/all.js';

gsap.registerPlugin(ScrollTrigger);


// ✨ Split text animation


const split = new SplitType("#crystalText", { types: "words" });
gsap.from(split.words, {
  opacity: 0,
  y: 60,
  stagger: 0.1,
  duration: 6,
  ease: "power2.out",
  scrollTrigger: {
    trigger: "#crystalText",
    start: "top 80%",
    end: "top 30%",
    toggleActions: "play none none reverse",
  }
});

//Section 2 - text
gsap.from(".crystal-label", {
  opacity: 0,
  y: 60,
  duration: 3,
  delay: 1,
  ease: "power2.out",
  scrollTrigger: {
    trigger: "#section2",
    start: "top 80%",
    end: "top 30%",
    toggleActions: "play none none reverse"
  }
});

gsap.from(".defined", {
  opacity: 0,
  y: 60,
  duration: 3,
  delay: 1,
  ease: "power2.out",
  scrollTrigger: {
    trigger: "#section",
    start: "top 80%",
    end: "top 30%",
    toggleActions: "play none none reverse"
  }
});


gsap.from(".crystalText", {
  opacity: 0,
  y: 60,
  duration: 3,
  delay: 1,
  ease: "power2.out",
  scrollTrigger: {
    trigger: "#section4",
    start: "top 80%",
    end: "top 30%",
    toggleActions: "play none none reverse"
  }
});




// SECTION 2 — Crystal Shader with Pink Reflections
const container = document.querySelector(".model2");
if (container) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, container.offsetWidth / container.offsetHeight, 0.1, 1000);
  camera.position.set(0, 0, 5);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.offsetWidth, container.offsetHeight);
  container.appendChild(renderer.domElement);

  const clock = new THREE.Clock();

  scene.add(new THREE.AmbientLight(0xffffff, 1));
  const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
  dirLight.position.set(3, 9, 9);
  scene.add(dirLight);

  const pinkLight = new THREE.DirectionalLight(new THREE.Color('#F37F9C'), 0);
  scene.add(pinkLight);

  const animatePink = () => {
    const t = clock.getElapsedTime();
    pinkLight.intensity = Math.max(0, Math.sin((t / 3) * Math.PI));
    pinkLight.position.set(Math.sin(t) * 5, Math.cos(t * 0.5) * 5, Math.sin(t * 0.3) * 5);
  };

  Promise.all([
    fetch('three/crystalShader.vert').then(res => res.text()),
    fetch('three/crystalShader.frag').then(res => res.text())
  ]).then(([vertexShader, fragmentShader]) => {
    const shaderMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: { time: { value: 0 } },
      mouse: { value: new THREE.Vector2(0, 0) },
      transparent: true,
      side: THREE.DoubleSide,
    });

    const loader = new GLTFLoader();
    loader.load("three/model2.glb", (gltf) => {
      const model = gltf.scene;
      model.traverse((child) => {
        if (child.isMesh) child.material = shaderMaterial;
      });

      // Wrap in a parent group
  const modelGroup = new THREE.Group();
  modelGroup.add(model);
  scene.add(modelGroup);

      model.scale.set(1, 1, 1);
      model.rotation.y = Math.PI;
    

      // Initial state
modelGroup.position.y = -2;
modelGroup.rotation.x = Math.PI / 2;

// Create one ScrollTrigger to run both animations manually
ScrollTrigger.create({
  trigger: "#section2",
  start: "top 80%",
  end: "top 30%",
  onEnter: () => {
    gsap.to(modelGroup.position, {
      y: 0,
      duration: 2,
      ease: "power4.out"
    });
    gsap.to(modelGroup.rotation, {
      x: 0,
      duration: 2,
      ease: "power2.out"
    });
  },
  onLeaveBack: () => {
    // Reset position & rotation if scrolling back up
    modelGroup.position.y = -2;
    modelGroup.rotation.x = Math.PI * 2;
  },
  once: false,
  invalidateOnRefresh: true
});


      function animate() {
        requestAnimationFrame(animate);
        shaderMaterial.uniforms.time.value = clock.getElapsedTime();
        animatePink();
        model.rotation.y += 0.0008;
        renderer.render(scene, camera);
      }

      animate();
    });
  });
}


const model3Container = document.querySelector(".model3");

if (model3Container) {
  const scene3 = new THREE.Scene();
  const camera3 = new THREE.PerspectiveCamera(
    60,
    model3Container.offsetWidth / model3Container.offsetHeight,
    0.1,
    1000
  );
  camera3.position.set(0, 0, 3);

  const renderer3 = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer3.setSize(model3Container.offsetWidth, model3Container.offsetHeight);
  model3Container.appendChild(renderer3.domElement);

  const clock3 = new THREE.Clock();

  scene3.add(new THREE.AmbientLight(0xffffff, 1));
  const dirLight3 = new THREE.DirectionalLight(0xffffff, 1.5);
  dirLight3.position.set(3, 9, 9);
  scene3.add(dirLight3);

  // Load shaders
  Promise.all([
    fetch('three/crystalShader.vert').then(res => res.text()),
    fetch('three/crystalShader.frag').then(res => res.text())
  ]).then(([vertexShader, fragmentShader]) => {
    const crystalShaderMat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        time: { value: 0 },
      mouse: { value: new THREE.Vector2(0, 0) }
      },
      transparent: true,
      side: THREE.DoubleSide
    });

    const loader3 = new GLTFLoader();
    loader3.load("three/model3.glb", (gltf) => {
      const model3 = gltf.scene;
      model3.traverse((child) => {
        if (child.isMesh) {
          child.material = crystalShaderMat;
        }
      });
    
      const modelGroup3 = new THREE.Group();
      modelGroup3.add(model3);
      scene3.add(modelGroup3);
    
      model3.scale.set(1.5, 1.5, 1.5);
      model3.rotation.y = Math.PI;
    
      // Initial state (hidden below, rotated forward)
      modelGroup3.position.y = -2;
      modelGroup3.rotation.x = Math.PI * 2;
    
      // Scroll animation
      ScrollTrigger.create({
        trigger: "#section3",
        start: "top 80%",
        end: "top 30%",
        onEnter: () => {
          // Roll in
          gsap.to(modelGroup3.position, {
            y: 0,
            duration: 2,
            ease: "power4.out"
          });
          gsap.to(modelGroup3.rotation, {
            x: 0,
            duration: 2,
            ease: "power2.out"
          });
        },
        onLeaveBack: () => {
          // Roll out
          gsap.to(modelGroup3.position, {
            y: -2,
            duration: 2,
            ease: "power4.in"
          });
          gsap.to(modelGroup3.rotation, {
            x: Math.PI / 2,
            duration: 2,
            ease: "power2.in"
          });
        },
        once: false,
        invalidateOnRefresh: true
      });

      // Smooth zoom in during second scroll inside section3
ScrollTrigger.create({
  trigger: "#section3",
  start: "top 50%",
  end: "bottom top",
  scrub: false,
  toggleActions: "play reverse play reverse",
  onEnter: () => {
    // Zoom model toward camera
    gsap.to(modelGroup3.position, {
      z: 0.5,
      duration: 2,
      ease: "power3.inOut"
    });
    gsap.to(modelGroup3.scale, {
      x: 4,
      y: 4,
      z: 4,
      duration: 2,
      ease: "power3.inOut"
    });

    // Show final text
    gsap.to("#finalMessage", {
      opacity: 1,
      duration: 2,
      delay: 1
    });
  },
  onLeaveBack: () => {
    // Reverse zoom
    gsap.to(modelGroup3.position, {
      z: 3,
      duration: 2,
      ease: "power3.inOut"
    });
    gsap.to(modelGroup3.scale, {
      x: 1.5,
      y: 1.5,
      z: 1.5,
      duration: 2,
      ease: "power3.inOut"
    });

    // Hide final text
    gsap.to("#finalMessage", {
      opacity: 0,
      duration: 1
    });
  }
});



      
    
      function animate() {
        requestAnimationFrame(animate);
        crystalShaderMat.uniforms.time.value = clock3.getElapsedTime();
        model3.rotation.y += 0.0008;
        renderer3.render(scene3, camera3);
      }
    
      animate();
    });
    
  });
}


const impulseLayer = document.querySelector(".bg-impulse-layer");


// 💧 2. Create random pulse
function createPulse() {
  const pulse = document.createElement("div");
  pulse.classList.add("bg-pulse");

  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight;

  pulse.style.left = `${x}px`;
  pulse.style.top = `${y}px`;

  impulseLayer.appendChild(pulse);

  // Animate pulse
  pulse.animate([
    { transform: "scale(0.5)", opacity: 0.6 },
    { transform: "scale(5.5)", opacity: 0 }
  ], {
    duration: 2000 + Math.random() * 2000,
    easing: "ease-out"
  });

  // Remove after animation
  setTimeout(() => {
    pulse.remove();
  }, 3000);
}

// 🌀 3. Loop to trigger random pulses
setInterval(() => {
  if (Math.random() > 0.2) {
    createPulse();
  }
}, 1000);


