import * as THREE from 'three'
import { Suspense, useState } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { Html, Preload, OrbitControls, Box, Ring, Circle } from '@react-three/drei'
import { Popconfirm } from 'antd'

const store = [
    // { name: 'room one', color: 'lightpink', position: [10, 0, -15], url: '/2294472375_24a3b8ef46_o.jpg', link: 1 },
    { name: 'room two', color: 'lightblue', position: [15, 0, 0], url: '/Photosphere1.jpg', link: 1 },
    { name: 'room two', color: 'lightblue', position: [30,-40,-60], url: '/Photosphere1.jpg', link: 0 },
    { name: 'room three', color: 'lightblue', position: [15, 0, 0], url: '/shot-panoramic-composition-bedroom.jpg', link: 3 },
    { name: 'outdoor one', color: 'lightblue', position: [15, 0, 0], url: '/updateimage (2).jpg', link: 4 },
    { name: 'outdoor two', color: 'lightblue', position: [15, 0, 0], url: '/updateimage (1).jpg', link: 0 }
    // ...
]

export function Dome({ name, position, texture, onClick }) {

    const [hovered, setHovered] = useState(false); 

    const onMouseEnterFunc = (e) => {
        document.body.style.cursor = 'pointer';
        setHovered(true);
        console.log(e)
    }

    const onMouseExitFunc = (e) => {
        document.body.style.cursor = 'auto';
        setHovered(false);
        console.log(e)
    }

    return (
        <group>
            <mesh >
                <sphereGeometry  args={[500, 40, 60]} />
                <meshBasicMaterial map={texture} side={THREE.BackSide} />
            </mesh>
            <mesh position={position}>
                <sphereGeometry args={[1.25, 32, 32]} />
                <meshBasicMaterial color="white" />
                <Html center>                  
                    <button onClick={onClick}>{name}</button>
                </Html>
            </mesh>
            <group 
            onPointerEnter={onMouseEnterFunc}
            onPointerLeave={onMouseExitFunc}
            onPointerDown={onClick}
            //  scale={[0.5, 0.5, 0.5]} 
             rotation={[-Math.PI / 2, 0, 0]} 
             position={[0,-6,2.5]}>
            <mesh >
                <ringGeometry />
                <meshBasicMaterial color="white" transparent={true} opacity={hovered ? 1 : 0.5} />
            </mesh>
            <mesh >
                <circleGeometry/>
                <meshBasicMaterial transparent={true} opacity={0} />
            </mesh>
            </group>

        </group>
    )
}

export function Portals() {
    const [which, set] = useState(0)
    const { link, ...props } = store[which]
    const maps = useLoader(THREE.TextureLoader, store.map((entry) => entry.url)) // prettier-ignore
    return <Dome onClick={() => set(link)} {...props} texture={maps[which]} />
}

// export default function RoomTest() {
//   return (
//     <Canvas frameloop="demand" camera={{ position: [0, 0, 0.1] }}>
//       <OrbitControls enableZoom={false} enablePan={false} enableDamping dampingFactor={0.2} autoRotate={false} rotateSpeed={-0.5} />
//       <Suspense fallback={null}>
//         <Preload all />
//         <Portals />
//       </Suspense>
//     </Canvas>
//   )
// }
