import {FaGooglePlusG} from "react-icons/fa";
import {useGoogleLogin} from "@react-oauth/google";
import {useRef} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "@/hooks/useAuth.tsx";
import {accountApi} from "@/api/account.ts";
import {useHandleToastResponse} from "@/hooks/useHandleToastResponse.tsx";
import {useLoading} from "@/hooks/useLoading.tsx";

function GoogleButton({ className } : {className?: string}) {
    const setResponse = useHandleToastResponse();
    const withLoading = useLoading();
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const countError = useRef<number>(0);
    const loginSuccessToastDelay = 2000;

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
        await withLoading(async () => {
            try {
                const response = await accountApi.requestGoogleLoginAsync({ ExchangeCode: exchangeCode });
                setAuth({ accessToken: response.data.accessToken });
                setResponse({ message: "Đăng nhập thành công", type: "success" });
                setTimeout(() => {
                    navigate("/");
                }, loginSuccessToastDelay);
            } catch (err) {
                countError.current++;
                setResponse({ message: `${err.message} ${countError.current}`, type: "error" });
            }
        });
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