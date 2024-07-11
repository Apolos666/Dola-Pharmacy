import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";
import {Label} from "@/components/ui/label.tsx";

export function ShippingMethod() {
    return (
        <>
            <div className="font-bold text-xl">Vận chuyển</div>
            <div
                className="rounded-[4px] px-3 py-4 text-[15px] bg-white border-[#d9d9d9] w-full font-medium border-2">
                <RadioGroup defaultValue="giaohangtannoi">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="giaohangtannoi" id="r1"/>
                        <Label htmlFor="r1" className="flex justify-between w-full">
                            <div>Giao hàng tận nơi</div>
                            <div>40.000₫</div>
                        </Label>
                    </div>
                </RadioGroup>
            </div>
        </>
    )
}