import { useState } from 'react';
import { useAnimation } from '../../contexts/AnimationContext';
import { Radio, Typography } from 'antd';


const { Title } = Typography;

function ModeSelector() {
    const { resetProgress, buildConfig } = useAnimation();
    const [animationMode, setAnimationMode] = useState('rootFirst');

    return (<div>
        <Title level={5}>动画模式</Title>
        <Radio.Group 
            value={animationMode}
            onChange={(e) => {
                setAnimationMode(e.target.value);

                resetProgress();
                buildConfig.current.animationMode = e.target.value;
            }}
            style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}
        >
            <Radio value='rootFirst'>从基准面开始</Radio>
            <Radio value='leaveFirst'>从末端面开始</Radio>
            <Radio value='compact'>同步折叠</Radio>
        </Radio.Group>
    </div>);
}

export default ModeSelector;
