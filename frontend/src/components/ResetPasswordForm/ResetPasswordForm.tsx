import {
    IResetPasswordData,
    IResetPasswordFormInput,
    IResetPasswordProp,
    schemaResetPasswordForm
} from "@/components/ResetPasswordForm/ResetPasswordConfig.ts";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useRef, useState} from "react";
import Spinner from "@/components/Spinner/Spinner.tsx";
import {useToast} from "@/components/ui/use-toast.ts";
import {accountApi} from "@/api/account.ts";
import {cn} from "@/lib/utils.ts";
import {useNavigate} from "react-router-dom";

function ResetPasswordForm({ email, token } : IResetPasswordProp) {
    const form = useForm<IResetPasswordFormInput>({
        resolver: yupResolver(schemaResetPasswordForm),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    })

    const { toast } = useToast();
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const navigate = useNavigate();
    const redirectDelayMs = useRef<number>(2000);

    const onSubmit = async (data: IResetPasswordFormInput) => {
        setIsLoading(true);

        const resetPasswordData: IResetPasswordData = {
            email: email,
            token: token,
            password: data.password
        }

        const status = await accountApi.confirmResetPasswordAsync(resetPasswordData);
        setIsLoading( false);
        showToastBasedOnStatus(status);
    }

    function showToastBasedOnStatus(status: number) {
        switch (status) {
            case 200:
                toast({
                    title: "Reset password thành công",
                    description: "Quay trở lại trang đăng nhập để đăng nhập lại",
                    className: cn(
                        'bg-emerald-400 text-white rounded-xl',
                    )
                })

                setTimeout(() => {
                    navigate('/account/login', { replace: true});
                }, redirectDelayMs.current);
                break;
            case 400:
                toast({
                    title: "Có lỗi hiện tại đang xảy ra",
                    description: "Mật khẩu không hợp lệ hoặc có lỗi từ hệ thống",
                    className: cn(
                        'bg-[#7F1D1D] text-white rounded-xl',
                    )
                })
                break;
        }
    }

    return (
        <>
            <div className="xl:flex xl:justify-center xl:items-center">
                <div className="xl:rounded-xl xl:w-1/4 px-8 pb-8 bg-[#E9E9E9] mt-4 rounded-md">
                    <div className="xl:pt-0 pt-4 text-2xl my-4 text-center">Lấy lại mật khẩu</div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Mật khẩu mới</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="text-sm font-semibold bg-white border-white border-b-[#1F76E7] border-b-2 rounded-[4px]"
                                                {...field}
                                                type="password"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-rose-400"/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Nhập lại mật khẩu mới</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="text-sm font-semibold bg-white border-white border-b-[#1F76E7] border-b-2 rounded-[4px]"
                                                {...field}
                                                type="password"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-rose-400"/>
                                    </FormItem>
                                )}
                            />
                            <Button
                                className="p-3 bg-[#1B74E7] text-white w-full rounded-[4px] hover:bg-[#003CBF]"
                                type="submit"
                            >{isLoading ? "Đặt lại mật khẩu ..." : "Đặt lại mật khẩu"}</Button>
                        </form>
                    </Form>
                </div>
            </div>
            {isLoading && <Spinner/>}
        </>
    )
}

export default ResetPasswordForm