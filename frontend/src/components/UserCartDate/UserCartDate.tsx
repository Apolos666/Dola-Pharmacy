import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Calendar} from "@/components/ui/calendar.tsx";
import {Check} from "lucide-react";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem} from "@/components/ui/command.tsx";
import {cn} from "@/lib/utils.ts";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {useEffect, useState} from "react";
import {formatDate, getHourAndMinuteTimeSpan, toCSharpDateTime, toCSharpTimeSpan, toDate} from "@/helper/DateHelper.ts";
import {UpdateCartUserDto, useCart} from "@/contexts/Cart/CartProviderConfig.ts";
import {IoIosArrowDown} from "react-icons/io";
import {deliveryTimes} from "@/components/UserCartDate/UserCartDateConfig.ts";

export function UserCartDate() {
    const {
        userCart,
        updateCartUserAsync
    } = useCart();

    const [deliveryDate, setDeliveryDate] = useState<Date>()
    const [open, setOpen] = useState(false)
    const [deliveryTimeSpan, setDeliveryTimeSpan] = useState("")

    async function HandleUpdateCartUser() {
        if (deliveryDate) {
            const dateTime = toCSharpDateTime(deliveryDate);
            const timeSpan = toCSharpTimeSpan(deliveryTimeSpan);

            const data: UpdateCartUserDto = {
                deliveryDate: dateTime,
                deliveryTime: timeSpan === "" ? "00:00:00" : timeSpan,
            }

            await updateCartUserAsync(data);
        }
    }

    useEffect(() => {
        HandleUpdateCartUser();
    }, [deliveryDate, deliveryTimeSpan]);

    return (
        <>
            <div className="p-2 border-[1.5px] border-gray-300 rounded-[5px]">
                <div className="font-bold">Thời gian giao hàng</div>
                <div className="font-bold text-[#1b74e7]">
                    <span className="">{userCart?.deliveryDate ? formatDate(toDate(userCart.deliveryDate)) : "Chưa chọn ngày giao hàng"}</span>
                    <span className="mx-2">-</span>
                    <span>{userCart?.deliveryTime ? getHourAndMinuteTimeSpan(userCart?.deliveryTime) : "Chưa chọn thời gian giao hàng"}</span>
                </div>
                <div className="grid grid-cols-2 my-3">
                    <div>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="none"
                                    size="none"
                                    className="border-x-[1px] border-y-[1px] border-gray-300 w-full py-2 rounded-l-[5px]"
                                >
                                    {deliveryDate ?
                                        <span>{formatDate(deliveryDate)}</span> :
                                        <span className="text-gray-400">Chọn ngày</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent align="end" className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={deliveryDate}
                                    onSelect={setDeliveryDate}
                                    initialFocus
                                    className="bg-white"
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="none"
                                    size="none"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="border-r-[1px] border-y-[1px] border-gray-300 w-full py-2 rounded-r-[5px]"
                                >
                                    {deliveryTimeSpan
                                        ? deliveryTimes.find((deliveryTime) => deliveryTime.value === deliveryTimeSpan)?.label
                                        : <span className="text-gray-400">Chọn thời gian</span>}
                                    <IoIosArrowDown className="text-gray-700 ml-2"/>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent align="end" className="w-[200px] p-0 bg-white">
                                <Command>
                                    <CommandInput placeholder="Tìm thời gian..."/>
                                    <CommandEmpty>Không tìm thấy thời gian phù hợp.</CommandEmpty>
                                    <CommandGroup>
                                        {deliveryTimes.map((deliveryTime) => (
                                            <CommandItem
                                                key={deliveryTime.value}
                                                value={deliveryTime.value}
                                                onSelect={(currentValue) => {
                                                    setDeliveryTimeSpan(currentValue === deliveryTimeSpan ? "" : currentValue)
                                                    setOpen(false)
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        deliveryTimeSpan === deliveryTime.value ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                                {deliveryTime.label}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="terms" className="rounded-[2px]"/>
                        <label
                            htmlFor="terms"
                            className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Xuất hóa đơn công ty
                        </label>
                    </div>
                </div>
            </div>
        </>
    )
}