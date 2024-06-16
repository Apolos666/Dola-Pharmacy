import {createContext, useState} from "react";
import {AuthContextType, AuthProviderType, AuthState} from "@/contexts/AuthProviderConfig.ts";

export const AuthContext = createContext<AuthContextType>({
    auth: undefined,
    setAuth: () => {}
});

export function AuthProvider({children} : AuthProviderType) {
    const [auth, setAuth] = useState<AuthState>()

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

