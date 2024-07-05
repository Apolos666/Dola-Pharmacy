import LoginForm from "@/components/LoginForm/LoginForm.tsx";
import {useNavigate} from "react-router-dom";
import {useRef} from "react";
import {ILoginDto} from "@/components/LoginForm/LoginFormConfig.ts";
import {accountApi} from "@/api/Account/AccountApi.ts";
import {EmailNotVerifiedError} from "@/api/Exception/ApiErrorException.ts";
import {useAuth} from "@/hooks/useAuth.tsx";
import {useHandleToastResponse} from "@/hooks/useHandleToastResponse.tsx";
import {useLoading} from "@/hooks/useLoading.tsx";

export function Login() {
    const setResponse = useHandleToastResponse();
    const withLoading = useLoading();
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const countError = useRef<number>(0);
    const loginSuccessToastDelay = 2000;

    async function handleLoginAsync(data: ILoginDto) {
        await withLoading(async () => {
            try {
                const response = await accountApi.requestLogicAsync(data)
                setAuth({accessToken: response.data.accessToken})
                setResponse({message: "Đăng nhập thành công", type: "success"})
                setTimeout(() => {
                    navigate("/")
                }, loginSuccessToastDelay)
            } catch (err) {
                if (err instanceof EmailNotVerifiedError) {
                    setResponse({message: "Email chưa được xác thực", type: "error"})
                    navigate("/account/email-verification"); // Chuyển hướng đến trang xác thực email
                } else {
                    countError.current++;
                    setResponse({message: `${err.message} ${countError.current}`, type: "error"})
                }
            }
        })
    }

    return (
        <div>
            <LoginForm handleLoginAsync={handleLoginAsync}/>
        </div>
    );
}

