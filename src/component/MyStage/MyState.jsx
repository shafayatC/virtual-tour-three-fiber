import { Canvas } from '@react-three/fiber';
import { Box, OrbitControls } from '@react-three/drei';
import { Physics, RigidBody } from '@react-three/rapier';
import React, { Suspense, useEffect, useState } from 'react';
import PlayerOne from './PlayerOne';

const MyState = () => {

    const [hovered, setHovered] = useState(false)

    useEffect(() => {
        document.body.style.cursor = hovered ? 'pointer' : 'auto'
    }, [hovered])

    return (
        <div className='h-screen'>
            <Canvas shadows camera={{ position: [0, 0, 20], fov: 75 }}>
                <color attach="background" args={['lightblue']} />
                <Suspense>
                    <Physics debug>
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[-10, 10, 0]} intensity={0.4} />
                        <OrbitControls />
                        {/* player setup  */}
                        <PlayerOne />

                        {/* stage */}
                        <RigidBody position={[0, -1, 0]} type='fixed'>
                            <Box
                                onPointerOver={() => setHovered(true)}
                                onPointerOut={() => setHovered(false)}
                                position={[0, 0, 0]}
                                args={[100, 1, 50]} >
                                <meshStandardMaterial color="springgreen" />
                            </Box>
                        </RigidBody>
                    </Physics>
                </Suspense>
            </Canvas>
        </div>
    );
};

export default MyState;