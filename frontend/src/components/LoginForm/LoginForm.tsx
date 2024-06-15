import {Link, useNavigation, useSubmit} from "react-router-dom";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import FacebookButton from "@/components/ExternalLogin/FacebookButton.tsx";
import GoogleButton from "@/components/ExternalLogin/GoogleButton.tsx";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {ILoginFormInput, schemaLoginForm} from "@/components/LoginForm/LoginFormConfig.ts";
import ForgotPasswordForm from "@/components/ForgotPasswordForm/ForgotPasswordForm.tsx";

function LoginForm() {
    const form = useForm<ILoginFormInput>({
        resolver: yupResolver(schemaLoginForm),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const submit = useSubmit();
    const { state }= useNavigation();

    // Sử dụng hàm submit từ react-router-dom để gọi action
    const onSubmit = (data: ILoginFormInput) => {
        submit({...data}, {
            method: 'POST',
            action: '/account/login',
        });
    }

    return(
        <>
            <div className="xl:flex xl:justify-center xl:items-center">
                <div className="xl:rounded-xl xl:w-1/4 px-8 pb-8 bg-[#E9E9E9] mt-4 rounded-md">
                    <div className="flex justify-around items-center">
                        <div className="p-4 border-b-2 border-b-[#3280E7] text-[#3280E7] flex-1 text-center">
                            <Link to="/account/login">ĐĂNG NHẬP</Link>
                        </div>
                        <div className="p-4 border-b-2 border-b-black flex-1 text-center">
                            <Link to="/account/register">ĐĂNG KÝ</Link>
                        </div>
                    </div>
                    <div className="text-xl text-center my-4">ĐĂNG NHẬP</div>
                    <Form {...form} >
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                className="text-sm font-semibold bg-white border-white border-b-[#1F76E7] border-b-2 rounded-[4px]"
                                                placeholder="Email" {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-rose-400"/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                className="text-sm font-semibold bg-white border-white border-b-[#1F76E7] border-b-2 rounded-[4px]"
                                                placeholder="Mật khẩu" {...field}
                                                type="password"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-rose-400"/>
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                className="p-3 bg-[#1B74E7] text-white w-full rounded-[4px] hover:bg-[#003CBF]"
                            >{state === "submitting" ? "Đăng nhập ..." : "Đăng nhập"}</Button>
                        </form>
                    </Form>
                    <ForgotPasswordForm />
                    <div className="text-center my-3">Hoặc đăng nhập bằng</div>
                    <div className="flex xl:justify-around xl:items-center xl:flex-row xl:mx-2 flex-col mx-20 gap-2">
                    <FacebookButton className="xl:flex-1"/>
                        <GoogleButton className="xl:flex-1"/>
                    </div>
                </div>
            </div>


        </>
    )
}

export default LoginForm;