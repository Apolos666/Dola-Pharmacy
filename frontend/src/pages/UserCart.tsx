import {UserCartTable} from "@/components/UserCartTable/UserCartTable.tsx";
import {useState} from "react";
import {Calendar} from "@/components/ui/calendar.tsx";

import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {Checkbox} from "@/components/ui/checkbox.tsx";

const frameworks = [
    {
        value: "next.js",
        label: "Next.js",
    },
    {
        value: "sveltekit",
        label: "SvelteKit",
    },
    {
        value: "nuxt.js",
        label: "Nuxt.js",
    },
    {
        value: "remix",
        label: "Remix",
    },
    {
        value: "astro",
        label: "Astro",
    },
]

export function UserCart() {
    const [date, setDate] = useState<Date>()
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")

    return (
        <>
            <div className="container-app">
                <div className="h-[157px] bg-orange-300">Place Holder</div>
                <div className="my-4">
                    <div className="flex gap-6">
                        <div className="w-[80%]">
                            <UserCartTable />
                        </div>
                        <div className="w-[20%]">
                            <div className="p-2 border-[1.5px] border-gray-300 rounded-[5px]">
                                <div className="font-bold">Thời gian giao hàng</div>
                                <div className="grid grid-cols-2 my-3">
                                    <div>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="none"
                                                    size="none"
                                                    className="border-x-[1px] border-y-[1px] border-gray-300 w-full py-2 rounded-l-[5px]"
                                                >
                                                    {date ? <span>{`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</span> : <span className="text-gray-400">Chọn ngày</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent align="end" className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={date}
                                                    onSelect={setDate}
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
                                                    {value
                                                        ? frameworks.find((framework) => framework.value === value)?.label
                                                        : "Select framework..."}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent align="end" className="w-[200px] p-0 bg-white">
                                                <Command>
                                                    <CommandInput placeholder="Search framework..." />
                                                    <CommandEmpty>No framework found.</CommandEmpty>
                                                    <CommandGroup>
                                                        {frameworks.map((framework) => (
                                                            <CommandItem
                                                                key={framework.value}
                                                                value={framework.value}
                                                                onSelect={(currentValue) => {
                                                                    setValue(currentValue === value ? "" : currentValue)
                                                                    setOpen(false)
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        value === framework.value ? "opacity-100" : "opacity-0"
                                                                    )}
                                                                />
                                                                {framework.label}
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}