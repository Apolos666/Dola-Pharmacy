import {Input} from "@/components/ui/input.tsx";
import {IoMdSearch} from "react-icons/io";
import { searchDataHeaderPlaceHolder } from "./SearchHeaderConfig.ts"
import {useTypingEffect} from "@/hooks/useTypingEffect.tsx";

export function SearchHeader({widthPercent}: {widthPercent?: string}) {
    const placeholder = useTypingEffect(searchDataHeaderPlaceHolder);

    function submitSearch() {

    }

    return (
        <>
            <form className={`relative ${widthPercent}`}>
                <Input className="bg-white xl:rounded-[10px] rounded-[12px] text-gray-500 border-white py-6 pr-10"
                       type="text"
                       placeholder={placeholder}
                />
                <IoMdSearch onClick={submitSearch}
                            className="absolute transforn -translate-y-1/2 top-1/2 right-2 text-2xl text-[#1B74E7] cursor-pointer"
                />
            </form>
        </>
    )
}