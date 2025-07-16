"use client"
import { Suspense, useEffect } from 'react';
import * as THREE from 'three';
import { createRoot } from 'react-dom/client';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Channel } from '../types';
import ChannelNode from './ChannelNode';

export interface SceneProps {
    channels: Channel[]
};


export default function Scene(props: SceneProps) {
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
            />
            <color attach="background" args={['black']}></color>
            <Suspense>
                <ambientLight></ambientLight>
                {props.channels.map((currChannel: Channel) => (
                    currChannel.metadata.data.length !== 0 &&
                    <ChannelNode
                        key={currChannel._id}
                        channelData={currChannel}
                        sphereGeometry={{
                            radius: 1,
                            widthSegments: 16,
                            heightSegments: 16,
                        }}
                        position={new THREE.Vector3(Math.floor(Math.random()*6),Math.floor(Math.random()*100),Math.floor(Math.random()*6))}
                        onFocus={()=>{}}
                        onSelect={()=>{}}
                    ></ChannelNode> 
                ))}
            </Suspense>
        </Canvas>
    </div>
    )
}

