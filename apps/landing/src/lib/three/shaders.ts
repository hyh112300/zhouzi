/**
 * Custom GLSL shaders for the 3D scene.
 * All shaders are written as template literals for use with Three.js ShaderMaterial.
 */

export const centralVertexShader = `
  uniform float uTime;
  uniform float uDistort;
  uniform float uScrollProgress;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vDisplacement;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);

    // Scroll-driven distortion
    float distort = uDistort * (1.0 + uScrollProgress * 2.0);

    // Time-based wave displacement
    vec3 pos = position;
    float displacement = sin(pos.x * 2.0 + uTime * 0.5) * cos(pos.y * 2.0 + uTime * 0.3) * sin(pos.z * 1.5 + uTime * 0.4);
    displacement *= distort * 0.1;

    pos += normal * displacement;
    vDisplacement = displacement;

    vec4 worldPos = modelMatrix * vec4(pos, 1.0);
    vPosition = worldPos.xyz;

    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`

export const centralFragmentShader = `
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform float uTime;
  uniform float uScrollProgress;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vDisplacement;

  void main() {
    // Fresnel effect for rim glow
    vec3 viewDir = normalize(cameraPosition - vPosition);
    float fresnel = 1.0 - abs(dot(viewDir, vNormal));
    fresnel = pow(fresnel, 2.0);

    // Scroll-driven color shift
    float colorMix = sin(uTime * 0.2 + uScrollProgress * 3.0) * 0.5 + 0.5;
    vec3 baseColor = mix(uColor1, uColor2, colorMix);

    // Displacement glow
    float dispGlow = abs(vDisplacement) * 3.0;

    // Combine
    vec3 color = baseColor + fresnel * vec3(0.85, 0.65, 0.3) * 0.8 + dispGlow * vec3(0.9, 0.7, 0.4);

    // Edge glow
    float edgeGlow = pow(1.0 - abs(dot(viewDir, vNormal)), 3.0);
    color += edgeGlow * vec3(0.9, 0.7, 0.3) * 0.5;

    gl_FragColor = vec4(color, 0.95);
  }
`

export const particleVertexShader = `
  attribute float aSize;
  attribute vec3 aColor;
  attribute float aOffset;

  uniform float uTime;
  uniform float uScrollProgress;

  varying vec3 vColor;

  void main() {
    vColor = aColor;

    vec3 pos = position;

    // Gentle floating animation
    float waveX = sin(uTime * 0.3 + aOffset) * 0.3;
    float waveY = cos(uTime * 0.4 + aOffset * 1.2) * 0.3;
    float waveZ = sin(uTime * 0.2 + aOffset * 0.8) * 0.3;

    // Scroll-driven expansion
    float expand = 1.0 + uScrollProgress * 0.5;
    pos.x += waveX * expand;
    pos.y += waveY * expand;
    pos.z += waveZ * expand;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

    // Size attenuation for depth
    gl_PointSize = aSize * (200.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`

export const particleFragmentShader = `
  varying vec3 vColor;

  uniform sampler2D uTexture;

  void main() {
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);
    if (dist > 0.5) discard;

    // Soft circular gradient
    float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
    alpha *= alpha; // sharper falloff

    gl_FragColor = vec4(vColor, alpha * 0.6);
  }
`
