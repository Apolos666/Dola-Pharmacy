import {FaFacebookF} from "react-icons/fa";
import FacebookLogin, {ProfileSuccessResponse} from "@greatsumini/react-facebook-login";
import {useHandleToastResponse} from "@/hooks/useHandleToastResponse.tsx";
import {useLoading} from "@/hooks/useLoading.tsx";
import {useAuth} from "@/hooks/useAuth.tsx";
import {useNavigate} from "react-router-dom";
import {useRef} from "react";
import {IFacebookSigninRequest} from "@/components/ExternalLogin/FacebookSigninConfig.ts";
import {accountApi} from "@/api/Account/AccountApi.ts";

function FacebookButton({ className } : {className?: string}) {
    const setResponse = useHandleToastResponse();
    const withLoading = useLoading();
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const countError = useRef<number>(0);
    const loginSuccessToastDelay = 2000;

     async function handleProfileSuccess(response: ProfileSuccessResponse) {
        const requestData: IFacebookSigninRequest = {
            Email: response.email as string,
            Name: response.name as string
        }

        await withLoading(async () => {
            try {
                const response = await accountApi.requestFacebookLoginAsync(requestData);
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
            {/* Only work for development with same facebook account */}
            <FacebookLogin
                appId={import.meta.env.VITE_FACEBOOK_APP_ID} // Đã xoá App cũ trên meta for developer và tạo lại cái mới
                onFail={(error) => {
                    countError.current++;
                    setResponse({ message: `${error} ${countError.current}`, type: "error" });
                }}
                onProfileSuccess={handleProfileSuccess}
                render={({ onClick }) => (
                    <button onClick={onClick} className={`${className} flex items-center gap-4 py-2 px-6 bg-[#3B5998]`}>
                        <FaFacebookF className="text-white"/>
                        <div className="text-white">Facebook</div>
                    </button>
                )}
                loginOptions={{
                    auth_type: "reauthenticate"
                }}
            />
        </>
    )
}

export default FacebookButton