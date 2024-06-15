import * as yup from "yup";

export interface IRegisterFormInput {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
}

const phoneVnReg = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;

export const schemaRegisterForm = yup.object().shape({
    firstName: yup.string().required('Họ là bắt buộc'),
    lastName: yup.string().required('Tên là bắt buộc'),
    email: yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
    phoneNumber: yup.string().matches(phoneVnReg, 'Số điện thoại không hợp lệ').required('Số điện thoại là bắt buộc'),
    password: yup.string()
        .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
        .matches(/[a-z]/, 'Mật khẩu phải chứa ít nhất 1 chữ cái thường')
        .matches(/[A-Z]/, 'Mật khẩu phải chứa ít nhất 1 chữ cái hoa')
        .matches(/\d+/, 'Mật khẩu phải chứa ít nhất 1 số')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt')
        .required('Mật khẩu là bắt buộc'),
});