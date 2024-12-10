import { lazy, Suspense, useMemo, useState } from 'react'
import './App.css'
// import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Test from './component/Test/Test'
import { KeyboardControls, OrbitControls, Preload } from '@react-three/drei'
import { Portals } from './component/RoomTest/RoomTest'
import { Office3D } from './component/Office/Office'
import MyState from './component/MyStage/MyState'
import { Portals_Test } from './component/RoomTest/RoomTestAnimation'
import Testgui from './component/guicontroll/testgui'
import VirtualTour from './pages/VirtualTour'
import TestTwo from './component/Test/TestTwo'
import TestPage from './pages/TestPage'

export const Controls = {
  forward: 'forward',
  back: 'back',
  left: 'left',
  right: 'right',
  jump: 'jump',
}
const MarkdownPreview = lazy(() => import('./pages/TestPage'));

function App() {

  const map = useMemo(() => [
    { name: Controls.forward, keys: ['ArrowUp', 'KeyW'] },
    { name: Controls.back, keys: ['ArrowDown', 'KeyS'] },
    { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
    { name: Controls.right, keys: ['ArrowRight', 'KeyD'] },
    { name: Controls.jump, keys: ['Space'] },
  ], [])


  return (
    <>
      {/* <h1 className='text-lg text-red-800 font-bold'>Helo world!!</h1> */}
      {/* <div id="canvas-container">
      <Canvas>
        <ambientLight intensity={0.1} />
        <directionalLight color={"red"} position={[0, 0, 1]} />
        <Test/>
        <OrbitControls/>
      </Canvas>
    </div> */}
      {/* <div className='mx-auto container'> */}
      {/* <div className='w-[1000px] h-[1200px]'>
          <Canvas>
            <ambientLight intensity={1} />
            <directionalLight position={[0, 3, 1]} />
            <OrbitControls enableZoom={false} enablePan={false} enableDamping dampingFactor={0.2} />
            <Office3D scale={[1, 1, 1]}
              position={[0, 0, 0]}
              rotation={[0, 0, 0]}
            />
          </Canvas>

        </div> */}

      {/* </div> */}

      {/* <Testgui /> */}
        {/* <TestTwo/> */}
        {/* <VirtualTour/> */}
        {/* <TestPage/> */}
        <Suspense fallback={<p>My Testing load...</p>}>
        <MarkdownPreview/>
        </Suspense>

      {/* 
      <KeyboardControls map={map}>
        <MyState />
      </KeyboardControls> */}

    </>

  )
}

export default App;
// createRoot(document.getElementById('root')).render(<App />)
