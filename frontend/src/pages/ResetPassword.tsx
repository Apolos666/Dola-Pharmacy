import {useNavigate, useParams} from "react-router-dom";
import ResetPasswordForm from "@/components/ResetPasswordForm/ResetPasswordForm.tsx";
import {IResetPasswordData} from "@/components/ResetPasswordForm/ResetPasswordConfig.ts";
import {useContext, useEffect, useRef, useState} from "react";
import {LoadingContext} from "@/contexts/LoadingProvider.tsx";
import {useToast} from "@/components/ui/use-toast.ts";
import {ResponseMessage} from "@/model/ResponseMessage.ts";
import {accountApi} from "@/api/account.ts";
import {cn} from "@/lib/utils.ts";

function ResetPassword() {
    const { setIsLoading } = useContext(LoadingContext);

    const countErorr = useRef<number>(0)
    const resetPasswordSuccessToastDelay = 2000;

    const navigate = useNavigate()
    const { toast } = useToast()

    const [resetPasswordResponse, setResetPasswordResponse] = useState<ResponseMessage>();

    const { email, token } = useParams();

    useEffect(() => {
        switch (resetPasswordResponse?.type) {
            case "error":
                toast({
                    title: "Có lỗi hiện tại đang xảy ra",
                    description: resetPasswordResponse?.message,
                    className: cn(
                        'bg-[#7F1D1D] text-white rounded-xl',
                    )
                })
                break;
            case "success":
                toast({
                    title: "Thành công",
                    description: resetPasswordResponse?.message,
                    className: cn(
                        'bg-emerald-400 text-white rounded-xl',
                    )
                })
                break;
        }
    }, [resetPasswordResponse]);

    async function handleConfirmResetPasswordAsync(data: IResetPasswordData) {
        setIsLoading(true);
        try {
            await accountApi.confirmResetPasswordAsync(data)
            setResetPasswordResponse({message: "Reset password thành công", type: "success"})
            setTimeout(() => {
                navigate("/account/login")
            }, resetPasswordSuccessToastDelay)
        } catch (err) {
            countErorr.current++;
            setResetPasswordResponse({message: `${err.message} ${countErorr.current}`, type: "error"})
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <ResetPasswordForm handleConfirmResetPasswordAsync={handleConfirmResetPasswordAsync} email={email as string} token={token as string}/>
        </>
    )
}

export default ResetPassword;