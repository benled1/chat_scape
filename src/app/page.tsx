"use client"
import { Channel } from "./types";
import { Coordinates } from "./types";
import { useEffect, useState } from "react";
import Image from "next/image";
import Scene from "./components/Scene";


export default function Home() {
    const [channels, setChannels] = useState<Channel[]>([]);

    useEffect(() => {
        const fetchChannels = async () => {
            const response = await fetch("http://localhost:8000/channels");
            const data = await response.json();
            setChannels(data as Channel[]);
        }
        fetchChannels();
    }, []);
    

  return (
    <Scene
      channels={channels}
    ></Scene>
  );
}
