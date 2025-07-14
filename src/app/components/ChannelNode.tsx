import { useRef } from 'react';
import {Vector3, TextureLoader, SRGBColorSpace, Mesh} from 'three';
import { useLoader, useThree, useFrame } from '@react-three/fiber';
import { Decal } from '@react-three/drei';

export interface SphereGeometry {
    radius: number
    widthSegments: number
    heightSegments: number
}

export interface ChannelNodeProps {
    channelName: string
    sphereGeometry: SphereGeometry
    position: Vector3
    onFocus: () => void; // when the user click the node when not in focus (should target the camera)
    onSelect: () => void; // when the user clicks the node after in focus (should open info panel)
}


// NOTE: each channel node has it's own glowing light. The intensity of this light scales with the size of the channel.
// NOTE: each channel node has it's own size. The size of the node scales with the size of the channel.
// NOTE: each channel node has it's own material which is the profile picture of the channel shrink wrapped around the sphere
    // The profile photo should always be facing the camera.
export default function ChannelNode(props: ChannelNodeProps) {
    const texture = useLoader(TextureLoader, '/profile_images/ludwig.png');
    texture.colorSpace = SRGBColorSpace

    return (
        <mesh position={[props.position.x, props.position.y, props.position.z]}>
            <sphereGeometry args={[props.sphereGeometry.radius,props.sphereGeometry.widthSegments,props.sphereGeometry.heightSegments]}></sphereGeometry>
            <meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.05} />
            <Decal
                // debug
                position={[0,0,props.sphereGeometry.radius]}
                rotation={[0,0,0]}
                scale={2}
            >
                <meshBasicMaterial 
                    map={texture}
                    polygonOffset
                    polygonOffsetFactor={-1}
                ></meshBasicMaterial>
            </Decal>

        </mesh>
    );

};