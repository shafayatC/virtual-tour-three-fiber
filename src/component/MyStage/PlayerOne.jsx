import { Box, Circle, Cone, CubicBezierLine, Cylinder, Dodecahedron, Extrude, Facemesh, Icosahedron, Lathe, Line, Octahedron, OrbitControls, Polyhedron, QuadraticBezierLine, Ring, RoundedBox, ScreenQuad, Shape, Sphere, Tetrahedron, Torus, TorusKnot, Tube, useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { BallCollider, CuboidCollider, RigidBody } from '@react-three/rapier';
import React, { useRef } from 'react';

const PlayerOne = () => {

    const jump = () => {
        playerRef.current.applyImpulse({ x: 0, y: 0.5, z: 0 });
    }
    const left = () => {
        playerRef.current.applyImpulse({ x: -0.5, y: 0, z: 0 });
    }
    const right = () => {
        playerRef.current.applyImpulse({ x: 0.5, y: 0, z: 0 });
    }
    const forward = () => {
        playerRef.current.applyImpulse({ x: 0, y: 0, z: -0.5 });
    }
    const back = () => {
        console.log("back")
        playerRef.current.applyImpulse({ x: 0, y: 0, z: 0.5 });
    }
    const playerRef = useRef();
    const jumpPressed = useKeyboardControls((s) => s.jump);
    const leftPressed = useKeyboardControls((s) => s.left);
    const rightPressed = useKeyboardControls((s) => s.right);
    const forwardPressed = useKeyboardControls((s) => s.forward);
    const backPressed = useKeyboardControls((s) => s.back);

    useFrame((state) => {
        // console.log(jumpPressed);
        console.log("backPressed", backPressed);
        if (jumpPressed) {
            // state.camera.position.y += 0.5;
            jump()
        }
        if (leftPressed) {
            left()
        }
        if (rightPressed) {
            right()
        }
        if (forwardPressed) {
            forward()
        }
        if (backPressed) {
            back()
        }
    })
    return (
        <>
            <RigidBody
                position={[0, 5, 15]}
                colliders={false}
                ref={playerRef}
                restitution={0}
            >
                {/* <BallCollider args={[1]} position={[0, 1, 0]}/>
                <Sphere position={[0, 1, 0]}>
                    <meshStandardMaterial color="blue" />
                </Sphere> */}
                <CuboidCollider args={[0.5, 0.5, 0.5]} />
                <Facemesh>
                    <meshStandardMaterial color="white" />
                </Facemesh>
            </RigidBody>

            <RigidBody position={[4, 10, 0]}>
                <Circle>
                    <meshStandardMaterial color="pink" />
                </Circle>
            </RigidBody>

            <RigidBody position={[2, 5, 0]}>
                <Cylinder>
                    <meshStandardMaterial color="green" />
                </Cylinder>
            </RigidBody>


            <RigidBody position={[5, 5, 3]}>
                <Cone>
                    <meshStandardMaterial color="red" />
                </Cone>
            </RigidBody>
            <RigidBody position={[-2, 5, 3]}>
                <Tube >
                    <meshStandardMaterial color="white" />
                </Tube>
            </RigidBody>

            <RigidBody position={[-4, 5, 0]}>
                <Torus >
                    <meshStandardMaterial color="white" />
                </Torus>
            </RigidBody>
            <RigidBody position={[-10, 5, 3]}>
                <TorusKnot>
                    <meshStandardMaterial color="yellow" />
                </TorusKnot>
            </RigidBody>

            <RigidBody position={[-14, 5, 3]}>
                <Ring>
                    <meshStandardMaterial color="white" />
                </Ring>
            </RigidBody>

            <RigidBody position={[8, 5, 3]}>
                <Tetrahedron>
                    <meshStandardMaterial color="blue" />
                </Tetrahedron>
            </RigidBody>


            <RigidBody position={[8, 5, 3]}>
                <Polyhedron>
                    <meshStandardMaterial color="blue" />
                </Polyhedron>
            </RigidBody>


            <RigidBody position={[10, 5, 3]}>
                <Icosahedron>
                    <meshStandardMaterial color="white" />
                </Icosahedron>
            </RigidBody>

            <RigidBody position={[12, 5, 3]}>
                <Octahedron>
                    <meshStandardMaterial color="white" />
                </Octahedron>
            </RigidBody>
            
            <RigidBody position={[14, 5, 3]}>
                <Dodecahedron>
                    <meshStandardMaterial color="#025c5c" />
                </Dodecahedron>
            </RigidBody>

            
            <RigidBody position={[16, 5, 3]}>
                <Extrude>
                    <meshStandardMaterial color="yellow" />
                </Extrude>
            </RigidBody>
            
            <RigidBody position={[-16, 5, 3]}>
                <Lathe>
                    <meshStandardMaterial color="yellow" />
                </Lathe>
            </RigidBody>
            
            <RigidBody position={[-18, 5, 3]}>
                <RoundedBox>
                    <meshStandardMaterial color="green" />
                </RoundedBox>
            </RigidBody>
            {/* 
            <RigidBody position={[0, 2, 0]}>
                <Box>
                    <meshStandardMaterial color="red" />
                </Box>
            </RigidBody> */}

        </>
    );
};

export default PlayerOne;