import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";

export function ProductFilter() {
    return (
        <>
            <div className="flex flex-col gap-6">
                <div>
                    <Card className="border-none">
                        <CardHeader className="p-3 border-[#003cbf] border-2 bg-[#1b74e7] rounded-[6px]">
                            <CardTitle className="text-white font-bold">Bộ lọc sản phẩm</CardTitle>
                            <CardDescription className="text-white">Giúp bạn tìm sản phẩm nhanh hơn</CardDescription>
                        </CardHeader>
                    </Card>
                </div>
                <div>
                    <Card className="border-[#003cbf] border-2 rounded-[6px]">
                        <CardHeader className="px-3 py-2 bg-[#003CBF] ">
                            <CardTitle className="text-white text-xl">Chọn mức giá</CardTitle>
                        </CardHeader>
                        <CardContent className="mt-3 px-3">
                            <div
                                className="flex flex-col gap-4 overflow-y-scroll max-h-[200px] scrollbar scrollbar-thumb-blue-500 scrollbar-track-sky-300 scrollbar-w-1">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        className="rounded-[4px] data-[state=checked]:bg-[#0075FF] data-[state=checked]:border-none data-[state=checked]:text-white"
                                        id="terms"/>
                                    <label
                                        htmlFor="terms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Dưới 1 triệu
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox className="rounded-[4px]" id="terms"/>
                                    <label
                                        htmlFor="terms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Từ 1 triệu - 2 triệu
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox className="rounded-[4px]" id="terms"/>
                                    <label
                                        htmlFor="terms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Từ 2 triệu - 3 triệu
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox className="rounded-[4px]" id="terms"/>
                                    <label
                                        htmlFor="terms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Từ 2 triệu - 3 triệu
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox className="rounded-[4px]" id="terms"/>
                                    <label
                                        htmlFor="terms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Từ 2 triệu - 3 triệu
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox className="rounded-[4px]" id="terms"/>
                                    <label
                                        htmlFor="terms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Từ 2 triệu - 3 triệu
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox className="rounded-[4px]" id="terms"/>
                                    <label
                                        htmlFor="terms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Từ 2 triệu - 3 triệu
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox className="rounded-[4px]" id="terms"/>
                                    <label
                                        htmlFor="terms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Từ 2 triệu - 3 triệu
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox className="rounded-[4px]" id="terms"/>
                                    <label
                                        htmlFor="terms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Từ 2 triệu - 3 triệu
                                    </label>
                                </div>

                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div>
                    <Card className="border-[#003cbf] border-2 rounded-[6px]">
                        <CardHeader className="px-3 py-2 bg-[#003CBF] ">
                            <CardTitle className="text-white text-xl">Thương hiệu</CardTitle>
                        </CardHeader>
                        <CardContent className="mt-3 px-3">
                            <div
                                className="flex flex-col gap-4 overflow-y-scroll max-h-[200px] scrollbar scrollbar-thumb-blue-500 scrollbar-track-sky-300 scrollbar-w-1">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        className="rounded-[4px] data-[state=checked]:bg-[#0075FF] data-[state=checked]:border-none data-[state=checked]:text-white"
                                        id="terms"/>
                                    <label
                                        htmlFor="terms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Dưới 1 triệu
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox className="rounded-[4px]" id="terms"/>
                                    <label
                                        htmlFor="terms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Từ 1 triệu - 2 triệu
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox className="rounded-[4px]" id="terms"/>
                                    <label
                                        htmlFor="terms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Từ 2 triệu - 3 triệu
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox className="rounded-[4px]" id="terms"/>
                                    <label
                                        htmlFor="terms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Từ 2 triệu - 3 triệu
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox className="rounded-[4px]" id="terms"/>
                                    <label
                                        htmlFor="terms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Từ 2 triệu - 3 triệu
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox className="rounded-[4px]" id="terms"/>
                                    <label
                                        htmlFor="terms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Từ 2 triệu - 3 triệu
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox className="rounded-[4px]" id="terms"/>
                                    <label
                                        htmlFor="terms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Từ 2 triệu - 3 triệu
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox className="rounded-[4px]" id="terms"/>
                                    <label
                                        htmlFor="terms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Từ 2 triệu - 3 triệu
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox className="rounded-[4px]" id="terms"/>
                                    <label
                                        htmlFor="terms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Từ 2 triệu - 3 triệu
                                    </label>
                                </div>

                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div>
                    <Card className="border-[#003cbf] border-2 rounded-[6px]">
                        <CardHeader className="px-3 py-2 bg-[#003CBF] ">
                            <CardTitle className="text-white text-xl">Đối tượng</CardTitle>
                        </CardHeader>
                        <CardContent className="mt-3 px-3">
                            <div
                                className="flex flex-col gap-4 overflow-y-scroll max-h-[200px] scrollbar scrollbar-thumb-blue-500 scrollbar-track-sky-300 scrollbar-w-1">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        className="rounded-[4px] data-[state=checked]:bg-[#0075FF] data-[state=checked]:border-none data-[state=checked]:text-white"
                                        id="terms"/>
                                    <label
                                        htmlFor="terms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Dưới 1 triệu
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox className="rounded-[4px]" id="terms"/>
                                    <label
                                        htmlFor="terms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Từ 1 triệu - 2 triệu
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox className="rounded-[4px]" id="terms"/>
                                    <label
                                        htmlFor="terms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Từ 2 triệu - 3 triệu
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox className="rounded-[4px]" id="terms"/>
                                    <label
                                        htmlFor="terms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Từ 2 triệu - 3 triệu
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox className="rounded-[4px]" id="terms"/>
                                    <label
                                        htmlFor="terms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Từ 2 triệu - 3 triệu
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox className="rounded-[4px]" id="terms"/>
                                    <label
                                        htmlFor="terms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Từ 2 triệu - 3 triệu
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox className="rounded-[4px]" id="terms"/>
                                    <label
                                        htmlFor="terms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Từ 2 triệu - 3 triệu
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox className="rounded-[4px]" id="terms"/>
                                    <label
                                        htmlFor="terms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Từ 2 triệu - 3 triệu
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox className="rounded-[4px]" id="terms"/>
                                    <label
                                        htmlFor="terms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Từ 2 triệu - 3 triệu
                                    </label>
                                </div>

                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div>
                    <Card className="border-[#003cbf] border-2 rounded-[6px]">
                        <CardHeader className="px-3 py-2 bg-[#003CBF] ">
                            <CardTitle className="text-white text-xl">Trọng lượng</CardTitle>
                        </CardHeader>
                        <CardContent className="mt-3 px-3">
                            <div
                                className="flex flex-col gap-4 overflow-y-scroll max-h-[200px] scrollbar scrollbar-thumb-blue-500 scrollbar-track-sky-300 scrollbar-w-1">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        className="rounded-[4px] data-[state=checked]:bg-[#0075FF] data-[state=checked]:border-none data-[state=checked]:text-white"
                                        id="terms"/>
                                    <label
                                        htmlFor="terms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Dưới 1 triệu
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox className="rounded-[4px]" id="terms"/>
                                    <label
                                        htmlFor="terms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Từ 1 triệu - 2 triệu
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox className="rounded-[4px]" id="terms"/>
                                    <label
                                        htmlFor="terms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Từ 2 triệu - 3 triệu
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox className="rounded-[4px]" id="terms"/>
                                    <label
                                        htmlFor="terms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Từ 2 triệu - 3 triệu
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox className="rounded-[4px]" id="terms"/>
                                    <label
                                        htmlFor="terms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Từ 2 triệu - 3 triệu
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox className="rounded-[4px]" id="terms"/>
                                    <label
                                        htmlFor="terms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Từ 2 triệu - 3 triệu
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox className="rounded-[4px]" id="terms"/>
                                    <label
                                        htmlFor="terms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Từ 2 triệu - 3 triệu
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox className="rounded-[4px]" id="terms"/>
                                    <label
                                        htmlFor="terms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Từ 2 triệu - 3 triệu
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox className="rounded-[4px]" id="terms"/>
                                    <label
                                        htmlFor="terms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Từ 2 triệu - 3 triệu
                                    </label>
                                </div>

                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    )
}