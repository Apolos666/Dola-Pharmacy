import {createContext, useState} from "react";
import {AuthContextType, AuthProviderType, AuthState, UserProfile} from "@/contexts/AuthProviderConfig.ts";

export const AuthContext = createContext<AuthContextType>({
    auth: undefined,
    setAuth: () => {},
    profile: undefined,
    setProfile: () => {},
});

export function AuthProvider({children} : AuthProviderType) {
    const [auth, setAuth] = useState<AuthState>()
    const [profile, setProfile] = useState<UserProfile>();

    return (
        <AuthContext.Provider value={{auth, setAuth, profile, setProfile}}>
            {children}
        </AuthContext.Provider>
    )
}

