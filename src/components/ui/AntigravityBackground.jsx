import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const SIZE = 256;
const LOGICAL_SIZE = 500;
const DEFAULT_DENSITY = 200;

const PALETTES = {
  dark: {
    background: 0x000000,
    color1: '#7189ff',
    color2: '#3074f9',
    color3: '#000000',
  },
  light: {
    background: 0xffffff,
    color1: '#2c64ed',
    color2: '#f84242',
    color3: '#ffcf03',
  },
};

const SIMPLEX_NOISE = `
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod(i, 289.0);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
`;

const SIM_FRAGMENT_SHADER = `
precision highp float;
uniform sampler2D uPosition;
uniform sampler2D uPosRefs;
uniform vec2 uRingPos;
uniform float uTime;
uniform float uDeltaTime;
uniform float uRingRadius;
uniform float uRingWidth;
uniform float uRingWidth2;
uniform float uRingDisplacement;

${SIMPLEX_NOISE}

void main() {
  vec2 simTexCoords = gl_FragCoord.xy / vec2(${SIZE.toFixed(1)}, ${SIZE.toFixed(1)});
  vec4 pFrame = texture2D(uPosition, simTexCoords);

  float scale = pFrame.z;
  float velocity = pFrame.w;
  vec2 refPos = texture2D(uPosRefs, simTexCoords).xy;
  float time = uTime * .5;
  vec2 curentPos = refPos;
  vec2 pos = pFrame.xy;
  pos *= .8;

  float dist = distance(curentPos.xy, uRingPos);
  float noise0 = snoise(vec3(curentPos.xy * .2 + vec2(18.4924, 72.9744), time * 0.5));
  float dist1 = distance(curentPos.xy + (noise0 * .005), uRingPos);

  float t = smoothstep(uRingRadius - (uRingWidth * 2.), uRingRadius, dist) - smoothstep(uRingRadius, uRingRadius + uRingWidth, dist1);
  float t2 = smoothstep(uRingRadius - (uRingWidth2 * 2.), uRingRadius, dist) - smoothstep(uRingRadius, uRingRadius + uRingWidth2, dist1);
  float t3 = smoothstep(uRingRadius + uRingWidth2, uRingRadius, dist);

  t = pow(t, 2.);
  t2 = pow(t2, 3.);
  t += t2 * 3.;
  t += t3 * .4;
  t += snoise(vec3(curentPos.xy * 30. + vec2(11.4924, 12.9744), time * 0.5)) * t3 * .5;

  float nS = snoise(vec3(curentPos.xy * 2. + vec2(18.4924, 72.9744), time * 0.5));
  t += pow((nS + 1.5) * .5, 2.) * .6;

  float noise1 = snoise(vec3(curentPos.xy * 4. + vec2(88.494, 32.4397), time * 0.35));
  float noise2 = snoise(vec3(curentPos.xy * 4. + vec2(50.904, 120.947), time * 0.35));
  float noise3 = snoise(vec3(curentPos.xy * 20. + vec2(18.4924, 72.9744), time * .5));
  float noise4 = snoise(vec3(curentPos.xy * 20. + vec2(50.904, 120.947), time * .5));

  vec2 disp = vec2(noise1, noise2) * .03;
  disp += vec2(noise3, noise4) * .005;
  disp.x += sin((refPos.x * 20.) + (time * 4.)) * .02 * clamp(dist, 0., 1.);
  disp.y += cos((refPos.y * 20.) + (time * 3.)) * .02 * clamp(dist, 0., 1.);

  pos -= (uRingPos - (curentPos + disp)) * pow(t2, .75) * uRingDisplacement;

  float scaleDiff = t - scale;
  scaleDiff *= .2;
  scale += scaleDiff;

  vec2 finalPos = curentPos + disp + (pos * .25);
  velocity *= .5;
  velocity += scale * .25;

  gl_FragColor = vec4(finalPos, scale, velocity);
}
`;

const VERTEX_SHADER = `
precision highp float;
attribute vec4 seeds;
uniform sampler2D uPosition;
uniform float uParticleScale;
uniform float uPixelRatio;
varying vec4 vSeeds;
varying float vVelocity;
varying vec2 vLocalPos;
varying vec2 vScreenPos;
varying float vScale;

void main() {
  vec4 pos = texture2D(uPosition, uv);
  vSeeds = seeds;
  vVelocity = pos.w;
  vScale = pos.z;
  vLocalPos = pos.xy;

  vec4 viewSpace = modelViewMatrix * vec4(vec3(pos.xy, 0.), 1.0);
  gl_Position = projectionMatrix * viewSpace;
  vScreenPos = gl_Position.xy;
  gl_PointSize = ((vScale * 7.) * (uPixelRatio * 0.5) * uParticleScale);
}
`;

const FRAGMENT_SHADER = `
precision highp float;
varying vec4 vSeeds;
varying vec2 vScreenPos;
varying vec2 vLocalPos;
varying float vScale;
varying float vVelocity;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec2 uRingPos;
uniform vec2 uRez;
uniform float uAlpha;
uniform float uTime;
uniform int uColorScheme;

${SIMPLEX_NOISE}

float sdRoundBox(in vec2 p, in vec2 b, in vec4 r) {
  r.xy = (p.x > 0.0) ? r.xy : r.zw;
  r.x  = (p.y > 0.0) ? r.x  : r.y;
  vec2 q = abs(p) - b + r.x;
  return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r.x;
}

vec2 rotate(vec2 v, float a) {
  float s = sin(a);
  float c = cos(a);
  mat2 m = mat2(c, s, -s, c);
  return m * v;
}

void main() {
  float uBorderSize = 0.2;
  float ratio = uRez.x / uRez.y;

  float noiseAngle = snoise(vec3(vLocalPos * 10. + vec2(18.4924, 72.9744), uTime * .85));
  float noiseColor = snoise(vec3(vLocalPos * 2. + vec2(74.664, 91.556), uTime * .5));
  noiseColor = (noiseColor + 1.) * .5;

  float angle = atan(vLocalPos.y - uRingPos.y, vLocalPos.x - uRingPos.x);

  vec2 uv = gl_PointCoord.xy;
  uv -= vec2(0.5);
  uv.y *= -1.;
  uv = rotate(uv, -angle + (noiseAngle * .5));

  vec2 tuv = vScreenPos;
  tuv = rotate(tuv, uTime * 1.);
  tuv.y *= 1. / ratio;
  tuv += .5;

  float h = 0.8;
  float progress = smoothstep(0., .75, pow(noiseColor, 2.));
  vec3 col = mix(mix(uColor1, uColor2, progress / h), mix(uColor2, uColor3, (progress - h) / (1.0 - h)), step(h, progress));
  vec3 color = col;

  float dist = sqrt(dot(uv, uv));
  float dr = .5;
  float t = smoothstep(dr + (uBorderSize + .0001), dr - uBorderSize, dist);
  t = clamp(t, 0., 1.);

  float rounded = sdRoundBox(uv, vec2(0.5, 0.2), vec4(.25));
  rounded = smoothstep(.1, 0., rounded);

  float a = uAlpha * rounded * smoothstep(0.1, 0.2, vScale);
  if (a < 0.01) {
    discard;
  }

  color = clamp(color, 0., 1.);
  color = mix(color, color * clamp(vVelocity, 0., 1.), float(uColorScheme));
  gl_FragColor = vec4(color, clamp(a, 0., 1.));
}
`;

function resolveTheme(theme) {
  if (theme === 'dark' || theme === 'light') return theme;
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

function mapRange(value, inMin, inMax, outMin, outMax) {
  return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

function random(seed) {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let t = value;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function squaredDistance(a, b) {
  let total = 0;
  for (let i = 0; i < a.length; i += 1) {
    total += (a[i] - b[i]) ** 2;
  }
  return total;
}

function poissonDiskSampling({
  shape,
  minDistance,
  maxDistance = minDistance * 2,
  tries = 20,
  seed,
}) {
  const rng = random(seed);
  const dimension = shape.length;
  const cellSize = minDistance / Math.sqrt(dimension);
  const gridShape = shape.map((side) => Math.ceil(side / cellSize));
  const grid = new Array(gridShape.reduce((acc, side) => acc * side, 1)).fill(-1);
  const samples = [];
  const processList = [];
  const minDistanceSquared = minDistance * minDistance;

  const stride = [];
  for (let i = dimension - 1, value = 1; i >= 0; i -= 1) {
    stride[i] = value;
    value *= gridShape[i];
  }

  function gridIndex(point) {
    let index = 0;
    for (let i = 0; i < dimension; i += 1) {
      const cell = Math.floor(point[i] / cellSize);
      if (cell < 0 || cell >= gridShape[i]) return -1;
      index += cell * stride[i];
    }
    return index;
  }

  function inNeighbourhood(point) {
    const base = point.map((value) => Math.floor(value / cellSize));
    for (let ox = -2; ox <= 2; ox += 1) {
      for (let oy = -2; oy <= 2; oy += 1) {
        const x = base[0] + ox;
        const y = base[1] + oy;
        if (x < 0 || y < 0 || x >= gridShape[0] || y >= gridShape[1]) continue;
        const sampleIndex = grid[x * stride[0] + y * stride[1]];
        if (sampleIndex !== -1 && squaredDistance(point, samples[sampleIndex]) < minDistanceSquared) {
          return true;
        }
      }
    }
    return false;
  }

  function addPoint(point) {
    const index = gridIndex(point);
    if (index < 0) return null;
    samples.push(point);
    processList.push(point);
    grid[index] = samples.length - 1;
    return point;
  }

  addPoint(shape.map((side) => rng() * side));

  while (processList.length > 0) {
    const current = processList.shift();
    for (let i = 0; i < tries; i += 1) {
      const angle = rng() * Math.PI * 2;
      const distance = minDistance + (maxDistance - minDistance) * rng();
      const point = [
        current[0] + Math.cos(angle) * distance,
        current[1] + Math.sin(angle) * distance,
      ];
      const inside = point.every((value, axis) => value >= 0 && value < shape[axis]);
      if (inside && !inNeighbourhood(point)) addPoint(point);
    }
  }

  return samples;
}

function createPointsTexture({ density, seed }) {
  const minDistance = mapRange(density, 0, 300, 10, 2);
  const maxDistance = mapRange(density, 0, 300, 11, 3);
  const points = poissonDiskSampling({
    shape: [LOGICAL_SIZE, LOGICAL_SIZE],
    minDistance,
    maxDistance,
    tries: 20,
    seed,
  });

  const data = new Float32Array(SIZE * SIZE * 4);
  const count = Math.min(points.length, SIZE * SIZE);

  for (let i = 0; i < count; i += 1) {
    const offset = i * 4;
    data[offset] = (points[i][0] - 250) / 250;
    data[offset + 1] = (points[i][1] - 250) / 250;
    data[offset + 2] = 0;
    data[offset + 3] = 0;
  }

  const texture = new THREE.DataTexture(data, SIZE, SIZE, THREE.RGBAFormat, THREE.FloatType);
  texture.needsUpdate = true;
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;

  return { texture, count };
}

class SmoothNoise {
  constructor(seed) {
    const rng = random(seed);
    this.values = Array.from({ length: 256 }, () => rng());
  }

  getVal(value) {
    const scaled = value;
    const base = Math.floor(scaled);
    const fraction = scaled - base;
    const eased = fraction * fraction * (3 - 2 * fraction);
    const a = this.values[base & 255];
    const b = this.values[(base + 1) & 255];
    return a * (1 - eased) + b * eased;
  }
}

export default function AntigravityBackground({
  theme = 'auto',
  density = DEFAULT_DENSITY,
  particlesScale = 0.75,
  ringWidth = 0.15,
  ringWidth2 = 0.05,
  ringDisplacement = 0.15,
  seed = 2026,
  opacity = 0.35,
  className = '',
  zIndex = -1,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const currentTheme = resolveTheme(theme);
    const palette = PALETTES[currentTheme];
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const scene = new THREE.Scene();
    const simScene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 1000);
    const simCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: true,
      stencil: false,
      precision: 'highp',
    });

    scene.background = new THREE.Color(palette.background);
    renderer.setPixelRatio(pixelRatio);
    renderer.setClearColor(palette.background, 1);
    renderer.domElement.id = 'antigravity-canvas';
    renderer.domElement.setAttribute('aria-hidden', 'true');
    renderer.domElement.className = `fixed inset-0 h-screen w-screen pointer-events-none ${className}`;
    renderer.domElement.style.zIndex = String(zIndex);
    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100vw';
    renderer.domElement.style.height = '100vh';
    renderer.domElement.style.opacity = String(opacity);
    container.appendChild(renderer.domElement);

    camera.position.z = 3.1;

    const points = createPointsTexture({ density, seed });
    const renderTargetOptions = {
      wrapS: THREE.ClampToEdgeWrapping,
      wrapT: THREE.ClampToEdgeWrapping,
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
      depthBuffer: false,
      stencilBuffer: false,
    };
    const rt1 = new THREE.WebGLRenderTarget(SIZE, SIZE, renderTargetOptions);
    const rt2 = new THREE.WebGLRenderTarget(SIZE, SIZE, renderTargetOptions);

    const simMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uPosition: { value: points.texture },
        uPosRefs: { value: points.texture },
        uRingPos: { value: new THREE.Vector2(0, 0) },
        uRingRadius: { value: 0.2 },
        uDeltaTime: { value: 0 },
        uRingWidth: { value: ringWidth },
        uRingWidth2: { value: ringWidth2 },
        uRingDisplacement: { value: ringDisplacement },
        uTime: { value: 0 },
      },
      vertexShader: 'void main(){ gl_Position = vec4(position, 1.0); }',
      fragmentShader: SIM_FRAGMENT_SHADER,
    });

    const simQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), simMaterial);
    simScene.add(simQuad);

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(points.count * 3);
    const uvs = new Float32Array(points.count * 2);
    const seeds = new Float32Array(points.count * 4);
    const rng = random(seed + 90);

    for (let i = 0; i < points.count; i += 1) {
      const x = i % SIZE;
      const y = Math.floor(i / SIZE);
      uvs[i * 2] = x / SIZE;
      uvs[i * 2 + 1] = y / SIZE;
      seeds[i * 4] = rng();
      seeds[i * 4 + 1] = rng();
      seeds[i * 4 + 2] = rng();
      seeds[i * 4 + 3] = rng();
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
    geometry.setAttribute('seeds', new THREE.BufferAttribute(seeds, 4));

    const renderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uPosition: { value: points.texture },
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color(palette.color1) },
        uColor2: { value: new THREE.Color(palette.color2) },
        uColor3: { value: new THREE.Color(palette.color3) },
        uAlpha: { value: 1 },
        uRingPos: { value: new THREE.Vector2(0, 0) },
        uRez: { value: new THREE.Vector2(1, 1) },
        uParticleScale: { value: particlesScale },
        uPixelRatio: { value: pixelRatio },
        uColorScheme: { value: currentTheme === 'dark' ? 0 : 1 },
      },
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });

    const mesh = new THREE.Points(geometry, renderMaterial);
    mesh.position.set(0, 0, 0);
    mesh.scale.set(5, 5, 5);
    scene.add(mesh);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(0, 0);
    const intersectionPoint = new THREE.Vector3(0, 0, 0);
    const raycastPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(12.5, 12.5),
      new THREE.MeshBasicMaterial({ color: 0xff0000, visible: false, side: THREE.DoubleSide }),
    );
    scene.add(raycastPlane);

    const noise = new SmoothNoise(seed + 19);
    const ringPos = new THREE.Vector2(0, 0);
    const cursorPos = new THREE.Vector2(0, 0);
    const startedAt = performance.now();
    let time = 0;
    let lastTime = 0;
    let animationId = 0;
    let everRendered = false;
    let readTarget = rt1;
    let writeTarget = rt2;
    let mouseIsOver = false;
    let isIntersecting = false;
    let skipFrame = false;

    function resize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderMaterial.uniforms.uRez.value.set(renderer.domElement.width, renderer.domElement.height);
      renderMaterial.uniforms.uPixelRatio.value = pixelRatio;
    }

    function handlePointerMove(event) {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      mouseIsOver = mouse.x >= -1 && mouse.x <= 1 && mouse.y >= -1 && mouse.y <= 1;
    }

    function preRender() {
      const elapsed = (performance.now() - startedAt) * 0.001;
      const delta = elapsed - lastTime;
      lastTime = elapsed;
      time += delta;

      if (!skipFrame) {
        raycaster.setFromCamera(mouse, camera);
        const intersections = raycaster.intersectObject(raycastPlane);
        if (intersections.length > 0 && mouseIsOver) {
          intersectionPoint.copy(intersections[0].point);
          isIntersecting = true;
        } else {
          isIntersecting = false;
        }
      }
      skipFrame = !skipFrame;

      const ambientX = (noise.getVal(time * 0.66 + 94.234) - 0.5) * 2;
      const ambientY = (noise.getVal(time * 0.75 + 21.028) - 0.5) * 2;

      if (isIntersecting) {
        cursorPos.set(intersectionPoint.x * 0.175 + ambientX * 0.1, intersectionPoint.y * 0.175 + ambientY * 0.1);
        ringPos.set(
          ringPos.x + (cursorPos.x - ringPos.x) * 0.02,
          ringPos.y + (cursorPos.y - ringPos.y) * 0.02,
        );
      } else {
        cursorPos.set(ambientX * 0.2, ambientY * 0.1);
        ringPos.set(
          ringPos.x + (cursorPos.x - ringPos.x) * 0.01,
          ringPos.y + (cursorPos.y - ringPos.y) * 0.01,
        );
      }

      const particleScale = renderer.domElement.width / pixelRatio / 2000 * particlesScale;

      simMaterial.uniforms.uPosition.value = everRendered ? readTarget.texture : points.texture;
      simMaterial.uniforms.uTime.value = elapsed;
      simMaterial.uniforms.uDeltaTime.value = delta;
      simMaterial.uniforms.uRingRadius.value = 0.175 + Math.sin(time) * 0.03 + Math.cos(time * 3) * 0.02;
      simMaterial.uniforms.uRingPos.value.copy(ringPos);
      simMaterial.uniforms.uRingWidth.value = ringWidth;
      simMaterial.uniforms.uRingWidth2.value = ringWidth2;
      simMaterial.uniforms.uRingDisplacement.value = ringDisplacement;

      renderer.setRenderTarget(writeTarget);
      renderer.render(simScene, simCamera);
      renderer.setRenderTarget(null);

      renderMaterial.uniforms.uPosition.value = everRendered ? writeTarget.texture : points.texture;
      renderMaterial.uniforms.uTime.value = elapsed;
      renderMaterial.uniforms.uRingPos.value.copy(ringPos);
      renderMaterial.uniforms.uParticleScale.value = particleScale;
    }

    function render() {
      preRender();
      renderer.setRenderTarget(null);
      renderer.autoClear = true;
      renderer.clear();
      renderer.render(scene, camera);

      const swap = readTarget;
      readTarget = writeTarget;
      writeTarget = swap;
      everRendered = true;

      animationId = window.requestAnimationFrame(render);
    }

    resize();
    handlePointerMove({ clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 });
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    animationId = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      scene.remove(mesh);
      scene.remove(raycastPlane);
      simScene.remove(simQuad);
      geometry.dispose();
      renderMaterial.dispose();
      simMaterial.dispose();
      simQuad.geometry.dispose();
      raycastPlane.geometry.dispose();
      raycastPlane.material.dispose();
      points.texture.dispose();
      rt1.dispose();
      rt2.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [className, density, opacity, particlesScale, ringDisplacement, ringWidth, ringWidth2, seed, theme, zIndex]);

  return <div ref={containerRef} aria-hidden="true" />;
}
