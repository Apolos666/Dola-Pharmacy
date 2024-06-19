import {Link} from "react-router-dom";

export function RegisterLink() {
    return (
        <div className="pr-3 border-r-[1px] border-r-white">
            <Link
                to="/account/register"
                className="text-white font-bold text-sm"
            >Đăng ký</Link>
        </div>
    );
}