import {FaFacebookF} from "react-icons/fa";
import FacebookLogin from "@greatsumini/react-facebook-login";

function FacebookButton({ className } : {className?: string}) {
    return (
        <>
            {/* Only work for development with same facebook account */}
            <FacebookLogin
                appId="1879188532554962"
                onSuccess={(response) => {
                    console.log('Login Success!', response);
                }}
                onFail={(error) => {
                    console.log('Login Failed!', error);
                }}
                onProfileSuccess={(response) => {
                    console.log('Get Profile Success!', response);
                }}
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