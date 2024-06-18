import {FaFacebookF} from "react-icons/fa";
import FacebookLogin, {ProfileSuccessResponse} from "@greatsumini/react-facebook-login";

function FacebookButton({ className } : {className?: string}) {
    function handleProfileSuccess(response: ProfileSuccessResponse) {
        console.log('Get Profile Success!', response);
    }

    return (
        <>
            {/* Only work for development with same facebook account */}
            <FacebookLogin
                appId={import.meta.env.VITE_FACEBOOK_APP_ID} // Đã xoá App cũ trên meta for developer và tạo lại cái mới
                onSuccess={(response) => {
                    console.log('Login Success!', response);
                }}
                onFail={(error) => {
                    console.log('Login Failed!', error);
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