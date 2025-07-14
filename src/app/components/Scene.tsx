"use client"
import { Suspense } from 'react';
import * as THREE from 'three';
import { createRoot } from 'react-dom/client';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import ChannelNode from './ChannelNode';

export default function Scene() {
  return (
    <div id="canvas-container">
        <Canvas
            style={{
                position: 'fixed',   // so it sits on top
                top: 0,
                left: 0,
                width: '100vw',      // full viewport width
                height: '100vh',     // full viewport height
                overflow: 'hidden',  // just in case
            }}
        >
            {/* Optional: set up your camera */}
            <PerspectiveCamera makeDefault position={[0, 0, 5]} />

            {/* Enables click–drag, scroll zoom, and right-drag panning */}
            <OrbitControls 
                enablePan={true}      // allow panning
                enableZoom={true}     // allow zooming
                enableRotate={true}   // allow rotation
                // minDistance={2}      // limit how close you can zoom
                // maxDistance={10}     // limit how far you can zoom out
            />
            <color attach="background" args={['black']}></color>
            <Suspense>
                <ambientLight></ambientLight>
                <ChannelNode
                    channelName='test'
                    sphereGeometry={{
                        radius: 1,
                        widthSegments: 16,
                        heightSegments: 16,
                    }}
                    position={new THREE.Vector3(1,1,1)}
                    onFocus={()=>{}}
                    onSelect={()=>{}}
                ></ChannelNode>
                <ChannelNode
                    channelName='test'
                    sphereGeometry={{
                        radius: 1,
                        widthSegments: 16,
                        heightSegments: 16,
                    }}
                    position={new THREE.Vector3(4,4,4)}
                    onFocus={()=>{}}
                    onSelect={()=>{}}
                ></ChannelNode>
            </Suspense>
        </Canvas>
    </div>
  )
}

