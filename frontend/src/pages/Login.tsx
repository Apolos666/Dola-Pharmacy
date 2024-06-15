import LoginForm from "@/components/LoginForm/LoginForm.tsx";
import axios from "@/api/axios.ts";
import {redirect, useActionData} from "react-router-dom";
import {useToast} from "@/components/ui/use-toast.ts";
import {useEffect} from "react";
import {cn} from "@/lib/utils.ts";

function Login() {
    const actionData = useActionData();
    const { toast } = useToast();

    // Hiển thị thông báo lỗi khi đăng nhập trả về từ action bằng toast
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
        <div>
            <LoginForm />
        </div>
    );
}

let countError: number = 0;

async function action({request}: { request: Request }) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    const loginDto = {
        "Email": data.email,
        "Password": data.password
    }

    try {
        await axios.post('/account/login', loginDto, {signal: request.signal})
        return redirect("/")
    } catch (err) {
        countError++;
        switch (err.response.status) {
            case 401:
                return "Thông tin không hợp lệ " + countError
            case 403:
                redirect("/account/email-verification") // Chuyển hướng đến trang xác thực email
                break;
            case 500:
                return "Có lỗi xảy ra ở bên hệ thống " + countError
            default:
                return "Có lỗi xảy ra, chúng tôi đang khắc phục " + countError
        }
    }
}

export const loginRoute = {
    action,
    element: <Login />
}