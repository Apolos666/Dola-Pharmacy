import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";

function EmailVerification() {
    return (
        <>
            <div className="flex flex-col justify-center items-center bg-muted p-4 gap-2">
                <h1 className="text-3xl font-semibold">Xác thực email của bạn</h1>
                <span className="text-lg text-center text-[#AFAFAF]">Kiểm tra email & nhấn vào đường link để active tài khoản</span>
                <img className="w-60" src="/email-download-svgrepo-com.svg" alt="email verification"/>
                <div className="grid grid-cols-3 gap-2">
                    <Button className="bg-[#43B1E7] text-white rounded-xl h-9 px-3 text-xs">Resend Email</Button>
                    <Button className="border-2 border-black text-[#AFAFAF] rounded-xl h-9 px-3 text-xs">Contact Support</Button>
                    <Button className="border-2 border-black text-[#AFAFAF] rounded-xl h-9 px-3 text-xs">
                        <Link to="/account/login" >Login</Link>
                    </Button>
                </div>
            </div>
        </>
    )
}

export default EmailVerification;