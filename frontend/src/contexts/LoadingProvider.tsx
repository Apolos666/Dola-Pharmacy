import {createContext, useState} from "react";
import {LoadingContextType, LoadingProviderType} from "@/contexts/LoadingProviderConfig.ts";

export const LoadingContext = createContext<LoadingContextType>({
    isLoading: false,
    setIsLoading: () => {}
});

export function LoadingProvider ({children} : LoadingProviderType) {
    const [isLoading, setIsLoading] = useState(false)

    return (
        <LoadingContext.Provider value={{isLoading, setIsLoading}}>
            {children}
        </LoadingContext.Provider>
    )
}