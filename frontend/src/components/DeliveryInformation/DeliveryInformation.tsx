import {TiArrowSortedDown} from "react-icons/ti";
import PhoneInput from "react-phone-number-input/min";
import {useState} from "react";
import {E164Number} from "libphonenumber-js";
import {AdministrativeUnitSelection} from "@/components/AdministrativeUnitSelection/AdministrativeUnitSelection.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";

export function DeliveryInformation() {
    const [country, setCountry] = useState<E164Number | undefined>()

    return (
        <>
            <div className="flex flex-col gap-4">
                <div className="flex items-center">
                    <div className="font-bold text-xl">Thông tin nhận hàng</div>
                </div>
                <div className="relative">
                    <div className="absolute top-1 left-3 text-[#999] text-[13px] font-medium">Số địa chỉ
                    </div>
                    <select className="w-full bg-white border-[#d9d9d9] rounded-[4px] px-3 pt-5 pb-1 border-2
                                 font-medium text-[15px] appearance-none focus:outline-none focus:border-[#66afe9]">
                        <option value="">Địa chỉ khác...</option>
                    </select>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2">
                        <TiArrowSortedDown
                            className="border-l-[#b3b3b3] border-l-[1px] w-8 text-gray-500 text-[17px]"/>
                    </div>
                </div>
                <div>
                    <div
                        className="rounded-[4px] px-3 p-1 bg-[#ddd] text-[15px] border-[#d9d9d9] w-full font-medium border-2">
                        <div className="text-[13px] text-[#999]">Email</div>
                        <div className="text-[15px] font-medium">ApolosHonkai@gmail.com</div>
                    </div>
                </div>
                <div>
                    <div
                        className="rounded-[4px] px-3 p-1 text-[15px] border-[#d9d9d9] w-full font-medium border-2">
                        <div className="text-[13px] text-[#999]">Họ và tên</div>
                        <input className="text-[15px] font-medium w-full focus:outline-none" type="text"
                               placeholder="Nhập tên"/>
                    </div>
                </div>
                <div>
                    <PhoneInput
                        className="px-3 py-3 rounded-[4px] border-[#d9d9d9] font-medium border-2"
                        placeholder="Số điện thoại"
                        value={country}
                        onChange={setCountry}
                        defaultCountry="VN"
                    />
                </div>
                <div>
                    <div
                        className="rounded-[4px] px-3 p-1 text-[15px] border-[#d9d9d9] w-full font-medium border-2">
                        <div className="text-[13px] text-[#999]">Địa chỉ</div>
                        <input className="text-[15px] font-medium w-full focus:outline-none" type="text"
                               placeholder="Nhập Địa chỉ"/>
                    </div>
                </div>
                <div>
                    <AdministrativeUnitSelection />
                </div>
                <div>
                    <Textarea className="rounded-[4px] border-[#d9d9d9] text-[15px]" placeholder="Ghi chú (tuỳ chọn)" />
                </div>
            </div>
        </>
    )
}