precision mediump float;

uniform float time;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
float edgeGlow = pow(abs(dot(normalize(vNormal), normalize(vPosition))), 2.5); // instead of 3.0
  float noise = sin(dot(vPosition.xyz, vec3(12.9898, 78.233, 42.543)) + time * 1.5);
  noise = fract(noise * 43758.5453);

  vec3 baseColor = vec3(1.0); // white base
  vec3 glowColor = vec3(0.980, 0.094, 0.314); // #FA1850

  // ✨ Subtle shadow effect based on depth
  float depthShadow = smoothstep(0.0, 5.0, length(vPosition)) * 0.3;

  // ✨ Mix glow and base, then apply shadow
  vec3 finalColor = mix(baseColor, glowColor, edgeGlow * noise * 0.5);
  finalColor -= depthShadow;

  gl_FragColor = vec4(finalColor, 0.55); // semi-transparent
}
