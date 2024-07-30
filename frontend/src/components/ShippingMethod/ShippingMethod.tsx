import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";
import {Label} from "@/components/ui/label.tsx";
import {useTransactionType} from "@/hooks/Entity/useTransactionType.tsx";
import {useOrderUser} from "@/hooks/Entity/useOrderUser.tsx";
import {useEffect} from "react";

export function ShippingMethod() {
    const {shippingMethods} = useTransactionType();
    const {setOrder} = useOrderUser()

    useEffect(() => {
        setOrder((prev) => {
            return {
                ...prev,
                ShippingMethodId: shippingMethods[0]?.MethodId
            }
        })
    }, [setOrder, shippingMethods]);

    return (
        <>
            <div className="font-bold text-xl">Vận chuyển</div>
            <div
                className="rounded-[4px] px-3 py-4 text-[15px] bg-white border-[#d9d9d9] w-full font-medium border-2">
                <RadioGroup
                    defaultValue="giaohangtannoi"
                >
                    {shippingMethods?.map((method, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <RadioGroupItem
                                value="giaohangtannoi"
                                id="r1"
                                onClick={() => setOrder((prev) => {
                                    return {
                                        ...prev,
                                        ShippingMethodId: method.MethodId
                                    }
                                })}
                            />
                            <Label htmlFor="r1" className="flex justify-between w-full">
                                <div>{method.MethodName}</div>
                                <div>{method.ShippingCost.toLocaleString()} ₫</div>
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            </div>
        </>
    )
}