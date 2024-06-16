import {useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {
    IForgotPasswordFormInput,
    schemaForgotPasswordForm
} from "@/components/ForgotPasswordForm/ForgotPasswordConfig.ts";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {accountApi} from "@/api/account.ts";
import {useToast} from "@/components/ui/use-toast.ts";
import {cn} from "@/lib/utils.ts";
import Spinner from "@/components/Spinner/Spinner.tsx";

function ForgotPasswordForm() {
    const form = useForm<IForgotPasswordFormInput>({
        resolver: yupResolver(schemaForgotPasswordForm),
        defaultValues: {
            email: "",
        },
    })

    const { toast } = useToast();
    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    const onSubmit = async (data: IForgotPasswordFormInput) => {
        setIsLoading(true);
        const status = await accountApi.requestResetPasswordAsync(data);
        setIsLoading(false);
        showToastBasedOnStatus(status)
    }

    function showToastBasedOnStatus(status: number) {
        switch (status) {
            case 200:
                toast({
                    title: "Thành công",
                    description: "Vui lòng kiểm tra email để lấy lại mật khẩu",
                    className: cn(
                        'bg-emerald-400 text-white rounded-xl',
                    )
                })
                break;
            case 400:
                toast({
                    title: "Có lỗi hiện tại đang xảy ra",
                    description: "Yêu cầu không hợp lệ",
                    className: cn(
                        'bg-[#7F1D1D] text-white rounded-xl',
                    )
                })
                break;
        }
    }

    const [toggleForgetPassword, setToggleForgetPassword] = useState<boolean>(false);

    return(
        <>
            <div>
                <div
                    className="text-center my-3 cursor-pointer hover:text-[#3280E7]"
                    onClick={() => setToggleForgetPassword(!toggleForgetPassword)}
                >Quên mật khẩu
                </div>
                {toggleForgetPassword && <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <Button
                                className="p-3 bg-[#1B74E7] text-white w-full rounded-[4px] hover:bg-[#003CBF]"
                                type="submit"
                            >{ isLoading ? "Lấy lại mật khẩu ..." : "Lấy lại mật khẩu"}</Button>
                        </form>
                    </Form>
                </div>}
            </div>
            {isLoading && <Spinner />}
        </>
    )
}

export default ForgotPasswordForm;