import {Swiper} from "@/components/TopBar/Swiper.tsx";
import {RegisterLink} from "@/components/TopBar/RegisterLink.tsx";
import {LoginLink} from "@/components/TopBar/LoginLink.tsx";
import {Hotline} from "@/components/TopBar/Hotline.tsx";

export function TopBar() {
    return (
        <div className="flex items-center justify-between text-center container-app pt-2">
            <Swiper/>
            <div className="xl:flex items-center hidden">
                <RegisterLink />
                <LoginLink />
                <Hotline />
            </div>
        </div>
    )
}