"use client"
import { Coordinates } from '../types';
import { Channel } from '../types';
import { useRef, useEffect, useState, useContext } from 'react';
import {Vector3, TextureLoader, SRGBColorSpace, Mesh} from 'three';
import { useLoader, useFrame, useThree } from '@react-three/fiber'
import { Decal } from '@react-three/drei';
import { HomeSceneContext } from '../contexts';
import { SelectionHelper } from 'three/examples/jsm/Addons.js';
import { off } from 'process';

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

export default function ChannelNode(props: ChannelNodeProps) {
  const context = useContext(HomeSceneContext);
  if (!context) throw new Error("Must be used within HomeSceneContext.Provider");
  const { selectedChannel, setSelectedChannel } = context;

  const [coordinates, setCoordinates] = useState<Coordinates[]>([{"_id": "0", "channel": "filler", "coords": [0,0,0]}]);

  var texture = useLoader(TextureLoader, "/profile_images/no-texture.png");
  if (props.channelData.metadata["data"].length !== 0) {
    console.log(`drawing node for ${props.channelData.channel} with profile_image = ${props.channelData.metadata["data"][0]["profile_image_url"]}`)
    texture = useLoader(TextureLoader, props.channelData.metadata["data"][0]["profile_image_url"] as string);
  }
  texture.colorSpace = SRGBColorSpace
  const decalRef = useRef<Mesh>(null!)
  const { camera, gl } = useThree()

  useFrame(() => {
    if (!decalRef.current) return;

    decalRef.current.lookAt(camera.position)


    if (props.channelData.channel == selectedChannel) {
      const targetPos = decalRef.current.position.clone();
      const zoomDistance = 5;
      const backDir = camera.position.clone().sub(targetPos).normalize();
      const idealPos = targetPos.clone().add(backDir.multiplyScalar(zoomDistance));

      // const leftOffset = new Vector3(-2,0,0);
      // idealPos.add(leftOffset);
      camera.position.lerp(idealPos, 0.1);
      camera.lookAt(targetPos)
      camera.lookAt(decalRef.current.position);
    }
  })

  useEffect(() => {
      const fetchChannels = async () => {
        const response = await fetch(`http://localhost:8000/coordinates?channel_name=${props.channelData.channel}&month=2025-07`);
        const data = await response.json();
        setCoordinates(data as Coordinates[]);
      }
      fetchChannels();
  }, []);

  return (
    <mesh  
      ref={decalRef} 
      position={[coordinates[0].coords[0]*30, coordinates[0].coords[1]*30, coordinates[0].coords[2]*30]}
      onPointerOver={(e) => {
        e.stopPropagation();
        gl.domElement.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        gl.domElement.style.cursor = 'auto';
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (selectedChannel == props.channelData.channel) {
          setSelectedChannel("");
        } else {
          setSelectedChannel(props.channelData.channel);
          console.log(`Selected ${props.channelData.channel}`);
        }
      }}
    >
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
