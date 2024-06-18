import {FaGooglePlusG} from "react-icons/fa";
import {useGoogleLogin} from "@react-oauth/google";
import axios from "@/api/axios.ts";

function GoogleButton({ className } : {className?: string}) {
    const login = useGoogleLogin({
        onSuccess: async (credentialsResponse) => {
            console.log(credentialsResponse);
            const accessToken = await axios.post('/account/google-sign-in', {
                ExchangeCode: credentialsResponse.code
            }, {withCredentials: true})

            console.log(accessToken.data)
        },
        onError: (error) => {
            console.error(error);
        },
        // authorization code
        flow: 'auth-code'
    })

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