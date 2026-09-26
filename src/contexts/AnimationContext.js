import React, { createContext, useContext, useRef } from 'react';

const AnimationContext = createContext();

export const useAnimation = () => useContext(AnimationContext);

export const AnimationProvider = ({ children }) => {
    // UI controls
    const isAutoPlaying = useRef(false);
    const progressRef = useRef(100);
    const camCtrlRef = useRef(null);
    const sliderRef = useRef(null);
    const showFaceLabels = useRef(true);
    const faceLabelsTask = useRef(true);

    // Hierarchy parameters
    const meshRefReadyCheck = useRef(false);
    const signal = useRef(1);
    const guideBook = useRef(null);
    const buildConfig = useRef({
        net: 4,
        base: 2,
        animationMode: 'rootFirst',
    });

    const resetProgress = () => {
        progressRef.current = 0;
        if (sliderRef.current) sliderRef.current.value = 0;
    };

    // Meshes
    const facesRef = useRef({
        down: {}, top: {}, front: {}, back: {}, left: {}, right: {}
    });

    return (
        <AnimationContext.Provider
            value={{
                isAutoPlaying, camCtrlRef, 
                showFaceLabels, faceLabelsTask,
                sliderRef, meshRefReadyCheck, progressRef, resetProgress,
                signal, facesRef, guideBook, buildConfig,
            }}
        >
            {children}
        </AnimationContext.Provider>
    );
};
