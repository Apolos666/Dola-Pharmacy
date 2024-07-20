import {axiosPrivate} from "@/api/Base/axios.ts";
import {useContext} from "react";
import {AuthContext} from "@/contexts/AuthProvider.tsx";

export function useUserProfile() {
    const {setProfile} = useContext(AuthContext);

    async function GetMeAsync() {
        try {
            const response = await axiosPrivate.get('account/get-me');
            setProfile(prev => {
                return {
                    ...prev,
                    hoten: response.data.hoten,
                    email: response.data.email,
                    phoneNumber: response.data.sdt,
                    address: response.data.diachi,
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return {
        GetMeAsync,
    }
}