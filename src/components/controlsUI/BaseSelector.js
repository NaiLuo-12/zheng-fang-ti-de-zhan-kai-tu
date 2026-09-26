import { useState } from 'react';
import { useAnimation } from '../../contexts/AnimationContext';
import { Radio, Typography } from 'antd';

const { Title } = Typography;


function BaseSelector() {
    const { signal, resetProgress, buildConfig } = useAnimation();
    const [selectedBaseId, setSelectedBaseId] = useState(2);

    return (<div>
        <Title level={5}>选择基准面</Title>
        <Radio.Group
            className='base-selector'
            aria-label='选择基准面'
            value={selectedBaseId}
            onChange={(event) => {
                const value = event.target.value;
                setSelectedBaseId(value);
                resetProgress();
                buildConfig.current.base = value;
                signal.current++;
            }}
        >
            {[0, 1, 2, 3, 4, 5].map((index) => (
                <Radio.Button key={index} value={index}>{index + 1}</Radio.Button>
            ))}
        </Radio.Group>
    </div>);
}

export default BaseSelector;
