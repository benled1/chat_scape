"use client"

import { Html } from '@react-three/drei'
import { Coordinates } from '../types'
import { Channel } from '../types'
import { useRef, useEffect, useState, useContext } from 'react'
import { Vector3, TextureLoader, SRGBColorSpace, Mesh, Texture } from 'three'
import { useLoader, useFrame, useThree } from '@react-three/fiber'
import { Decal } from '@react-three/drei'
import { HomeSceneContext } from '../contexts'

export interface SphereGeometry {
  radius: number
  widthSegments: number
  heightSegments: number
}

export interface ChannelNodeProps {
  sphereGeometry: SphereGeometry
  position: Vector3
  onFocus: () => void
  onSelect: () => void
  channelData: Channel
}

export default function ChannelNode(props: ChannelNodeProps) {
  const { selectedChannel, setSelectedChannel } = useContext(HomeSceneContext)!
  const [coordinates, setCoordinates] = useState<Coordinates[]>([
    { _id: "0", channel: "filler", coords: [0, 0, 0] }
  ])

  let texture: Texture = useLoader(TextureLoader, "/profile_images/no-texture.png") as Texture;
  if (props.channelData.metadata.data.length) {
    texture = useLoader(
      TextureLoader,
      props.channelData.metadata.data[0].profile_image_url
    ) as Texture;
  }
  texture.colorSpace = SRGBColorSpace

  const decalRef = useRef<Mesh>(null!)
  const { camera, gl } = useThree()

  useEffect(() => {
    fetch(
      `http://localhost:8000/coordinates?channel_name=${props.channelData.channel}&month=2025-07`
    )
      .then((r) => r.json())
      .then((data: Coordinates[]) => setCoordinates(data))
  }, [props.channelData.channel])

  useEffect(() => {
    const onWheel = () => setSelectedChannel("")
    window.addEventListener("wheel", onWheel)
    return () => window.removeEventListener("wheel", onWheel)
  }, [])

  const coordScale = 30
  const [x, y, z] = coordinates[0]?.coords ?? [0, 0, 0]
  const worldPos = new Vector3(x * coordScale, y * coordScale, z * coordScale)
  const labelOffset = props.sphereGeometry.radius + 0.2

  useFrame(() => {
    if (!decalRef.current) return

    decalRef.current.lookAt(camera.position)

    if (props.channelData.channel === selectedChannel) {
      const backDir = camera.position.clone().sub(worldPos).normalize()
      const idealPos = worldPos.clone().add(backDir.multiplyScalar(5))
      camera.position.lerp(idealPos, 0.1)
      camera.lookAt(worldPos)
    }
  })

  return (
    <group position={worldPos}>
      <mesh
        ref={decalRef}
        position={[0, 0, 0]}
        onPointerOver={(e) => {
          e.stopPropagation()
          gl.domElement.style.cursor = "pointer"
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          gl.domElement.style.cursor = "auto"
        }}
        onClick={(e) => {
          e.stopPropagation()
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
        <meshStandardMaterial
          color="white"
          emissive="white"
          emissiveIntensity={0.05}
        />

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

      {selectedChannel === props.channelData.channel && (
        <Html
          position={[0, labelOffset, 0]}
          center
          style={{ pointerEvents: "none" }} >
          <div
            style={{
              background: "rgba(255,255,255,0.8)",
              padding: "2px 6px",
              borderRadius: "4px",
              fontSize: "0.75rem",
              whiteSpace: "nowrap",
            }}
          >
            {props.channelData.channel}
          </div>
        </Html>
      )}
    </group>
  )
}
