import * as yup from "yup";

export interface IResetPasswordProp {
    email: string,
    token: string
}

export interface IResetPasswordFormInput {
    password: string;
    confirmPassword: string;
}

export const schemaResetPasswordForm = yup.object().shape({
    password: yup.string()
        .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
        .matches(/[a-z]/, 'Mật khẩu phải chứa ít nhất 1 chữ cái thường')
        .matches(/[A-Z]/, 'Mật khẩu phải chứa ít nhất 1 chữ cái hoa')
        .matches(/\d+/, 'Mật khẩu phải chứa ít nhất 1 số')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt')
        .required('Mật khẩu là bắt buộc'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password')], 'Mật khẩu xác nhận không khớp')
        .required('Xác nhận mật khẩu là bắt buộc'),
});