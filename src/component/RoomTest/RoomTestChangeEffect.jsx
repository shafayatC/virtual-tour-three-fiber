import * as THREE from 'three'
import { Suspense, useEffect, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Html, Preload, OrbitControls, Box, Ring, Circle } from '@react-three/drei'
import { Popconfirm } from 'antd'
import { MathUtils } from 'three/src/Three.js'
import { Bloom, DepthOfField, EffectComposer, Noise, Vignette } from '@react-three/postprocessing'
import { useSpring, animated } from '@react-spring/three'

const store = [
    { name: 'room two', color: 'lightblue', position: [30, -40, -60], url: '/Exam_Room_Low_Res.webp', link: 1 },
    { name: 'room two', color: 'lightblue', position: [15, 0, 0], url: '/2294472375_24a3b8ef46_o.jpg', link: 0 },
    // { name: 'room two', color: 'lightblue', position: [15, 0, 0], url: '/2294472375_24a3b8ef46_o.jpg', link: 0 },
    // { name: 'room two', color: 'lightblue', position: [15, 0, 0], url: '/1_G_Floor_NurseCounter.jpg', link: 0 },
    // { name: 'room three', color: 'lightblue', position: [15, 0, 0], url: '/shot-panoramic-composition-bedroom.jpg', link: 3 },
    // { name: 'outdoor one', color: 'lightblue', position: [15, 0, 0], url: '/updateimage (2).jpg', link: 4 },
    // { name: 'outdoor two', color: 'lightblue', position: [15, 0, 0], url: '/updateimage (1).jpg', link: 0 }
]

export function DomeTestEffect({ name, position, texture, onClick }) {

    const [hovered, setHovered] = useState(false);
    const [clicked, setClicked] = useState(false)
    const [prevTexture, setPrevTexture] = useState(texture);
    const [getOpactiy, setOpacity] = useState(1);
    const [switchImage, setSwitchImage] = useState(false);
    const [checkFirstRun, setCheckFirstRun] = useState(true);

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

    // useEffect(() => {
    //     alert(" id: " + swithcPostionP);
    //     if(!checkFirstRun){
    //         setSwitchImage(true);
    //         setTimeout(() => {
    //             setSwitchImage(false);
    //             setPrevTexture(texture);
    //         }, 800);
    //     }
    // }, [swithcPostionP])

    useEffect(() => {
        console.log("texture changed");
        console.log("prev texture : ", prevTexture);
        console.log("current texture : ", texture);
        // setPrevTexture(texture);
        if (!checkFirstRun) {
            setSwitchImage(true);
            setTimeout(() => {
                setSwitchImage(false);
                setPrevTexture(texture);
            }, 800);
        }
        setCheckFirstRun(false);

    }, [texture]);

    // useFrame(({ camera }) => {
    //     const targetOpacity = MathUtils.lerp(getOpactiy, 0, 0.3);
    //     setOpacity(targetOpacity);
    // })

    const [springs, api] = useSpring(
        () => ({
            scale: 1,
            position: [0, 0],
            opacity: 1,
            color: '#b70206',
            config: key => {
                switch (key) {
                    case 'scale':
                        return {
                            mass: 4,
                            friction: 10,
                        }
                    case 'position':
                        return { mass: 4, friction: 220 }
                    case 'opacity':
                        return { mass: 4, friction: 220 }
                    default:
                        return {}
                }
            },
        }),
        []
    )
    const handlePointerEnter = () => {
        api.start({
            scale: 1.5,
            opacity: 0,
        })
    }

    const handlePointerLeave = () => {
        api.start({
            scale: 1,
            opacity: 1,
        })
    }

    useFrame(() => {
        // Update the animation properties continuously
        api.start({
            scale: 1 + Math.sin(Date.now() * 0.005) * 0.1, // Pulsating effect
            //   opacity: 0.5 + Math.sin(Date.now() * 0.005) * 0.5, // Opacity pulsing
            //   color: `rgb(${Math.abs(Math.sin(Date.now() * 0.001) * 255)}, 109, 109)`, // Changing color effect
        });
    });

    return (
        <>
            <group>

                <mesh >
                    <sphereGeometry rotateY={-180} args={[500, 40, 60]} />
                    <meshBasicMaterial
                        transparent
                        // opacity={getOpactiy}
                        rotation={[-Math.PI / 2, 0, 0]}
                        map={prevTexture}
                        side={THREE.BackSide}
                    />
                </mesh>
                {
                    switchImage &&
                    <EffectComposer>
                        <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={8} height={480} />
                        <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
                        <Noise opacity={0.02} />
                        <Vignette eskil={false} offset={0.1} darkness={1.1} />
                    </EffectComposer>
                }

                <mesh position={position}>
                    {/* <sphereGeometry args={[1.25, 32, 32]} />
                    <meshBasicMaterial color="white" /> */}
                    <Html center>

                        <span class="cursor-pointer relative flex items-center justify-center size-6" onClick={onClick}>
                            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF0062] opacity-75"></span>
                            <span class="relative inline-flex size-4 rounded-full bg-[#FF0062]"></span>
                        </span>
                        {/* <button className='bg-red-500' onClick={onClick}>{name} hello</button>
                        <div style={{ color: 'white', background: 'black', padding: '5px', position: 'fixed', top: '0', left: '0' }}>UI Element
                        </div> */}
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




                <group
                    onPointerEnter={onMouseEnterFunc}
                    onPointerLeave={onMouseExitFunc}
                    onPointerDown={onClick}
                    //  scale={[0.5, 0.5, 0.5]} 
                    rotation={[-Math.PI / 2, 0, 0]}
                    position={[0, 0, 2.5]}>

                    <animated.mesh
                        onPointerEnter={handlePointerEnter}
                        onPointerLeave={handlePointerLeave}
                        scale={springs.scale}
                    // material-opacity={springs.opacity} // Apply opacity at the mesh level
                    >
                        <sphereGeometry args={[0.1, 32, 32]} />
                        <animated.meshBasicMaterial
                            color={springs.color}
                            transparent={true}
                        // opacity={springs.opacity}
                        />
                    </animated.mesh>

                </group>


            </group>
        </>
    )
}


export function Portals_Test_Effect({ swithcPostion }) {
    const [getSwitchPosition, setSwitchPosition] = useState(0);
    const [which, set] = useState(0)
    const { link, ...props } = store[which]
    const maps = useLoader(THREE.TextureLoader, store.map((entry) => entry.url)) // prettier-ignore

    useEffect(() => {
        set(swithcPostion)
    }, [swithcPostion])

    return <DomeTestEffect
        swithcPostionP={swithcPostion}
        onClick={() => set(link)} {...props} texture={maps[which]} />
}
