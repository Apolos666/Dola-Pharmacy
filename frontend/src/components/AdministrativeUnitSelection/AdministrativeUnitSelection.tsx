import { useAdministrativeDivision } from "@/hooks/AdministrativeDivision/useAdministrativeDivision.tsx";
import { TiArrowSortedDown } from "react-icons/ti";
import {useEffect, useState} from "react";
import {useOrderUser} from "@/hooks/Entity/useOrderUser.tsx";
import {AddOrderDto} from "@/model/OrderType.ts";

export function AdministrativeUnitSelection() {
    const { data } = useAdministrativeDivision();
    const [provinceSelect, setProvinceSelect] = useState("---");
    const [districtSelect, setDistrictSelect] = useState("---");
    const [wardSelect, setWardSelect] = useState("---");
    const {setOrder} = useOrderUser()

    useEffect(() => {
        setOrder((prev: AddOrderDto) => {
            return {
                ...prev,
                Province: provinceSelect,
                District: districtSelect,
                Ward: wardSelect
            }
        })
    }, [districtSelect, provinceSelect, setOrder, wardSelect]);

    return (
        <>
            <div className="flex flex-col gap-4">
                <div className="relative">
                    <div className="absolute top-1 left-3 text-[#999] text-[13px] font-medium">Tỉnh thành</div>
                    <select
                        className="w-full bg-white border-[#d9d9d9] rounded-[4px] px-3 pt-5 pb-1 border-2
                                   font-medium text-[15px] appearance-none focus:outline-none focus:border-[#66afe9]"
                        value={provinceSelect}
                        onChange={(e) => {
                            setProvinceSelect(e.target.value);
                            setDistrictSelect("---");
                            setWardSelect("---");
                        }}
                    >
                        <option value="---">---</option>
                        {data.map((province, index) => (
                            <option key={index} value={province.Name}>{province.Name}</option>
                        ))}
                    </select>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2">
                        <TiArrowSortedDown
                            className="border-l-[#b3b3b3] border-l-[1px] w-8 text-gray-500 text-[17px]" />
                    </div>
                </div>
                <div className="relative">
                    <div className="absolute top-1 left-3 text-[#999] text-[13px] font-medium">Quận/Huyện</div>
                    <select
                        className={`w-full border-[#d9d9d9] rounded-[4px] px-3 pt-5 pb-1 border-2
                                   font-medium text-[15px] appearance-none focus:outline-none focus:border-[#66afe9]
                                   ${provinceSelect === "---" ? "bg-[#ddd]" : "bg-white"}`}
                        value={districtSelect}
                        onChange={(e) => {
                            setDistrictSelect(e.target.value);
                            setWardSelect("---")
                        }}
                        disabled={provinceSelect === "---"}
                    >
                        <option value="---">---</option>
                        {provinceSelect !== "---" && data.map((province) => {
                            if (province.Name === provinceSelect) {
                                return province.District.map((district, index) => (
                                    <option key={index} value={district.Name}>{district.Name}</option>
                                ));
                            }
                            return null;
                        })}
                    </select>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2">
                        <TiArrowSortedDown
                            className={`border-l-[#b3b3b3] border-l-[1px] w-8 ${provinceSelect === "---" ? "text-gray-400" : "text-gray-500"} text-[17px]`} />
                    </div>
                </div>
                <div className="relative">
                    <div className="absolute top-1 left-3 text-[#999] text-[13px] font-medium">Phường/Xã</div>
                    <select
                        className={`w-full border-[#d9d9d9] rounded-[4px] px-3 pt-5 pb-1 border-2
                                   font-medium text-[15px] appearance-none focus:outline-none focus:border-[#66afe9]
                                   ${districtSelect === "---" ? "bg-[#ddd]" : "bg-white"}`}
                        value={wardSelect}
                        onChange={(e) => setWardSelect(e.target.value)}
                        disabled={districtSelect === "---"}
                    >
                        <option value="---">---</option>
                        {provinceSelect !== "---" && districtSelect !== "---" && data.map((province) => {
                            if (province.Name === provinceSelect) {
                                return province.District.map((district) => {
                                    if (district.Name === districtSelect) {
                                        return district.Ward.map((ward, index) => (
                                            <option key={index} value={ward.Name}>{ward.Name}</option>
                                        ));
                                    }
                                    return null;
                                });
                            }
                            return null;
                        })}
                    </select>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2">
                        <TiArrowSortedDown
                            className={`border-l-[#b3b3b3] border-l-[1px] w-8 ${districtSelect === "---" ? "text-gray-400" : "text-gray-500"} text-[17px]`} />
                    </div>
                </div>
            </div>
        </>
    );
}
