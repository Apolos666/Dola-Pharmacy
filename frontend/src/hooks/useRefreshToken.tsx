import {useAuth} from "@/hooks/useAuth.tsx";
import {accountApi} from "@/api/account.ts";

export function useRefreshToken() {
    const { setAuth } = useAuth();

    async function refreshTokenAsync() {
        const response = await accountApi.requestRefreshTokenAsync();

        setAuth(prev => {
            return {
                ...prev,
                accessToken: response.accessToken
            }
        })

        return response.accessToken;
    }

    return refreshTokenAsync;
}