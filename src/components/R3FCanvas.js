import { useRef, useEffect } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { easing } from 'maath';
import { useAnimation } from '../contexts/AnimationContext';
import AnimationDriver from './AnimationDriver';


const CAMERA_DEFAULT_POS = [1.5, 4, 4.5];

function CamControls() {
    const { camera, gl } = useThree();
    const { camCtrlRef } = useAnimation();
    const isAnimating = useRef(false);
    const targetPosition = useRef(new THREE.Vector3(...CAMERA_DEFAULT_POS));
    const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

    useEffect(() => {
        const controls = camCtrlRef.current;
        if (!controls) return;

        camera.position.copy(targetPosition.current);
        camera.lookAt(targetLookAt.current);
        controls.target.copy(targetLookAt.current);
        controls.update();
        controls.saveState();

        controls.resetWithAnimation = () => {
            isAnimating.current = true;
        };
    }, [camera, camCtrlRef]);

    useFrame((_, delta) => {
        const controls = camCtrlRef.current;
        if (!controls || !isAnimating.current) return;
    
        // Smoothly update camera.position and controls.target
        easing.damp3(camera.position, targetPosition.current, 0.3, delta);
        easing.damp3(controls.target, targetLookAt.current, 0.3, delta);
    
        controls.update();
    
        // Stop animating when both position and target are "close enough"
        if (
            camera.position.distanceTo(targetPosition.current) < 0.01 &&
            controls.target.distanceTo(targetLookAt.current) < 0.01
        ) {
            camera.position.copy(targetPosition.current);
            controls.target.copy(targetLookAt.current);
            controls.update(); // ensure OrbitControls knows

            isAnimating.current = false;
            controls.saveState();
        }
    });
    
    return (
        <OrbitControls
            ref={camCtrlRef}
            args={[camera, gl.domElement]}
            enableDamping
            dampingFactor={0.1}
            enablePan={false}
            minDistance={2}
            maxDistance={15}
        />
    );
}

function R3FCanvas() {
    const cameraProps = { position: CAMERA_DEFAULT_POS, fov: 60 };
    
    return (
        <Canvas dpr={[1, 1.5]} camera={cameraProps}>
            <color attach='background' args={['#17212d']} />
            <ambientLight intensity={1.4} />
            <directionalLight position={[3, 5, 4]} intensity={2} />
            <directionalLight position={[-4, 2, -3]} intensity={1} />
            <CamControls />
            <AnimationDriver />
        </Canvas>
    );
}

export default R3FCanvas;
