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

export default function ChannelNode(props: ChannelNodeProps) {
    return (
        <mesh position={[props.position.x, props.position.y, props.position.z]}>
            <sphereGeometry args={[props.sphereGeometry.radius,props.sphereGeometry.widthSegments,props.sphereGeometry.heightSegments]}></sphereGeometry>
            <meshStandardMaterial color="hotpink" transparent />
        </mesh>
    );
};