import { OrbitControls, Preload } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Portals_Test } from '../component/RoomTest/RoomTestAnimation';
import { MathUtils } from 'three';

const VirtualTour = () => {
  const [switchNumber, setSwitchNumber] = useState(0);
  const orbitControlsRef = useRef(null);
  const zoomTarget = useRef(1); // Track the desired zoom level

  const handleZoomIn = () => {
    zoomTarget.current = Math.min(zoomTarget.current + 0.1, 5); // Limit max zoom
  };

  const handleZoomOut = () => {
    zoomTarget.current = Math.max(zoomTarget.current - 0.1, 0.5); // Limit min zoom
  };


  function MoveCamera() {

    useFrame(({ camera }) => {
      // Smoothly interpolate the zoom value
      // camera.zoom = MathUtils.lerp(camera.zoom, zoomTarget.current, 0.1);
      if(camera.zoom < zoomTarget.current){
        camera.zoom = camera.zoom + 0.1;
      }
      camera.updateProjectionMatrix(); // Notify Three.js of the change

      console.log("current zoom: " + camera.zoom + " target zoom: " + zoomTarget.current);
    });
    return null
  }
  
  useEffect(() => {},[zoomTarget])

  return (
    <>
      <div className="h-screen">
        <Canvas
          flat
          linear
          frameloop="always"
          camera={{ position: [0, 0, 0.1], zoom: 1 }}
        >
          {/* Camera Controls */}
          <MoveCamera/>
          {/* OrbitControls */}
          <OrbitControls
            ref={orbitControlsRef}
            enableZoom={false}
            enablePan={false}
            enableDamping
            dampingFactor={0.2}
            autoRotate={false}
            rotateSpeed={-0.5}
          />

          {/* 3D Content */}
          <Suspense fallback={null}>
            <Preload all />
            <Portals_Test  swithcPostion={switchNumber} />
          </Suspense>
        </Canvas>
      </div>

      {/* Switch Number Controls */}
      <div className="fixed bottom-16 left-0 h-10 w-full flex justify-center gap-3 items-center">
        <div className="flex gap-3">
          <button
            onClick={() => setSwitchNumber(0)}
            className="bg-gray-300 flex justify-center items-center py-4 px-6"
          >
            1
          </button>
          <button
            onClick={() => setSwitchNumber(1)}
            className="bg-gray-300 flex justify-center items-center py-4 px-6"
          >
            2
          </button>
          <button
            onClick={() => setSwitchNumber(2)}
            className="bg-gray-300 flex justify-center items-center py-4 px-6"
          >
            3
          </button>
          <button
            onClick={() => setSwitchNumber(3)}
            className="bg-gray-300 flex justify-center items-center py-4 px-6"
          >
            4
          </button>
        </div>
      </div>

      {/* Zoom Controls */}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2">
        <button onClick={handleZoomIn} className="bg-gray-300 p-2 rounded-md">
          Zoom In
        </button>
        <button onClick={handleZoomOut} className="bg-gray-300 p-2 rounded-md">
          Zoom Out
        </button>
      </div>
    </>
  );
};

export default VirtualTour;
