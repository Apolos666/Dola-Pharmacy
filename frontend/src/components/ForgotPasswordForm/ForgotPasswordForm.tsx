import {useContext, useEffect, useRef, useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {
    IForgotPasswordFormInput,
    schemaForgotPasswordForm
} from "@/components/ForgotPasswordForm/ForgotPasswordConfig.ts";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {accountApi} from "@/api/Account/AccountApi.ts";
import {useToast} from "@/components/ui/use-toast.ts";
import {cn} from "@/lib/utils.ts";
import {LoadingContext} from "@/contexts/LoadingProvider.tsx";
import {ResponseMessage} from "@/model/ResponseMessage.ts";

function ForgotPasswordForm() {
    const {isLoading, setIsLoading} = useContext(LoadingContext)
    const [toggleForgetPassword, setToggleForgetPassword] = useState<boolean>(false);

    const countError = useRef<number>(0);
    const [forgetPasswordResponse, setForgetPasswordResponse] = useState<ResponseMessage>();

    const { toast } = useToast();

    const form = useForm<IForgotPasswordFormInput>({
        resolver: yupResolver(schemaForgotPasswordForm),
        defaultValues: {
            email: "",
        },
    })

    useEffect(() => {
        switch (forgetPasswordResponse?.type) {
            case "error":
                toast({
                    title: "Có lỗi hiện tại đang xảy ra",
                    description: forgetPasswordResponse?.message,
                    className: cn(
                        'bg-[#7F1D1D] text-white rounded-xl',
                    )
                })
                break;
            case "success":
                toast({
                    title: "Thành công",
                    description: forgetPasswordResponse?.message,
                    className: cn(
                        'bg-emerald-400 text-white rounded-xl',
                    )
                })
                break;
        }

    }, [forgetPasswordResponse]);

    const onSubmit = async (data: IForgotPasswordFormInput) => {
        setIsLoading(true);
        try {
            await accountApi.requestResetPasswordAsync(data);
            setForgetPasswordResponse({message: "Lấy lại mật khẩu thành công", type: "success"})
        } catch (err) {
            countError.current++;
            setForgetPasswordResponse({message: `${err.message} ${countError.current}`, type: "error"})
        } finally {
            setIsLoading(false);
        }
    }

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
        </>
    )
}

export default ForgotPasswordForm;