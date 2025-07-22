import { createContext, useContext } from "react";


export interface SceneContext {
  isInfoPanelOpen: boolean,
  setIsInfoPanelOpen: (panelState: boolean) => void;
}

export const HomeSceneContext = createContext<SceneContext | undefined>(undefined);