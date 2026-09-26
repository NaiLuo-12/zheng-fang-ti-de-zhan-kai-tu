import { useState } from 'react';
import { useAnimation } from '../../contexts/AnimationContext.js';
import { CUBE_NETS } from '../../cubenets/CubeNet.js';
import { Select, Typography } from 'antd';

const { Title } = Typography;


function NetSelector() {
    const { signal, resetProgress, buildConfig } = useAnimation();
    const [selectedNetId, setSelectedNetId] = useState(4);

    return (<div>
        <Title level={5}>选择展开图</Title>
        <Select
            style={{ width: '100%', marginBottom: 20 }}
            placeholder='选择展开图类型'
            value={selectedNetId}
            onChange={(value) => {
                setSelectedNetId(value);
                resetProgress();
                buildConfig.current.net = value;
                signal.current++;
            }}
        >
            {CUBE_NETS.map((net) => (
                <Select.Option key={net.netId} value={net.netId}>
                    {net.netName}
                </Select.Option>
            ))}
        </Select>
    </div>);
}

export default NetSelector;
