// This file contains the GLSL shader code used for creating organic visual effects in the Three.js scene.

const vertexShader = `
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    vec3 pos = position;
    pos.z += sin(pos.x * 10.0 + time) * 0.1; // Organic wave effect
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;

  void main() {
    vec3 color = vec3(0.0);
    color.r = 0.5 + 0.5 * sin(vUv.x * 10.0 + time);
    color.g = 0.5 + 0.5 * sin(vUv.y * 10.0 + time);
    color.b = 0.5 + 0.5 * sin((vUv.x + vUv.y) * 10.0 + time);
    gl_FragColor = vec4(color, 1.0);
  }
`;

export { vertexShader, fragmentShader };