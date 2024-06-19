import {Input} from "@/components/ui/input.tsx";
import {IoMdSearch} from "react-icons/io";

export function SearchHeader({widthPercent}: {widthPercent: string}) {
    function submitSearch() {

    }

    return (
        <>
            <form className={`relative ${widthPercent}`}>
                <Input className="bg-white rounded-[10px] text-gray-500 border-white py-6 pr-10"
                       type="text"
                       placeholder="Tạm"
                />
                <IoMdSearch onClick={submitSearch}
                            className="absolute transforn -translate-y-1/2 top-1/2 right-2 text-2xl text-[#1B74E7] cursor-pointer"
                />
            </form>
        </>
    )
}