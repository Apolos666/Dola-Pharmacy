import {useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {
    IForgotPasswordFormInput,
    schemaForgotPasswordForm
} from "@/components/ForgotPasswordForm/ForgotPasswordConfig.ts";
import {useNavigation, useSubmit} from "react-router-dom";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";

function ForgotPasswordForm() {
    const form = useForm<IForgotPasswordFormInput>({
        resolver: yupResolver(schemaForgotPasswordForm),
        defaultValues: {
            email: "",
        },
    })

    const submit = useSubmit();
    const { state } = useNavigation();

    const onSubmit = (data: IForgotPasswordFormInput) => {
        submit({...data}, {
            method: 'POST',
            action: '/account/login',
        });
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
                            >{ state === "submitting" ? "Lấy lại mật khẩu ..." : "Lấy lại mật khẩu"}</Button>
                        </form>
                    </Form>
                </div>}
            </div>
        </>
    )
}

export default ForgotPasswordForm;