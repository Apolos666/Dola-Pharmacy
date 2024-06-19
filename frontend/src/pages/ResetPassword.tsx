import {useNavigate, useParams} from "react-router-dom";
import ResetPasswordForm from "@/components/ResetPasswordForm/ResetPasswordForm.tsx";
import {IResetPasswordData} from "@/components/ResetPasswordForm/ResetPasswordConfig.ts";
import {useRef} from "react";
import {accountApi} from "@/api/account.ts";
import {useHandleToastResponse} from "@/hooks/useHandleToastResponse.tsx";
import {useLoading} from "@/hooks/useLoading.tsx";

function ResetPassword() {
    const setResponse = useHandleToastResponse();
    const withLoading = useLoading();
    const navigate = useNavigate();
    const countError = useRef<number>(0);
    const resetPasswordSuccessToastDelay = 2000;
    const { email, token } = useParams();

    async function handleConfirmResetPasswordAsync(data: IResetPasswordData) {
        await withLoading(async () => {
            try {
                await accountApi.confirmResetPasswordAsync(data);
                setResponse({ message: "Reset password thành công", type: "success" });
                setTimeout(() => {
                    navigate("/account/login");
                }, resetPasswordSuccessToastDelay);
            } catch (err) {
                countError.current++;
                setResponse({ message: `${err.message} ${countError.current}`, type: "error" });
            }
        });
    }

    return (
        <>
            <ResetPasswordForm handleConfirmResetPasswordAsync={handleConfirmResetPasswordAsync} email={email as string} token={token as string}/>
        </>
    )
}

export default ResetPassword;