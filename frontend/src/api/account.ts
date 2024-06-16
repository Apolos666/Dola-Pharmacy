import {IForgotPasswordFormInput} from "@/components/ForgotPasswordForm/ForgotPasswordConfig.ts";
import axios, {axiosPrivate} from "@/api/axios.ts";
import {IResetPasswordData} from "@/components/ResetPasswordForm/ResetPasswordConfig.ts";
import {ILoginDto} from "@/components/LoginForm/LoginFormConfig.ts";
import {EmailNotVerifiedError, SystemError, UnauthorizedError, UnknownError} from "@/api/ApiErrorException.ts";

async function requestLogicAsync({data, request } : { data: ILoginDto, request: Request}) {
    try {
        await axiosPrivate.post('/account/login', data, {signal: request.signal})
    } catch (err) {
        switch (err.response.status) {
            case 401:
                throw new UnauthorizedError(err.response.data)
            case 403:
                throw new EmailNotVerifiedError()
            case 500:
                throw new SystemError()
            default:
                throw new UnknownError()
        }
    }
}

async function requestResetPasswordAsync(data : IForgotPasswordFormInput) : Promise<number> {
    try {
        const result = await axios.post('/account/forgot-password', {
            Email: data.email
        });

        return result.status;
    } catch (err) {
        return err.response.status;
    }
}

async function confirmResetPasswordAsync(data : IResetPasswordData) : Promise<number> {
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
    requestLogicAsync,
    requestResetPasswordAsync,
    confirmResetPasswordAsync
}