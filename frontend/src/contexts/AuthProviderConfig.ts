import React from "react";

export type AuthProviderType = {
    children: React.ReactNode
}

export type AuthState = {
    accessToken: string;
}

export type UserProfile = {
    hoten: string;
    email: string;
    phoneNumber: string;
    address: string[];
}

export type AuthContextType = {
    auth: AuthState | undefined;
    setAuth: React.Dispatch<React.SetStateAction<AuthState | undefined>>;
    profile: UserProfile | undefined;
    setProfile: React.Dispatch<React.SetStateAction<UserProfile | undefined>>;
}