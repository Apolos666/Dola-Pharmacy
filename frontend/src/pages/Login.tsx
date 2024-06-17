import LoginForm from "@/components/LoginForm/LoginForm.tsx";
import {useNavigate} from "react-router-dom";
import {useToast} from "@/components/ui/use-toast.ts";
import {useContext, useEffect, useRef, useState} from "react";
import {cn} from "@/lib/utils.ts";
import {ILoginDto} from "@/components/LoginForm/LoginFormConfig.ts";
import {accountApi} from "@/api/account.ts";
import {EmailNotVerifiedError} from "@/api/ApiErrorException.ts";
import {LoadingContext} from "@/contexts/LoadingProvider.tsx";

type LoginResponse = {
    message: string;
    type: "error" | "success";
}

export function Login() {
    const { setIsLoading } = useContext(LoadingContext);

    const countError = useRef<number>(0);
    const loginSuccessToastDelay = 2000;

    const navigate = useNavigate();
    const { toast } = useToast();

    const [loginResponse, setLoginResponse] = useState<LoginResponse>();

    // Hiển thị thông báo lỗi khi đăng nhập
    useEffect(() => {
        switch (loginResponse?.type) {
            case "error":
                toast({
                    title: "Có lỗi hiện tại đang xảy ra",
                    description: loginResponse?.message,
                    className: cn(
                        'bg-[#7F1D1D] text-white rounded-xl',
                    )
                })
                break;
            case "success":
                toast({
                    title: "Thành công",
                    description: loginResponse?.message,
                    className: cn(
                        'bg-emerald-400 text-white rounded-xl',
                    )
                })
                break;
        }

    }, [loginResponse]);

    async function handleLoginAsync(data: ILoginDto) {
        setIsLoading(true);

        try {
            await accountApi.requestLogicAsync(data)
            setLoginResponse({message: "Đăng nhập thành công", type: "success"})
            setTimeout(() => {
                navigate("/")
            }, loginSuccessToastDelay)
        } catch (err) {
            if (err instanceof EmailNotVerifiedError) {
                setLoginResponse({message: "Email chưa được xác thực", type: "error"})
                navigate("/account/email-verification"); // Chuyển hướng đến trang xác thực email
            } else {
                countError.current++;
                setLoginResponse({message: `${err.message} ${countError.current}`, type: "error"})
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <LoginForm handleLoginAsync={handleLoginAsync}/>
        </div>
    );
}

