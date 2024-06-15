import * as yup from "yup";

export interface ILoginFormInput {
    email: string;
    password: string;
}

export const schemaLoginForm = yup.object().shape({
    email: yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
    password: yup.string()
        .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
        .matches(/[a-z]/, 'Mật khẩu phải chứa ít nhất 1 chữ cái thường')
        .matches(/[A-Z]/, 'Mật khẩu phải chứa ít nhất 1 chữ cái hoa')
        .matches(/\d+/, 'Mật khẩu phải chứa ít nhất 1 số')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt')
        .required('Mật khẩu là bắt buộc'),
});