import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useNavigation, useSubmit} from "react-router-dom";
import {IRegisterFormInput, schemaRegisterForm} from "./RegisterFormConfig.ts";
import {Button} from "@/components/ui/button.tsx"
import {Form, FormControl, FormField, FormItem, FormMessage,} from "@/components/ui/form.tsx"
import {Input} from "@/components/ui/input.tsx"

export function RegisterForm() {
    const form = useForm<IRegisterFormInput>({
        resolver: yupResolver(schemaRegisterForm),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            password: "",
        },
    })

    const submit = useSubmit();
    const { state }= useNavigation();

    // Sử dụng hàm submit từ react-router-dom để gọi action
    const onSubmit = (data: IRegisterFormInput) => {
        submit({...data}, {
            method: 'POST',
            action: '/account/register',
        });
    }

    return (
        <>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="p-8 bg-[#E9E9E9] mt-4 rounded-md space-y-2">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        className="text-sm font-semibold bg-white border-white border-b-[#1F76E7] border-b-2 rounded-[4px]"
                                        placeholder="Họ" {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-rose-400"/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        className="text-sm font-semibold bg-white border-white border-b-[#1F76E7] border-b-2 rounded-[4px]"
                                        placeholder="Tên" {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-rose-400"/>
                            </FormItem>
                        )}
                    />
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
                        name="phoneNumber"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        className="text-sm font-semibold bg-white border-white border-b-[#1F76E7] border-b-2 rounded-[4px]"
                                        placeholder="Số điện thoại" {...field}
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
                    >{ state === "submitting" ? "Đăng ký ..." : "Đăng ký"}</Button>
                </form>
            </Form>
        </>
    )
}