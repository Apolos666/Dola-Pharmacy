import {LoadingContext} from "@/contexts/LoadingProvider.tsx";
import {useContext} from "react";

export function useLoading() {
    const { setIsLoading } = useContext(LoadingContext);

    async function withLoading(callback: () => Promise<void>) {
        setIsLoading(true);
        try {
            await callback();
        } finally {
            setIsLoading(false);
        }
    };

    return withLoading;
}