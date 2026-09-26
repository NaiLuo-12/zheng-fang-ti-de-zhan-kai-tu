import { useState } from 'react';
import { useAnimation } from './contexts/AnimationContext.js';
import R3FCanvas from './components/R3FCanvas.js';
import { NetSelector, BaseSelector, ModeSelector, PlayerSlider } from './components/controlsUI';
import { Divider, Button, Typography } from 'antd';

function AppTitle() {
    return (
        <div className='app-title'>
            <img 
                src={`${process.env.PUBLIC_URL}/cube.svg`}
                alt=''
                width='32'
                height='32'
            />
            <Typography.Title
                level={3}
                style={{ margin: 0 }}
            >
                正方体展开图模拟器
            </Typography.Title>
        </div>
    );
}

function ResetCameraButton() {
    const { camCtrlRef } = useAnimation();
    return (
        <Button 
            type='primary'
            onClick={() => camCtrlRef.current?.resetWithAnimation?.()}
            block
        >
            重置视角
        </Button>
    );
}

function App() {
    const [settingsOpen, setSettingsOpen] = useState(false);

    return (
        <main className='app-shell'>
            <header className='app-header'><AppTitle /></header>
            <aside className={`app-controls${settingsOpen ? ' is-open' : ''}`} aria-label='正方体控制面板' id='cube-settings'>
                <div className='mobile-settings-heading'>
                    <strong>展开图设置</strong>
                    <Button type='text' onClick={() => setSettingsOpen(false)} aria-label='关闭设置'>关闭</Button>
                </div>
                <NetSelector />
                <BaseSelector />
                <ModeSelector />
            </aside>
            <section className='app-viewer' aria-label='正方体三维视图'>
                <R3FCanvas />
            </section>
            <section className='app-playback' aria-label='播放控制'>
                <Button className='mobile-settings-button' onClick={() => setSettingsOpen(true)} aria-controls='cube-settings' aria-expanded={settingsOpen} block>选择展开图、基准面与模式</Button>
                <PlayerSlider />
                <Divider />
                <ResetCameraButton />
            </section>
        </main>
    );
}

export default App;
