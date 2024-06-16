import {IForgotPasswordFormInput} from "@/components/ForgotPasswordForm/ForgotPasswordConfig.ts";
import axios from "@/api/axios.ts";
import {IResetPasswordData} from "@/components/ResetPasswordForm/ResetPasswordConfig.ts";

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

async function confirmResetPassword(data : IResetPasswordData) : Promise<number> {
    try {
        const result = await axios.post('/account/reset-password', {
            Email: data.email,
            Password: data.password,
            Token: data.token
        });

        return result.status;
    } catch(err) {
        return err.response.status;
    }
}

export const accountApi = {
    requestResetPassword,
    confirmResetPassword
}