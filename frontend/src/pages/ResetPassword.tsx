import {useParams} from "react-router-dom";
import ResetPasswordForm from "@/components/ResetPasswordForm/ResetPasswordForm.tsx";

function ResetPassword() {
    const { email, token } = useParams();

    return (
        <>
            <ResetPasswordForm email={email as string} token={token as string}/>
        </>
    )
}

export default ResetPassword;