import {RegisterForm} from "@/components/RegisterForm/RegisterForm.tsx";
import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useRef, useState} from "react";
import {useToast} from "@/components/ui/use-toast.ts";
import {cn} from "@/lib/utils.ts";
import {accountApi} from "@/api/account.ts";
import {IRegisterDto} from "@/components/RegisterForm/RegisterFormConfig.ts";
import {LoadingContext} from "@/contexts/LoadingProvider.tsx";
import {ResponseMessage} from "@/model/ResponseMessage.ts";

export function Register() {
    const { setIsLoading } = useContext(LoadingContext);

    const countError = useRef<number>(0);
    const registerSuccessToastDelay = 2000;

    const navigate = useNavigate();
    const { toast } = useToast();

    const [registerResponse, setRegisterResponse] = useState<ResponseMessage>();

    // Hiển thị thông báo lỗi khi đăng ký trả về từ action bằng toast
    useEffect(() => {
        switch (registerResponse?.type) {
            case "error":
                toast({
                    title: "Có lỗi hiện tại đang xảy ra",
                    description: registerResponse?.message,
                    className: cn(
                        'bg-[#7F1D1D] text-white rounded-xl',
                    )
                })
                break;
            case "success":
                toast({
                    title: "Thành công",
                    description: registerResponse?.message,
                    className: cn(
                        'bg-emerald-400 text-white rounded-xl',
                    )
                })
                break;
        }

    }, [registerResponse]);

    async function handleRegisterAsync(data: IRegisterDto) {
        setIsLoading(true);
        try {
            await accountApi.requestRegisterAsync(data)
            setRegisterResponse({message: "Đăng ký thành công", type: "success"})
            setTimeout(() => {
                navigate("/account/email-verification")
            }, registerSuccessToastDelay)
        } catch (err) {
            countError.current++;
            setRegisterResponse({message: `${err.message} ${countError.current}`, type: "error"})
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <RegisterForm handleRegisterAsync={handleRegisterAsync}/>
        </>
    );
}