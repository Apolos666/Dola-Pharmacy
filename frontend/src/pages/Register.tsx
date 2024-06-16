import {RegisterForm} from "@/components/RegisterForm/RegisterForm.tsx";
import {redirect, useActionData} from "react-router-dom";
import {useEffect} from "react";
import {useToast} from "@/components/ui/use-toast.ts";
import {cn} from "@/lib/utils.ts";
import {accountApi} from "@/api/account.ts";
import {IRegisterDto} from "@/components/RegisterForm/RegisterFormConfig.ts";

function Register() {
    const actionData = useActionData();
    const { toast } = useToast();

    // Hiển thị thông báo lỗi khi đăng ký trả về từ action bằng toast
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

    const registerDto: IRegisterDto = {
        Ho: data.firstName.toString(),
        Ten: data.lastName.toString(),
        Email: data.email.toString(),
        PhoneNumber: data.phoneNumber.toString(),
        Password: data.password.toString()
    }

    try {
        await accountApi.requestRegisterAsync({data: registerDto, request});
        return redirect("/account/email-verification")
    } catch (err) {
        countError++;
        return err.message + " " + countError
    }

}

export const registerRoute = {
    action,
    element: <Register />
}