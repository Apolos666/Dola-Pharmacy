import {IForgotPasswordFormInput} from "@/components/ForgotPasswordForm/ForgotPasswordConfig.ts";
import axios from "@/api/axios.ts";
import {IResetPasswordData} from "@/components/ResetPasswordForm/ResetPasswordConfig.ts";
import {ILoginDto} from "@/components/LoginForm/LoginFormConfig.ts";
import {
    BadRequestError, ConflictError,
    EmailNotVerifiedError,
    SystemError,
    UnauthorizedError,
    UnknownError
} from "@/api/ApiErrorException.ts";
import {IRegisterDto} from "@/components/RegisterForm/RegisterFormConfig.ts";

async function requestLogicAsync({data, request } : { data: ILoginDto, request: Request}) {
    try {
        await axios.post('/account/login', data, {signal: request.signal, withCredentials: true })
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

async function requestRegisterAsync({data, request}: { data: IRegisterDto, request: Request }) {
    try {
        await axios.post('/account/register', data, {signal: request.signal})
    } catch (err) {
        switch (err.response.status) {
            case 400:
                throw new BadRequestError(err.response.data)
            case 409:
                throw new ConflictError(err.response.data)
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

async function requestRefreshTokenAsync() {
    try {
        const response = await axios.post('/account/refresh-token', {}, {withCredentials: true});
        return response.data;
    } catch (err) {
        switch (err.response.status) {
            case 401:
                throw new UnauthorizedError(err.response.data)
            case 500:
                throw new SystemError()
            default:
                throw new UnknownError()
        }
    }
}

export const accountApi = {
    requestLogicAsync,
    requestRegisterAsync,
    requestResetPasswordAsync,
    confirmResetPasswordAsync,
    requestRefreshTokenAsync
}