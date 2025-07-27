"use client"
import { Channel } from "./types";
import { Coordinates } from "./types";
import React, { useEffect, useState, createContext, useContext } from "react";
import Image from "next/image";
import Scene from "./components/Scene";
import InfoPanel from "./components/InfoPanel";
import { HomeSceneContext } from "./contexts";


export default function Home() {
    const [channels, setChannels] = useState<Channel[]>([]);
    const [selectedChannel, setSelectedChannel] = useState<string>("");

    useEffect(() => {
        const fetchChannels = async () => {
            const response = await fetch("http://localhost:8000/channels");
            const data = await response.json();
            setChannels(data as Channel[]);
        }
        fetchChannels();
    }, []);
    

    return (
      <HomeSceneContext.Provider value={{selectedChannel, setSelectedChannel}}>
        <div className="relative w-screen h-screen overflow-hidden">
            <Scene channels={channels} />
            {/* <div>
              {
              selectedChannel && 
              <InfoPanel isOpen={selectedChannel} onClose={() => setSelectedChannel("")} channelData={channels.filter(channel => channel.channel==selectedChannel)[0]}/>
              }
            </div> */}
        </div>
      </HomeSceneContext.Provider>
    );
}
