import {IForgotPasswordFormInput} from "@/components/ForgotPasswordForm/ForgotPasswordConfig.ts";
import axios from "@/api/Base/axios.ts";
import {IResetPasswordData} from "@/components/ResetPasswordForm/ResetPasswordConfig.ts";
import {ILoginDto} from "@/components/LoginForm/LoginFormConfig.ts";
import {
    BadRequestError,
    ConflictError,
    EmailNotVerifiedError,
    SystemError,
    UnauthorizedError,
    UnknownError
} from "@/api/Exception/ApiErrorException.ts";
import {IRegisterDto} from "@/components/RegisterForm/RegisterFormConfig.ts";
import {IGoogleSigninRequest} from "@/components/ExternalLogin/GoogleSigninConfig.ts";
import {IFacebookSigninRequest} from "@/components/ExternalLogin/FacebookSigninConfig.ts";

async function requestLogicAsync(data : ILoginDto) {
    try {
       return await axios.post('/account/login', data, {withCredentials: true })
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

async function requestGoogleLoginAsync(data: IGoogleSigninRequest) {
    try {
        return await axios.post('/account/google-sign-in', {
            ExchangeCode: data.ExchangeCode
        }, {withCredentials: true})
    } catch (err) {
        switch (err.response.status) {
            case 401:
                throw new UnauthorizedError(err.response.data)
            case 500:
                throw new SystemError(err.response.data)
            default:
                throw new UnknownError()
        }
    }
}

async function requestFacebookLoginAsync(data: IFacebookSigninRequest) {
    try {
        return await axios.post('/account/facebook-sign-in', {
            Email: data.Email,
            Name: data.Name
        }, {withCredentials: true})
    } catch (err) {
        switch (err.response.status) {
            case 401:
                throw new UnauthorizedError(err.response.data)
            case 500:
                throw new SystemError(err.response.data)
            default:
                throw new UnknownError()
        }
    }
}

async function requestRegisterAsync(data: IRegisterDto) {
    try {
        await axios.post('/account/register', data)
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

async function requestLogoutAsync() {
    try {
        const result = await axios.post('/account/logout', {}, {withCredentials: true})
        return result.data;
    } catch (err)
    {
        switch (err.response.status)
        {
            case 500:
                throw new SystemError(err.response.data)
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
    } catch(err) {
        switch (err.response.status) {
            case 400:
                throw new BadRequestError(err.response.data)
            case 500:
                throw new SystemError()
            default:
                throw new UnknownError()
        }
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
        switch (err.response.status) {
            case 400:
                throw new BadRequestError(err.response.data)
            case 500:
                throw new SystemError()
            default:
                throw new UnknownError()
        }
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
    requestGoogleLoginAsync,
    requestFacebookLoginAsync,
    requestRegisterAsync,
    requestLogoutAsync,
    requestResetPasswordAsync,
    confirmResetPasswordAsync,
    requestRefreshTokenAsync
}