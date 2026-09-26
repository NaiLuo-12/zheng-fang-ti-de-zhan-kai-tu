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
    return (
        <main className='app-shell'>
            <header className='app-header'><AppTitle /></header>
            <aside className='app-controls' aria-label='正方体控制面板'>
                <NetSelector />
                <BaseSelector />
                <ModeSelector />
                <Divider />
                <PlayerSlider />
                <Divider />
                <ResetCameraButton />
            </aside>
            <section className='app-viewer' aria-label='正方体三维视图'>
                <R3FCanvas />
            </section>
        </main>
    );
}

export default App;
