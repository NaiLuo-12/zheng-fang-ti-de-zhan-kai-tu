import { Face } from './Face';
import { useAnimation } from '../contexts/AnimationContext.js';

const FACE_ORDER = ['down', 'top', 'front', 'back', 'left', 'right'];

function FoldableCube() {
    const { facesRef } = useAnimation();
    return (
        <group>
            {FACE_ORDER.map(label => (
                <Face key={label} label={label} faceRef={facesRef.current[label]} />
            ))}
        </group>
    );
}

export default FoldableCube;
