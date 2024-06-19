import {BreadCrumbCustom} from "@/components/BreadCrumb/BreadCrumbCustom.tsx";

function Header() {

    return (
        <>
            <div className="h-20 bg-[#81E0E2] text-center">Header Banner</div>
            <div className="h-44 bg-[#2772FA] text-center">Header</div>
            <BreadCrumbCustom />
        </>
    )
}

export default Header