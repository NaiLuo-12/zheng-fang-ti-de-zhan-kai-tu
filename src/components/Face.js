import { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';
import * as ENGINE from '../cubenets/cubeNetEngine.js';

export const HALF_UNIT = 0.5;

const FACE_COLOR = {
    down:  0xE53935,
    top:   0x1E88E5,
    front: 0xFDD835,
    back:  0x43A047,
    left:  0x8E24AA,
    right: 0xFB8C00,
};

const FACE_LABEL = {
    down: '下', top: '上', front: '前',
    back: '后', left: '左', right: '右',
};

function drawFaceLabel(context, text) {
    context.clearRect(0, 0, 256, 256);
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.lineJoin = 'round';
    context.strokeStyle = 'rgba(0, 0, 0, 0.7)';
    context.fillStyle = '#fff';

    context.font = "bold 180px 'Microsoft YaHei', 'PingFang SC', 'Noto Sans CJK SC', sans-serif";
    context.lineWidth = 8;
    context.strokeText(text, 128, 135);
    context.fillText(text, 128, 135);
}

const EDGE_POSITION = {
    xp: [+HALF_UNIT, 0, 0],
    xn: [-HALF_UNIT, 0, 0],
    zp: [0, 0, +HALF_UNIT],
    zn: [0, 0, -HALF_UNIT],
};

/** Z-axis rotation (in radians) to orient face label text. */
const RZ = {
    down:  0,
    top:   0,
    front: 0,
    back:  Math.PI,
    left:  Math.PI * 0.5,
    right: -Math.PI * 0.5,
};


export function Face({ label, faceRef }) {
    const groupRef = useRef();
    const skinRef = useRef();
    const labelRef = useRef();
    const xp = useRef();
    const xn = useRef();
    const zp = useRef();
    const zn = useRef();

    const labelTexture = useMemo(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const context = canvas.getContext('2d');
        drawFaceLabel(context, FACE_LABEL[label]);
        const texture = new THREE.CanvasTexture(canvas);
        texture.colorSpace = THREE.SRGBColorSpace;
        return texture;
    }, [label]);

    const markerTexture = useMemo(() => {
        if (label !== 'down') return null;
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const context = canvas.getContext('2d');
        drawFaceLabel(context, '基');
        const texture = new THREE.CanvasTexture(canvas);
        texture.colorSpace = THREE.SRGBColorSpace;
        return texture;
    }, [label]);

    useEffect(() => () => labelTexture.dispose(), [labelTexture]);
    useEffect(() => () => markerTexture?.dispose(), [markerTexture]);

    // Expose refs
    useEffect(() => {
        faceRef.ref = groupRef;
        faceRef.skin = skinRef;
        faceRef.labelRef = labelRef;
        faceRef.xp = xp;
        faceRef.xn = xn;
        faceRef.zp = zp;
        faceRef.zn = zn;

        const edgeList = [xp, zn, xn, zp];
        const neibFace = ENGINE.FACE_EDGE_DISC[label];

        for (let i = 0; i < 4; i++) {
            faceRef[neibFace[i]] = edgeList[i];
        }
    }, [faceRef, label]);

    return (
        <group ref={groupRef}>
            <group ref={skinRef} rotation={[Math.PI * 0.5, 0, 0]}>
                <mesh>
                    <planeGeometry args={[HALF_UNIT * 2, HALF_UNIT * 2]} />
                    <meshStandardMaterial color={FACE_COLOR[label]} metalness={0.5} roughness={0.5} side={THREE.DoubleSide} />
                </mesh>
                <group ref={labelRef} rotation={[0, 0, RZ[label]]}>
                    <mesh position={[0, 0, 0.012]}>
                        <planeGeometry args={[0.55, 0.55]} />
                        <meshBasicMaterial map={labelTexture} transparent side={THREE.DoubleSide} depthWrite={false} />
                    </mesh>
                </group>
                {markerTexture && (
                    <mesh position={[0, 0, -0.012]} rotation={[0, Math.PI, 0]}>
                        <planeGeometry args={[0.55, 0.55]} />
                        <meshBasicMaterial map={markerTexture} transparent side={THREE.FrontSide} depthWrite={false} />
                    </mesh>
                )}
            </group>
            <group ref={xp} position={EDGE_POSITION.xp} />
            <group ref={xn} position={EDGE_POSITION.xn} />
            <group ref={zp} position={EDGE_POSITION.zp} />
            <group ref={zn} position={EDGE_POSITION.zn} />
        </group>
    );
}
