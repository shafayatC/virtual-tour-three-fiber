import React, { useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function ZoomButtons() {
  const { camera } = useThree(); // This hook must be inside Canvas

  const zoomIn = () => {
    camera.zoom = Math.min(camera.zoom + 0.5, 10); // Max zoom level
    camera.updateProjectionMatrix();
  };

  const zoomOut = () => {
    camera.zoom = Math.max(camera.zoom - 0.5, 1); // Min zoom level
    camera.updateProjectionMatrix();
  };

  useEffect(()=>{
    zoomIn()
  },[])
  return (
    <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
      <button onClick={zoomIn} style={{ margin: '5px' }}>Zoom In</button>
      <button onClick={zoomOut} style={{ margin: '5px' }}>Zoom Out</button>
    </div>
  );
}

function Scene() {
  return (
    <>
      <ambientLight />
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <OrbitControls />
    </>
  );
}

export default function TestTwo() {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Canvas>
        <Scene />
        <ZoomButtons /> {/* Render ZoomButtons inside Canvas */}
      </Canvas>
    </div>
  );
}
