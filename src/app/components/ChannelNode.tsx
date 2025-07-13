import * as THREE from 'three';

export interface SphereGeometry {
    radius: number
    widthSegments: number
    heightSegments: number
}

export interface ChannelNodeProps {
    channelName: string
    sphereGeometry: SphereGeometry
    position: THREE.Vector3
    onFocus: () => void; // when the user click the node when not in focus (should target the camera)
    onSelect: () => void; // when the user clicks the node after in focus (should open info panel)
}


// NOTE: each channel node has it's own glowing light. The intensity of this light scales with the size of the channel.
// NOTE: each channel node has it's own size. The size of the node scales with the size of the channel.
// NOTE: each channel node has it's own material which is the profile picture of the channel shrink wrapped around the sphere
    // The profile photo should always be facing the camera.
export default function ChannelNode(props: ChannelNodeProps) {
    return (
        
        <mesh position={[props.position.x, props.position.y, props.position.z]}>
            <sphereGeometry args={[props.sphereGeometry.radius,props.sphereGeometry.widthSegments,props.sphereGeometry.heightSegments]}></sphereGeometry>
            <meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.3} />
        </mesh>
    );
};