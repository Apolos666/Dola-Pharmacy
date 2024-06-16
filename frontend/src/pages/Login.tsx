import LoginForm from "@/components/LoginForm/LoginForm.tsx";
import {redirect, useActionData} from "react-router-dom";
import {useToast} from "@/components/ui/use-toast.ts";
import {useEffect} from "react";
import {cn} from "@/lib/utils.ts";
import {ILoginDto} from "@/components/LoginForm/LoginFormConfig.ts";
import {accountApi} from "@/api/account.ts";
import {EmailNotVerifiedError} from "@/api/ApiErrorException.ts";

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

    const loginDto: ILoginDto = {
        Email: data.email.toString(),
        Password: data.password.toString()
    }

    try {
        await accountApi.requestLogicAsync({data: loginDto, request})
        return redirect("/");
    } catch (err) {
        if (err instanceof EmailNotVerifiedError) {
            return redirect("/account/email-verification"); // Chuyển hướng đến trang xác thực email
        } else {
            countError++;
            return err.message + " " + countError
        }
    }
}

export const loginRoute = {
    action,
    element: <Login />
}