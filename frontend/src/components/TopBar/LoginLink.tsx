import {Link} from "react-router-dom";

export function LoginLink() {
    return (
        <div className="px-3 border-r-[1px] border-r-white">
            <Link
                to="/account/login"
                className="text-white font-bold text-sm"
            >Đăng nhập</Link>
        </div>
    );
}