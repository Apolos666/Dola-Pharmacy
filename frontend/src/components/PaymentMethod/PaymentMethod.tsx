import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";
import {Label} from "@/components/ui/label.tsx";
import {FaMoneyBillAlt} from "react-icons/fa";
import {useTransactionType} from "@/hooks/Entity/useTransactionType.tsx";
import {useOrderUser} from "@/hooks/Entity/useOrderUser.tsx";
import {IsLastElement} from "@/helper/ArrayHelper.ts";

export function PaymentMethod() {
    const {paymentMethods} = useTransactionType()
    const {setOrder} = useOrderUser()

    return (
        <>
            <div className="mt-6 font-bold text-xl">Thanh toán</div>
            <div
                className="rounded-[4px] px-3 py-4 text-[15px] bg-white border-[#d9d9d9] w-full font-medium border-2">
                <RadioGroup className="flex flex-col">
                    {paymentMethods.length > 0 && paymentMethods?.map((method, index) => (
                        <div key={index} className={`flex items-center space-x-2 ${IsLastElement(paymentMethods, index) ? "" : "border-b-[1px] border-b-[#d9d9d9]"} pb-2`}>
                            <RadioGroupItem
                                value={method.MethodName}
                                id={`${method.MethodId}`}
                                onClick={() => setOrder((prev) => {
                                    return {
                                        ...prev,
                                        PaymentMethodId: method.MethodId
                                    }
                                })}
                            />
                            <Label htmlFor={`${method.MethodId}`} className="flex justify-between items-center w-full">
                                <div>{method.MethodName}</div>
                                <div>
                                    <FaMoneyBillAlt className="text-[#337ab7] text-2xl"/>
                                </div>
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            </div>
        </>
    )
}