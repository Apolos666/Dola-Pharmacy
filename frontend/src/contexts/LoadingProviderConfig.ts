export type LoadingContextType = {
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export type LoadingProviderType = {
    children: React.ReactNode
}