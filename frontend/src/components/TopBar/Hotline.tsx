import {BsTelephone} from "react-icons/bs";

export function Hotline() {
    return (
        <div className="flex items-center pl-3">
            <div className="text-sm text-white font-bold pr-2">Hotline đặt hàng:</div>
            <div className="flex items-center text-sm bg-[#003CBF] p-2 rounded-full cursor-pointer hover:bg-white transition-colors duration-200 ease-in-out group">
                <BsTelephone className="text-white mt-1 transition-colors duration-200 ease-in-out group-hover:text-[#003CBF]"/>
                <div className="text-white font-bold text-sm transition-colors duration-200 ease-in-out group-hover:text-[#003CBF]">
                    1900 6750
                </div>
            </div>
        </div>
    );
}