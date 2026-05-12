---
title: Building Immersive 3D Experiences with React Three Fiber
date: 2026-04-15
tags:
  - Three.js
  - React
  - WebGL
  - performance
description: A deep dive into creating performant WebGL applications using React Three Fiber and custom shaders.
readingTime: 12 min read
cover: /images/r3f-cover.jpg
---

# Building Immersive 3D Experiences with React Three Fiber

React Three Fiber (R3F) is a React renderer for Three.js that brings the power of WebGL into the React ecosystem. In this post, we'll explore how to build performant, visually stunning 3D experiences.

## Why R3F?

- **Declarative**: Build 3D scenes with React components
- **Reusable**: Leverage React's component model
- **Performant**: Automatic disposal and cleanup
- **Ecosystem**: Access to Three.js and postprocessing libraries

## Basic Setup

```tsx
import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <mesh>
        <torusKnotGeometry args={[1, 0.3, 128, 16]} />
        <meshStandardMaterial color="#D4A853" />
      </mesh>
      <OrbitControls />
    </Canvas>
  )
}
```

## Performance Considerations

When building 3D experiences, performance is critical:

1. **Geometry reuse**: Use `useMemo` for geometries and materials
2. **Instancing**: Use `InstancedMesh` for repeated objects
3. **LOD**: Level-of-detail for distant objects
4. **Pixel ratio**: Cap at 2x for desktop, 1x for mobile

```tsx
function InstancedScene({ count = 1000 }) {
  const meshRef = useRef<InstancedMesh>(null!)

  useMemo(() => {
    const dummy = new THREE.Object3D()
    for (let i = 0; i < count; i++) {
      dummy.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
      )
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }
    meshRef.current.instanceMatrix.needsUpdate = true
  }, [count])

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.1, 8, 8]} />
      <meshStandardMaterial color="#D4A853" />
    </instancedMesh>
  )
}
```

## Custom Shaders

For unique visual effects, custom GLSL shaders are essential:

```glsl
// Vertex shader
uniform float uTime;
varying vec2 vUv;

void main() {
  vUv = uv;
  vec3 pos = position;
  pos.z += sin(pos.x * 2.0 + uTime) * 0.1;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
```

## Conclusion

React Three Fiber makes 3D development accessible while maintaining the performance characteristics needed for production applications. Start with simple scenes and progressively enhance.
