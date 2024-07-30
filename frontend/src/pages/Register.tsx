import {RegisterForm} from "@/components/RegisterForm/RegisterForm.tsx";
import {useNavigate} from "react-router-dom";
import {useRef} from "react";
import {accountApi} from "@/api/Account/AccountApi.ts";
import {IRegisterDto} from "@/components/RegisterForm/RegisterFormConfig.ts";
import {useHandleToastResponse} from "@/hooks/useHandleToastResponse.tsx";
import {useLoading} from "@/hooks/useLoading.tsx";

export function Register() {
    const setResponse = useHandleToastResponse();
    const {withLoading} = useLoading();
    const navigate = useNavigate();
    const countError = useRef<number>(0);
    const registerSuccessToastDelay = 2000;

    async function handleRegisterAsync(data: IRegisterDto) {
        await withLoading(async () => {
            try {
                await accountApi.requestRegisterAsync(data);
                setResponse({ message: "Đăng ký thành công", type: "success" });
                setTimeout(() => {
                    navigate("/account/email-verification");
                }, registerSuccessToastDelay);
            } catch (err) {
                countError.current++;
                setResponse({ message: `${err.message} ${countError.current}`, type: "error" });
            }
        });
    }

    return (
        <>
            <RegisterForm handleRegisterAsync={handleRegisterAsync}/>
        </>
    );
}