import {Link} from "react-router-dom";

export function BannerTop() {

    return (
        <div className="xl:h-20 h-6 container-app bg-[#81E0E2]">
            <Link to="">
                <img className="w-full h-full" src="/banner_top.webp" alt="banner top"/>
            </Link>
        </div>
    )
}