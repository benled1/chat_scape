"use client"
import * as THREE from 'three';
import { createRoot } from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import ChannelNode from './ChannelNode';

export default function Scene() {
  return (
    <div id="canvas-container">
        <Canvas>
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
        </Canvas>
    </div>
  )
}

