import { Html, OrbitControls, Preload } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import React, { Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { MathUtils } from 'three';
import { Portals_Test_Effect } from '../component/RoomTest/RoomTestChangeEffect';
import loadingImage from '../../public/loadingOne.jpg';


const TestPage = () => {
  const [switchNumber, setSwitchNumber] = useState(0);
  const orbitControlsRef = useRef(null);
  const zoomTarget = useRef(1); // Track the desired zoom level

  const handleZoomIn = () => {
    zoomTarget.current = Math.min(zoomTarget.current + 0.5, 3); // Limit max zoom
  };

  const handleZoomOut = () => {
    zoomTarget.current = Math.max(zoomTarget.current - 0.5, 0.5); // Limit min zoom
  };


  function MoveCamera() {

    useFrame(({ camera }) => {
      camera.zoom = MathUtils.lerp(camera.zoom, zoomTarget.current, 0.1);

      camera.updateProjectionMatrix(); // Notify Three.js of the change

      console.log("current zoom: " + camera.zoom + " target zoom: " + zoomTarget.current);
    });
    return null
  }

  useEffect(() => { }, [zoomTarget])
  useLayoutEffect(() => {
    // Access DOM elements or perform layout-related calculations here
    console.log('Layout effect triggered');
  }, [zoomTarget]);

  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  const handelAtuoRotation =()=>{
    console.log(" orbitControlsRef.current.autoRotate ",  !orbitControlsRef.current.autoRotate )
    orbitControlsRef.current.autoRotate = !orbitControlsRef.current.autoRotate; 

  }
  
  // hande zoom in and out by mouse scroll 
  useEffect(() => {
    const handleScroll = (event) => {
        if (event.deltaY < 0) {
          handleZoomIn();
        } else {
          handleZoomOut();
        }
    };
    window.addEventListener("wheel", handleScroll);
    return () => window.removeEventListener("wheel", handleScroll);
}, []);

  return (
    <>
      <div className="h-screen z-0 relative">
        <Suspense fallback={null}>
        <Canvas
          flat
          linear
          frameloop="always"
          camera={{ position: [0, 0, 0.1], zoom: 1 }}
        >
          {/* Camera Controls */}
          <MoveCamera />
          {/* OrbitControls */}
          <OrbitControls
            ref={orbitControlsRef}
            enableZoom={false}
            enablePan={false}
            enableDamping
            dampingFactor={0.01}
            autoRotate={false}
            rotateSpeed={-0.5}
          />

          {/* 3D Content */}
          <Suspense fallback={
            <Html
            as='div' // Wrapping element (default: 'div')
            wrapperClass // The className of the wrapping element (default: undefined)
            prepend // Project content behind the canvas (default: false)
            // center // Adds a -50%/-50% css transform (default: false) [ignored in transform mode]
            fullscreen // Aligns to the upper-left corner, fills the screen (default:false) [ignored in transform mode]
            // distanceFactor={10} // If set (default: undefined), children will be scaled by this factor, and also by distance to a PerspectiveCamera / zoom by a OrthographicCamera.
            // zIndexRange={[100, 0]} // Z-order range (default=[16777271, 0])
            // portal={domnodeRef} // Reference to target container (default=undefined)
            // transform // If true, applies matrix3d transformations (default=false)
            // sprite // Renders as sprite, but only in transform mode (default=false)
            // calculatePosition={(el: Object3D, camera: Camera, size: { width: number; height: number }) => number[]} // Override default positioning function. (default=undefined) [ignored in transform mode]
            // occlude={[ref]} // Can be true or a Ref<Object3D>[], true occludes the entire scene (default: undefined)
            // onOcclude={(hidden) => null} // Callback when the visibility changes (default: undefined)
            // {...groupProps} // All THREE.Group props are valid
            // {...divProps} // All HTMLDivElement props are valid
          >
          
            <div className='relative flex flex-col justify-center items-center h-screen'>
            <p className='absolute text-2xl text-white font-bold z-30'>Loading...</p>
            <img className='absolute left-0 top-0 w-full h-full' src='/loadingOne.jpg'/>
            <div className='absolute left-0 top-0 w-full h-full opacity-80 bg-black  animate-pulse '></div>
            </div></Html>}>
            <Preload all />
            <Portals_Test_Effect swithcPostion={switchNumber} />
          </Suspense>
        </Canvas>
        </Suspense>
      </div>

      <div className="fixed bottom-0 z-50 left-1/2 -translate-x-1/2 pb-4 flex flex-col justify-center gap-3 items-center">

        {/* Switch Number Controls */}
        <div >
          <div className="flex gap-[19px]">
            <button
              onClick={() => setSwitchNumber(0)}
              className="bg-gray-300 flex justify-center items-center w-[100px] h-[70px] rounded-md"
            >
              <img src='./thumbs/1.png' />
            </button>
            <button
              onClick={() => setSwitchNumber(1)}
              className="bg-gray-300 flex justify-center items-center w-[100px] h-[70px] rounded-md"
            >
              <img src='./thumbs/2.png' />
              </button>
            <button
              onClick={() => setSwitchNumber(0)}
              className="bg-gray-300 flex justify-center items-center w-[100px] h-[70px] rounded-md"
            >
              <img src='./thumbs/1.png' />
              </button>
            <button
              onClick={() => setSwitchNumber(1)}
              className="bg-gray-300 flex justify-center items-center w-[100px] h-[70px] rounded-md"
            >
              <img src='./thumbs/2.png' />
              </button>
          </div>
        </div>

        <div className='flex gap-5 bg-white py-2 px-4 rounded-sm'>
          <button onClick={handleZoomIn}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M10 10H7M21 21L15 15L21 21ZM17 10C17 10.9193 16.8189 11.8295 16.4672 12.6788C16.1154 13.5281 15.5998 14.2997 14.9497 14.9497C14.2997 15.5998 13.5281 16.1154 12.6788 16.4672C11.8295 16.8189 10.9193 17 10 17C9.08075 17 8.1705 16.8189 7.32122 16.4672C6.47194 16.1154 5.70026 15.5998 5.05025 14.9497C4.40024 14.2997 3.88463 13.5281 3.53284 12.6788C3.18106 11.8295 3 10.9193 3 10C3 8.14348 3.7375 6.36301 5.05025 5.05025C6.36301 3.7375 8.14348 3 10 3C11.8565 3 13.637 3.7375 14.9497 5.05025C16.2625 6.36301 17 8.14348 17 10ZM10 7V10V7ZM10 10V13V10ZM10 10H13H10Z" stroke="#3F3F46" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>

          <button onClick={handleZoomOut}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M13 10H7M21 21L15 15L21 21ZM17 10C17 10.9193 16.8189 11.8295 16.4672 12.6788C16.1154 13.5281 15.5998 14.2997 14.9497 14.9497C14.2997 15.5998 13.5281 16.1154 12.6788 16.4672C11.8295 16.8189 10.9193 17 10 17C9.08075 17 8.1705 16.8189 7.32122 16.4672C6.47194 16.1154 5.70026 15.5998 5.05025 14.9497C4.40024 14.2997 3.88463 13.5281 3.53284 12.6788C3.18106 11.8295 3 10.9193 3 10C3 8.14348 3.7375 6.36301 5.05025 5.05025C6.36301 3.7375 8.14348 3 10 3C11.8565 3 13.637 3.7375 14.9497 5.05025C16.2625 6.36301 17 8.14348 17 10Z" stroke="#3F3F46" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H5.01M12 12H12.01M19 12H19.01M6 12C6 12.2652 5.89464 12.5196 5.70711 12.7071C5.51957 12.8946 5.26522 13 5 13C4.73478 13 4.48043 12.8946 4.29289 12.7071C4.10536 12.5196 4 12.2652 4 12C4 11.7348 4.10536 11.4804 4.29289 11.2929C4.48043 11.1054 4.73478 11 5 11C5.26522 11 5.51957 11.1054 5.70711 11.2929C5.89464 11.4804 6 11.7348 6 12ZM13 12C13 12.2652 12.8946 12.5196 12.7071 12.7071C12.5196 12.8946 12.2652 13 12 13C11.7348 13 11.4804 12.8946 11.2929 12.7071C11.1054 12.5196 11 12.2652 11 12C11 11.7348 11.1054 11.4804 11.2929 11.2929C11.4804 11.1054 11.7348 11 12 11C12.2652 11 12.5196 11.1054 12.7071 11.2929C12.8946 11.4804 13 11.7348 13 12ZM20 12C20 12.2652 19.8946 12.5196 19.7071 12.7071C19.5196 12.8946 19.2652 13 19 13C18.7348 13 18.4804 12.8946 18.2929 12.7071C18.1054 12.5196 18 12.2652 18 12C18 11.7348 18.1054 11.4804 18.2929 11.2929C18.4804 11.1054 18.7348 11 19 11C19.2652 11 19.5196 11.1054 19.7071 11.2929C19.8946 11.4804 20 11.7348 20 12Z" stroke="#3F3F46" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <button onClick={handelAtuoRotation}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M4 4.00005V9.00005H4.582M4.582 9.00005C5.24585 7.35818 6.43568 5.98296 7.96503 5.08991C9.49438 4.19686 11.2768 3.83646 13.033 4.06519C14.7891 4.29392 16.4198 5.09884 17.6694 6.35383C18.919 7.60881 19.7168 9.24291 19.938 11M4.582 9.00005H9M20 20V15H19.419M19.419 15C18.7542 16.641 17.564 18.0151 16.0348 18.9073C14.5056 19.7996 12.7237 20.1596 10.9681 19.9309C9.21246 19.7023 7.5822 18.8979 6.33253 17.6438C5.08287 16.3896 4.28435 14.7565 4.062 13M19.419 15H15" stroke="#3F3F46" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <button onClick={toggleFullScreen}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M20 20H16M4 8V4V8ZM4 4H8H4ZM4 4L9 9L4 4ZM20 8V4V8ZM20 4H16H20ZM20 4L15 9L20 4ZM4 16V20V16ZM4 20H8H4ZM4 20L9 15L4 20ZM20 20L15 15L20 20ZM20 20V16V20Z" stroke="#3F3F46" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>



      </div>
    </>
  );
};

export default TestPage;
