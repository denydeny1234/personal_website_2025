precision mediump float;

uniform float time;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vec3 pos = position + normal * sin(time + position.x * 5.0) * 0.05;
  vNormal = normal;
  vPosition = pos;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
