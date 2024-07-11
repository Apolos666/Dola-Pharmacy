import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";
import {Label} from "@/components/ui/label.tsx";
import {FaMoneyBillAlt} from "react-icons/fa";

export function PaymentMethod() {
    return (
        <>
            <div className="mt-6 font-bold text-xl">Thanh toán</div>
            <div
                className="rounded-[4px] px-3 py-4 text-[15px] bg-white border-[#d9d9d9] w-full font-medium border-2">
                <RadioGroup defaultValue="chuyenkhoan" className="flex flex-col">
                    <div className="flex items-center space-x-2 border-b-[1px] border-b-[#d9d9d9] pb-2">
                        <RadioGroupItem value="chuyenkhoan" id="r1"/>
                        <Label htmlFor="r1" className="flex justify-between items-center w-full">
                            <div>Chuyển khoản</div>
                            <div>
                                <FaMoneyBillAlt className="text-[#337ab7] text-2xl"/>
                            </div>
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="thuho" id="r2"/>
                        <Label htmlFor="r1" className="flex justify-between items-center w-full">
                            <div>Thu Hộ (COD)</div>
                            <div>
                                <FaMoneyBillAlt className="text-[#337ab7] text-2xl"/>
                            </div>
                        </Label>
                    </div>
                </RadioGroup>
            </div>
        </>
    )
}