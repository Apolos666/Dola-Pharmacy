import {IoLocationOutline, IoNotificationsOutline} from "react-icons/io5";
import {IoMdHeartEmpty} from "react-icons/io";

export function StoreSystemNavigation() {
    return (
        <>
            {/* Todo: them tooltip cho cái này */}
            <div className="flex items-center gap-3">
                <div className="relative">
                    <IoLocationOutline className="text-white text-4xl hover:text-[#003CBF] cursor-pointer"/>
                    <span
                        className="absolute top-[-6px] right-[-2px] bg-[#5dac46] w-5 h-5 rounded-full text-white text-sm">8</span>
                </div>
                <div className="relative">
                    <IoMdHeartEmpty className="text-white text-4xl hover:text-[#003CBF] cursor-pointer"/>
                    <span
                        className="absolute top-[-6px] right-[-2px] bg-[#5dac46] w-5 h-5 rounded-full text-white text-sm">8</span>
                </div>
                <div className="relative">
                    <IoNotificationsOutline className="text-white text-4xl hover:text-[#003CBF] cursor-pointer"/>
                    <span
                        className="absolute top-[-6px] right-[-2px] bg-[#5dac46] w-5 h-5 rounded-full text-white text-sm">8</span>
                </div>
            </div>
        </>
    )
}