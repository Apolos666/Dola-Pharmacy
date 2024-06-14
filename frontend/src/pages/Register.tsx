import {RegisterForm} from "@/components/Register/RegisterForm.tsx";
import axios from "@/api/axios.ts";
import {redirect, useActionData, useNavigation} from "react-router-dom";
import {useEffect} from "react";
import {useToast} from "@/components/ui/use-toast.ts";
import {cn} from "@/lib/utils.ts";

function Register() {
    const actionData = useActionData();
    const { toast } = useToast();

    // Hiển thị thông báo lỗi khi đăng nhap trả ve từ action bằng toast
    useEffect(() => {
        if ( typeof actionData !== 'string') return;

        toast({
            title: "Có lỗi hiện tại đang xảy ra",
            description: actionData,
            className: cn(
                'bg-[#7F1D1D] text-white rounded-xl',
            )
        })

    }, [actionData]);

    return (
        <>
            <RegisterForm />
        </>
    );
}

let countError: number = 0;

async function action({request}: { request: Request }) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    const registerDto = {
        "Ho": data.firstName,
        "Ten": data.lastName,
        "Email": data.email,
        "PhoneNumber": data.phoneNumber,
        "Password": data.password
    }

    try {
        await axios.post('/account/register', registerDto, {signal: request.signal})
        return redirect("/account/email-verification")
    } catch (err) {
        countError++;
        switch (err.response.status) {
            case 400:
                return "Yêu cầu không hợp lệ " + countError
            case 409:
                return "Email đã tồn tại " + countError
            case 500:
                return "Có lỗi xảy ra ở bên hệ thống " + countError
            default:
                return "Có lỗi xảy ra, chúng tôi đang khắc phục " + countError
        }
    }
}

export const registerRoute = {
    action,
    element: <Register />
}