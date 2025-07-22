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
    const [isInfoPanelOpen, setIsInfoPanelOpen] = useState<boolean>(false);


    useEffect(() => {
        const fetchChannels = async () => {
            const response = await fetch("http://localhost:8000/channels");
            const data = await response.json();
            setChannels(data as Channel[]);
        }
        fetchChannels();
    }, []);
    

    return (
      <HomeSceneContext.Provider value={{isInfoPanelOpen, setIsInfoPanelOpen}}>
        <div className="relative w-screen h-screen overflow-hidden">
            <Scene channels={channels} />
            <InfoPanel isOpen={isInfoPanelOpen} onClose={() => setIsInfoPanelOpen(false)} />
        </div>
      </HomeSceneContext.Provider>
    );
}
