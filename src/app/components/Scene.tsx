"use client"
import { Suspense, useEffect } from 'react';
import * as THREE from 'three';
import { createRoot } from 'react-dom/client';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import ChannelNode from './ChannelNode';

export default function Scene() {

    useEffect(() => {
        const fetchChannels = async () => {
            const response = await fetch("http://localhost:8000/channels");
            const data = await response.json();
            console.log(`Fetched data  = ${data}`);
        }
        fetchChannels();
    }, []);
    return (
    <div id="canvas-container">
        <Canvas
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                overflow: 'hidden',
            }}
        >
            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
            <OrbitControls 
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                // minDistance={2}
                // maxDistance={10}
            />
            <color attach="background" args={['black']}></color>
            <Suspense>
                <ambientLight></ambientLight>
                <ChannelNode
                    channelName=''
                    sphereGeometry={{
                        radius: 1,
                        widthSegments: 16,
                        heightSegments: 16,
                    }}
                    position={new THREE.Vector3(1,1,1)}
                    onFocus={()=>{}}
                    onSelect={()=>{}}
                ></ChannelNode>
            </Suspense>
        </Canvas>
    </div>
    )
}

