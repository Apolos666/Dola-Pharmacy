import {createContext} from "react";

export interface AppContextType {
}

export const AppContext = createContext<AppContextType | undefined>(undefined);