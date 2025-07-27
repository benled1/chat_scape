"use client"
import { Channel } from "./types";
import { Coordinates } from "./types";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Scene from "./components/Scene";
import InfoPanel from "./components/InfoPanel";
import { HomeSceneContext } from "./contexts";
import Fuse from "fuse.js";

export default function Home() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchChannels = async () => {
      const res = await fetch("http://localhost:8000/channels");
      const data = (await res.json()) as Channel[];
      setChannels(data);
    };
    fetchChannels();
  }, []);

  const fuse = React.useMemo(
    () =>
      new Fuse(channels, {
        keys: ["channel"],
        threshold: 0.3,
      }),
    [channels]
  );

  const results = searchText
    ? fuse.search(searchText).map((r) => r.item)
    : [];

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setIsOpen(true);
  };

  const handleSelect = (channelName: string) => {
    setSelectedChannel(channelName);
    setSearchText(channelName);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && results.length > 0) {
      handleSelect(results[0].channel);
    }
  };

  return (
    <HomeSceneContext.Provider value={{ selectedChannel, setSelectedChannel }}>
      <div className="relative w-screen h-screen overflow-hidden">
        {/* Dark Mode Search Bar */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-1/3 z-10">
          <input
            type="text"
            className="w-full px-3 py-2 bg-gray-800 text-white placeholder-gray-400 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            placeholder="Search channels..."
            value={searchText}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setTimeout(() => setIsOpen(false), 150)}
          />
          {isOpen && results.length > 0 && (
            <ul className="bg-gray-800 border border-gray-700 rounded-b-lg max-h-60 overflow-auto shadow-lg">
              {results.slice(0, 10).map((ch) => (
                <li
                  key={ch._id}
                  className="px-3 py-2 hover:bg-gray-700 cursor-pointer text-white"
                  onMouseDown={() => handleSelect(ch.channel)}
                >
                  {ch.channel}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 3D Scene */}
        <Scene channels={channels} />

      </div>
    </HomeSceneContext.Provider>
  );
}
