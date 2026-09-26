import { useState } from 'react';
import { useAnimation } from '../../contexts/AnimationContext';
import { Checkbox, Typography } from 'antd';

const { Title } = Typography;

function PlayerSlider() {
    const { 
        isAutoPlaying, showFaceLabels, faceLabelsTask, sliderRef, progressRef
    } = useAnimation();
    const [autoPlay, setAutoPlay] = useState(false);
    const [showLabel, setShowLabel] = useState(true);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Title level={5} style={{ marginBottom: '5px' }}>播放控制</Title>
            {/** check box: show face labels */}
            <Checkbox
                checked={showLabel}
                onChange={(e) => {
                    setShowLabel(e.target.checked);
                    showFaceLabels.current = e.target.checked;
                    faceLabelsTask.current = false;
                }}
                style={{ marginTop: '10px', marginBottom: '5px' }}
            >
                显示面标签
            </Checkbox>

            {/** check box: auto play */}
            <Checkbox
                checked={autoPlay}
                onChange={(e) => {
                    setAutoPlay(e.target.checked);
                    isAutoPlaying.current = e.target.checked;
                }}
                style={{ marginTop: '10px', marginBottom: '20px' }}
            >
                自动播放
            </Checkbox>

            {/** raw JS slider: process control */}
            <input
                ref={sliderRef}
                type='range'
                aria-label='折叠进度'
                min='0'
                max='100'
                defaultValue={100}
                step='1'
                disabled={autoPlay}
                onInput={(event) => { progressRef.current = Number(event.currentTarget.value); }}
                style={{ width: '100%', marginBottom: '8px' }}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                <span>展开图</span>
                <span>正方体</span>
            </div>
        </div>
    );
}

export default PlayerSlider;
