import {FaGooglePlusG} from "react-icons/fa";
import {useGoogleLogin} from "@react-oauth/google";
import {useContext, useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useToast} from "@/components/ui/use-toast.ts";
import {ResponseMessage} from "@/model/ResponseMessage.ts";
import {useAuth} from "@/hooks/useAuth.tsx";
import {cn} from "@/lib/utils.ts";
import {accountApi} from "@/api/account.ts";
import {LoadingContext} from "@/contexts/LoadingProvider.tsx";

function GoogleButton({ className } : {className?: string}) {
    const { setIsLoading } = useContext(LoadingContext);

    const countError = useRef<number>(0);
    const loginSuccessToastDelay = 2000;

    const navigate = useNavigate();
    const {toast} = useToast();

    const [loginResponse, setLoginResponse] = useState<ResponseMessage>();
    const {setAuth} = useAuth();

    // Hiển thị thông báo lỗi khi đăng nhập
    useEffect(() => {
        switch (loginResponse?.type) {
            case "error":
                toast({
                    title: "Có lỗi hiện tại đang xảy ra",
                    description: loginResponse?.message,
                    className: cn(
                        'bg-[#7F1D1D] text-white rounded-xl',
                    )
                })
                break;
            case "success":
                toast({
                    title: "Thành công",
                    description: loginResponse?.message,
                    className: cn(
                        'bg-emerald-400 text-white rounded-xl',
                    )
                })
                break;
        }

    }, [loginResponse]);

    const login = useGoogleLogin({
        onSuccess: async (credentialsResponse) => {
            await handleGoogleLoginAsync(credentialsResponse.code);
        },
        onError: (error) => {
            console.error(error);
        },
        // authorization code
        flow: 'auth-code'
    })

    async function handleGoogleLoginAsync(exchangeCode: string) {
        setIsLoading(true);

        try {
            const response = await accountApi.requestGoogleLoginAsync({ExchangeCode: exchangeCode})
            setAuth({accessToken: response.data.accessToken})
            setLoginResponse({message: "Đăng nhập thành công", type: "success"})
            setTimeout(() => {
                navigate("/")
            }, loginSuccessToastDelay)
        } catch (err) {
            countError.current++;
            setLoginResponse({message: `${err.message} ${countError.current}`, type: "error"})
        } finally {
            setIsLoading(false);
        }
    }

    return (
      <>
          <button onClick={() => login()} className={`${className} flex items-center gap-4 py-2 px-6 bg-[#E14B33]`}>
              <FaGooglePlusG className="text-white"/>
              <div className="text-white">Google</div>
          </button>
      </>
  );
}

export default GoogleButton;