import * as THREE from 'three'
import { Suspense, useEffect, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Html, Preload, OrbitControls, Box, Ring, Circle } from '@react-three/drei'
import { Popconfirm } from 'antd'
import { MathUtils } from 'three/src/Three.js'

const store = [
    { name: 'room two', color: 'lightblue', position: [30, -40, -60], url: '/Exam_Room_Low_Res.webp', link: 1 },
    { name: 'room two', color: 'lightblue', position: [15, 0, 0], url: '/2294472375_24a3b8ef46_o.jpg', link: 0 },
    // { name: 'room two', color: 'lightblue', position: [15, 0, 0], url: '/2294472375_24a3b8ef46_o.jpg', link: 0 },
    // { name: 'room two', color: 'lightblue', position: [15, 0, 0], url: '/1_G_Floor_NurseCounter.jpg', link: 0 },
    // { name: 'room three', color: 'lightblue', position: [15, 0, 0], url: '/shot-panoramic-composition-bedroom.jpg', link: 3 },
    // { name: 'outdoor one', color: 'lightblue', position: [15, 0, 0], url: '/updateimage (2).jpg', link: 4 },
    // { name: 'outdoor two', color: 'lightblue', position: [15, 0, 0], url: '/updateimage (1).jpg', link: 0 }
]

export function DomeTest({ name, position, texture, onClick, swithcPostionP}) {

    const [hovered, setHovered] = useState(false);
    const [clicked, setClicked] = useState(false)

    // Flip the texture if needed
    texture.center.set(0.5, 0.5); // Center the texture for transformations
    texture.rotation = Math.PI;  // Horizontal flip
    texture.flipY = false;       // Vertical flip
    texture.needsUpdate = true;  // Ensure the changes take effect

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

    useEffect(() => {
        // alert(" id: " + swithcPostionP);
    }, [swithcPostionP, ])

    return (
        <>
            <group>
                <mesh >
                    <sphereGeometry rotateY={-180} args={[500, 40, 60]} />
                    <meshBasicMaterial rotation={[-Math.PI / 2, 0, 0]} map={texture} side={THREE.BackSide} />
                </mesh>
                <mesh position={position}>
                    <sphereGeometry args={[1.25, 32, 32]} />
                    <meshBasicMaterial color="white" />
                    <Html center>
                        <button onClick={onClick}>{name}</button>
                        <div style={{ color: 'white', background: 'black', padding: '5px', position: 'fixed', top: '0', left: '0' }}>UI Element
                        </div>
                    </Html>
                </mesh>
                <group
                    onPointerEnter={onMouseEnterFunc}
                    onPointerLeave={onMouseExitFunc}
                    onPointerDown={onClick}
                    //  scale={[0.5, 0.5, 0.5]} 
                    rotation={[-Math.PI / 2, 0, 0]}
                    position={[0, -6, 2.5]}>
                    <mesh >
                        <ringGeometry />
                        <meshBasicMaterial color="white" transparent={true} opacity={hovered ? 1 : 0.5} />
                    </mesh>
                    <mesh >
                        <circleGeometry />
                        <meshBasicMaterial transparent={true} opacity={0} />
                    </mesh>
                </group>

            </group>
        </>
    )
}


export function Portals_Test({ swithcPostion }) {
    const [getSwitchPosition, setSwitchPosition] = useState(0);
    const [which, set] = useState(0)
    const { link, ...props } = store[which]
    const maps = useLoader(THREE.TextureLoader, store.map((entry) => entry.url)) // prettier-ignore

    useEffect(() => {
    }, [swithcPostion])



    return <DomeTest
        swithcPostionP={swithcPostion}
        onClick={() => set(link)} {...props} texture={maps[which]} />
}
