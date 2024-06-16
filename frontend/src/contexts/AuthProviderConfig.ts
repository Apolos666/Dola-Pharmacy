import React from "react";

export type AuthProviderType = {
    children: React.ReactNode
}

export type AuthState = {
    accessToken: string;
}

export type AuthContextType = {
    auth: AuthState | undefined;
    setAuth: React.Dispatch<React.SetStateAction<AuthState | undefined>>;
}