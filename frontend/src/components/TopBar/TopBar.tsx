import {Swiper} from "@/components/TopBar/Swiper.tsx";
import {RegisterLink} from "@/components/TopBar/RegisterLink.tsx";
import {LoginLink} from "@/components/TopBar/LoginLink.tsx";
import {Hotline} from "@/components/TopBar/Hotline.tsx";
import {useAuth} from "@/hooks/useAuth.tsx";
import {Link} from "react-router-dom";
import {IsNullOrEmptyOrUndefined} from "@/helper/StringHelper.ts";

export function TopBar() {
    const {auth} = useAuth();

    return (
        <div className="flex items-center justify-between text-center container-app pt-2">
            <Swiper/>
            <div className="xl:flex items-center hidden">
                { IsNullOrEmptyOrUndefined(auth?.accessToken) ? (
                    <>
                        <RegisterLink />
                        <LoginLink />
                    </>
                ) : (
                    <>
                        {/* Todo: làm chức năng cho nó */}
                        <div className="pr-3 border-r-[1px] border-r-white">
                            <Link
                                to="/account/register"
                                className="text-white font-bold text-sm"
                            >Tài khoản</Link>
                        </div>
                        <div className="pr-3 border-r-[1px] border-r-white ml-3">
                            <Link
                                to="/account/register"
                                className="text-white font-bold text-sm"
                            >Đăng xuất</Link>
                        </div>
                    </>
                )}

                <Hotline/>
            </div>
        </div>
    )
}