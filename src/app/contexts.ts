import { createContext, useContext } from "react";


export interface SceneContext {
  selectedChannel: string,
  setSelectedChannel: (channel: string) => void;
}

export const HomeSceneContext = createContext<SceneContext | undefined>(undefined);