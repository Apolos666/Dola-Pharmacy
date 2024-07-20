import {useContext} from "react";
import {AuthContext} from "@/contexts/AuthProvider.tsx";

export function useAuth() {
    const { auth, setAuth, profile} = useContext(AuthContext);
    return { auth, setAuth, profile };
}