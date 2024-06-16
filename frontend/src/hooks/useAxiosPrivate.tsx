import {useRefreshToken} from "@/hooks/useRefreshToken.tsx";
import {useAuth} from "@/hooks/useAuth.tsx";
import {useEffect} from "react";
import {axiosPrivate} from "@/api/axios.ts";

export function useAxiosPrivate() {
    const refreshTokenAsync = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {

        const requestInterceptor = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers.Authorization) {
                    config.headers.Authorization = `Bearer ${auth?.accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        )

        const responseInterceptor = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                // A reference to the original request cái mà gây ra lỗi, nó bao gồm URL, header ...
                const previousRequest = error?.config;

                // Nếu lỗi là 403 và request chưa được gửi đi
                if (error?.response?.status === 403 && !previousRequest?.sent) {
                    // Đánh dấu rằng request đã được gửi đi, để tránh việc gửi đi nhiều lần (vô hạn)
                    previousRequest.sent = true;

                    const newAccessToken = await refreshTokenAsync();
                    previousRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                    // Gửi lại request
                    return axiosPrivate(previousRequest);
                }

                // Nếu không phải lỗi 403 hoặc request đã được gửi đi, trả về lỗi
                return Promise.reject(error);
            }
        )

        return () => {
            // Remove interceptor when component unmount
            axiosPrivate.interceptors.request.eject(requestInterceptor);
            axiosPrivate.interceptors.response.eject(responseInterceptor);
        }
    }, [auth, refreshTokenAsync]);
}