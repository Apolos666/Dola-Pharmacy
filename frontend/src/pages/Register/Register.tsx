import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {redirect, useSubmit} from "react-router-dom";
import {IRegisterFormInput, schemaRegisterForm} from "./RegisterFormConfig.ts";

function Register() {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<IRegisterFormInput>({
        resolver: yupResolver(schemaRegisterForm),
    })

    const submit = useSubmit();

    // Sử dụng hàm submit từ react-router-dom để gọi action
    const onSubmit = (data: IRegisterFormInput) => {
        submit({...data}, {
            method: 'POST',
            action: '/account/register',
        });
    }

    return (
        <>
            <form className="p-8 bg-[#E9E9E9] mt-4 rounded-md" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input
                        className="px-3 py-2 mb-2 rounded-md text-sm font-semibold border-b-[#1F76E7] border-b-2 w-full" {...register('firstName')}
                        placeholder="Họ"/>
                    <p className="mb-2 text-rose-600">{errors.firstName?.message}</p>
                </div>
                <div>
                    <input
                        className="px-3 py-2 mb-2 rounded-md text-sm font-semibold border-b-[#1F76E7] border-b-2 w-full" {...register('lastName')}
                        placeholder="Tên"/>
                    <p className="mb-2 text-rose-600">{errors.lastName?.message}</p>
                </div>
                <div>
                    <input
                        className="px-3 py-2 mb-2 rounded-md text-sm font-semibold border-b-[#1F76E7] border-b-2 w-full" {...register('email')}
                        placeholder="Email"/>
                    <p className="mb-2 text-rose-600">{errors.email?.message}</p>
                </div>
                <div>
                    <input
                        className="px-3 py-2 mb-2 rounded-md text-sm font-semibold border-b-[#1F76E7] border-b-2 w-full" {...register('phoneNumber')}
                        placeholder="Số điện thoại"/>
                    <p className="mb-2 text-rose-600">{errors.phoneNumber?.message}</p>
                </div>
                <div>
                    <input
                        className="px-3 py-2 mb-2 rounded-md text-sm font-semibold border-b-[#1F76E7] border-b-2 w-full"
                        type="password" {...register('password')}
                        placeholder="Mật khẩu"/>
                    <p className="mb-2 text-rose-600">{errors.password?.message}</p>
                </div>
                <button className="p-3 bg-[#1B74E7] text-white w-full rounded-md" type="submit">Đăng ký</button>
            </form>
        </>
    )
}

async function action({request} : {request: Request}) {
    const formData = await request.formData();
    const {...data} = Object.fromEntries(formData);

    console.log(data)

    return redirect("/")

}

export const registerRoute = {
    action,
    element: <Register />
}