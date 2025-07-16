"use client"
import { Coordinates } from '../types';
import { Channel } from '../types';
import { useRef, useEffect, useState } from 'react';
import {Vector3, TextureLoader, SRGBColorSpace, Mesh} from 'three';
import { useLoader, useFrame, useThree } from '@react-three/fiber'
import { Decal } from '@react-three/drei';
import { mx_bilerp_0 } from 'three/src/nodes/materialx/lib/mx_noise.js';

export interface SphereGeometry {
    radius: number
    widthSegments: number
    heightSegments: number
}

export interface ChannelNodeProps {
    sphereGeometry: SphereGeometry
    position: Vector3
    onFocus: () => void; // when the user click the node when not in focus (should target the camera)
    onSelect: () => void; // when the user clicks the node after in focus (should open info panel)
    channelData: Channel;
}

// NOTE: each channel node has it's own glowing light. The intensity of this light scales with the size of the channel.
// NOTE: each channel node has it's own size. The size of the node scales with the size of the channel.
// NOTE: each channel node has it's own material which is the profile picture of the channel shrink wrapped around the sphere
    // The profile photo should always be facing the camera.
export default function ChannelNode(props: ChannelNodeProps) {
  const [coordinates, setCoordinates] = useState<Coordinates[]>([{"_id": "0", "channel": "filler", "coords": [0,0,0]}]);
  const texture = useLoader(TextureLoader, props.channelData.metadata["data"][0]["profile_image_url"] as string);
  texture.colorSpace = SRGBColorSpace

  const decalRef = useRef<Mesh>(null!)
  const { camera } = useThree()

  useFrame(() => {
    if (decalRef.current) {
      decalRef.current.lookAt(camera.position)
    }
  })

  useEffect(() => {
      const fetchChannels = async () => {
        const response = await fetch(`http://localhost:8000/coordinates?channel_name=${props.channelData.channel}`);
        const data = await response.json();
        setCoordinates(data as Coordinates[]);
      }
      fetchChannels();
  }, []);

  return (
    <mesh  ref={decalRef} position={[coordinates[0].coords[0]*30, coordinates[0].coords[1]*30, coordinates[0].coords[2]*30]}>
      <sphereGeometry
        args={[
          props.sphereGeometry.radius,
          props.sphereGeometry.widthSegments,
          props.sphereGeometry.heightSegments,
        ]}
      />
      <meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.05} />

      <Decal
        position={[0, 0, props.sphereGeometry.radius]}
        rotation={[0, 0, 0]}
        scale={2}
      >
        <meshBasicMaterial
          map={texture}
          polygonOffset
          polygonOffsetFactor={-1}
        />
      </Decal>
    </mesh>
  )
}
