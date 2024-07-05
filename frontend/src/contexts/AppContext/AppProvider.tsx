import {ReactNode} from "react";
import {AppContext} from "@/contexts/AppContext/AppContextConfig.ts";

export function AppProvider({ children } : { children: ReactNode}) {
    return (
        <AppContext.Provider value={""}>
            {children}
        </AppContext.Provider>
    );
};