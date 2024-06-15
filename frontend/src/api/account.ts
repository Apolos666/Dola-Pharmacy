import {IForgotPasswordFormInput} from "@/components/ForgotPasswordForm/ForgotPasswordConfig.ts";
import axios from "@/api/axios.ts";

async function requestResetPassword(data : IForgotPasswordFormInput) : Promise<number> {
    try {
        const result = await axios.post('/account/forgot-password', {
            Email: data.email
        });

        return result.status;
    } catch (err) {
        return err.response.status;
    }
}

export const accountApi = {
    requestResetPassword
}