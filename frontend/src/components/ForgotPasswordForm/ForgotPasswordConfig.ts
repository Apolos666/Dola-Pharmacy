import * as yup from "yup";

export interface IForgotPasswordFormInput {
    email: string;
}

export const schemaForgotPasswordForm = yup.object().shape({
    email: yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
});