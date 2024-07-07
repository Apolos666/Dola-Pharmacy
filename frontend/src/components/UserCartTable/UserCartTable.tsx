import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Button} from "@/components/ui/button.tsx";

export function UserCartTable() {
    return (
        <>
            <div className="p-2 border-[1.5px] border-gray-300 rounded-[5px]">
                <div>
                    <Table>
                        <TableHeader>
                            <TableRow className="border-[1px] border-gray-200">
                                <TableHead className="font-bold">Thông tin sản phẩm</TableHead>
                                <TableHead className="font-bold">Đơn giá</TableHead>
                                <TableHead className="font-bold">Số lượng</TableHead>
                                <TableHead className="font-bold">Thành tiền</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="border-[1px] border-gray-200">
                            <TableRow>
                                <TableCell>
                                    <div
                                        className="xl:w-[400px] flex items-center gap-3 border-b-gray-200">
                                        <div className="w-[20%]">
                                            <img className="w-full"
                                                 src="/Category/2-01-duoc-my-pham-2-01-dermo-ski.webp"
                                                 alt=""/>
                                        </div>
                                        <div className="w-[80%]">
                                            <div
                                                className="text-[13px] font-bold text-left hover:text-[#1b74e7] transition-all">Nhụy
                                                hoa nghệ tây Sasagold Saffron hỗ trợ làm đẹp và phù hợp
                                                cho người bệnh (1g)
                                            </div>
                                            <Button
                                                className="text-[#1b74e7] font-semibold flex justify-start p-0"
                                            >Xoá</Button>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-[#5dac46] font-bold">438.000₫</TableCell>
                                <TableCell>
                                    <div
                                        className="flex items-center border-[1px] border-[#1b74e7] min-h-7 float-left p-1 rounded-[5px]">
                                        <Button
                                            size="none" variant="none"
                                            className="bg-[#1b74e7] hover:bg-[#003cbf] rounded-[5px] px-3 py-1 text-white transition-all"
                                        >-</Button>
                                        <div className="mx-3">2</div>
                                        <Button
                                            size="none" variant="none"
                                            className="bg-[#1b74e7] hover:bg-[#003cbf] rounded-[5px] px-3 py-1 text-white transition-all"
                                        >+</Button>
                                    </div>
                                </TableCell>
                                <TableCell className="text-[#5dac46] font-bold">876.000₫</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <div
                                        className="xl:w-[400px] flex items-center gap-3 border-b-gray-200">
                                        <div className="w-[20%]">
                                            <img className="w-full"
                                                 src="/Category/2-01-duoc-my-pham-2-01-dermo-ski.webp"
                                                 alt=""/>
                                        </div>
                                        <div className="w-[80%]">
                                            <div
                                                className="text-[13px] font-bold text-left hover:text-[#1b74e7] transition-all">Nhụy
                                                hoa nghệ tây Sasagold Saffron hỗ trợ làm đẹp và phù hợp
                                                cho người bệnh (1g)
                                            </div>
                                            <Button
                                                className="text-[#1b74e7] font-semibold flex justify-start p-0"
                                            >Xoá</Button>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-[#5dac46] font-bold">438.000₫</TableCell>
                                <TableCell>
                                    <div
                                        className="flex items-center border-[1px] border-[#1b74e7] min-h-7 float-left p-1 rounded-[5px]">
                                        <Button
                                            size="none" variant="none"
                                            className="bg-[#1b74e7] hover:bg-[#003cbf] rounded-[5px] px-3 py-1 text-white transition-all"
                                        >-</Button>
                                        <div className="mx-3">2</div>
                                        <Button
                                            size="none" variant="none"
                                            className="bg-[#1b74e7] hover:bg-[#003cbf] rounded-[5px] px-3 py-1 text-white transition-all"
                                        >+</Button>
                                    </div>
                                </TableCell>
                                <TableCell className="text-[#5dac46] font-bold">876.000₫</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <div
                                        className="xl:w-[400px] flex items-center gap-3 border-b-gray-200">
                                        <div className="w-[20%]">
                                            <img className="w-full"
                                                 src="/Category/2-01-duoc-my-pham-2-01-dermo-ski.webp"
                                                 alt=""/>
                                        </div>
                                        <div className="w-[80%]">
                                            <div
                                                className="text-[13px] font-bold text-left hover:text-[#1b74e7] transition-all">Nhụy
                                                hoa nghệ tây Sasagold Saffron hỗ trợ làm đẹp và phù hợp
                                                cho người bệnh (1g)
                                            </div>
                                            <Button
                                                className="text-[#1b74e7] font-semibold flex justify-start p-0"
                                            >Xoá</Button>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-[#5dac46] font-bold">438.000₫</TableCell>
                                <TableCell>
                                    <div
                                        className="flex items-center border-[1px] border-[#1b74e7] min-h-7 float-left p-1 rounded-[5px]">
                                        <Button
                                            size="none" variant="none"
                                            className="bg-[#1b74e7] hover:bg-[#003cbf] rounded-[5px] px-3 py-1 text-white transition-all"
                                        >-</Button>
                                        <div className="mx-3">2</div>
                                        <Button
                                            size="none" variant="none"
                                            className="bg-[#1b74e7] hover:bg-[#003cbf] rounded-[5px] px-3 py-1 text-white transition-all"
                                        >+</Button>
                                    </div>
                                </TableCell>
                                <TableCell className="text-[#5dac46] font-bold">876.000₫</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <div
                                        className="xl:w-[400px] flex items-center gap-3 border-b-gray-200">
                                        <div className="w-[20%]">
                                            <img className="w-full"
                                                 src="/Category/2-01-duoc-my-pham-2-01-dermo-ski.webp"
                                                 alt=""/>
                                        </div>
                                        <div className="w-[80%]">
                                            <div
                                                className="text-[13px] font-bold text-left hover:text-[#1b74e7] transition-all">Nhụy
                                                hoa nghệ tây Sasagold Saffron hỗ trợ làm đẹp và phù hợp
                                                cho người bệnh (1g)
                                            </div>
                                            <Button
                                                className="text-[#1b74e7] font-semibold flex justify-start p-0"
                                            >Xoá</Button>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-[#5dac46] font-bold">438.000₫</TableCell>
                                <TableCell>
                                    <div
                                        className="flex items-center border-[1px] border-[#1b74e7] min-h-7 float-left p-1 rounded-[5px]">
                                        <Button
                                            size="none" variant="none"
                                            className="bg-[#1b74e7] hover:bg-[#003cbf] rounded-[5px] px-3 py-1 text-white transition-all"
                                        >-</Button>
                                        <div className="mx-3">2</div>
                                        <Button
                                            size="none" variant="none"
                                            className="bg-[#1b74e7] hover:bg-[#003cbf] rounded-[5px] px-3 py-1 text-white transition-all"
                                        >+</Button>
                                    </div>
                                </TableCell>
                                <TableCell className="text-[#5dac46] font-bold">876.000₫</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <div
                                        className="xl:w-[400px] flex items-center gap-3 border-b-gray-200">
                                        <div className="w-[20%]">
                                            <img className="w-full"
                                                 src="/Category/2-01-duoc-my-pham-2-01-dermo-ski.webp"
                                                 alt=""/>
                                        </div>
                                        <div className="w-[80%]">
                                            <div
                                                className="text-[13px] font-bold text-left hover:text-[#1b74e7] transition-all">Nhụy
                                                hoa nghệ tây Sasagold Saffron hỗ trợ làm đẹp và phù hợp
                                                cho người bệnh (1g)
                                            </div>
                                            <Button
                                                className="text-[#1b74e7] font-semibold flex justify-start p-0"
                                            >Xoá</Button>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-[#5dac46] font-bold">438.000₫</TableCell>
                                <TableCell>
                                    <div
                                        className="flex items-center border-[1px] border-[#1b74e7] min-h-7 float-left p-1 rounded-[5px]">
                                        <Button
                                            size="none" variant="none"
                                            className="bg-[#1b74e7] hover:bg-[#003cbf] rounded-[5px] px-3 py-1 text-white transition-all"
                                        >-</Button>
                                        <div className="mx-3">2</div>
                                        <Button
                                            size="none" variant="none"
                                            className="bg-[#1b74e7] hover:bg-[#003cbf] rounded-[5px] px-3 py-1 text-white transition-all"
                                        >+</Button>
                                    </div>
                                </TableCell>
                                <TableCell className="text-[#5dac46] font-bold">876.000₫</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <div
                                        className="xl:w-[400px] flex items-center gap-3 border-b-gray-200">
                                        <div className="w-[20%]">
                                            <img className="w-full"
                                                 src="/Category/2-01-duoc-my-pham-2-01-dermo-ski.webp"
                                                 alt=""/>
                                        </div>
                                        <div className="w-[80%]">
                                            <div
                                                className="text-[13px] font-bold text-left hover:text-[#1b74e7] transition-all">Nhụy
                                                hoa nghệ tây Sasagold Saffron hỗ trợ làm đẹp và phù hợp
                                                cho người bệnh (1g)
                                            </div>
                                            <Button
                                                className="text-[#1b74e7] font-semibold flex justify-start p-0"
                                            >Xoá</Button>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-[#5dac46] font-bold">438.000₫</TableCell>
                                <TableCell>
                                    <div
                                        className="flex items-center border-[1px] border-[#1b74e7] min-h-7 float-left p-1 rounded-[5px]">
                                        <Button
                                            size="none" variant="none"
                                            className="bg-[#1b74e7] hover:bg-[#003cbf] rounded-[5px] px-3 py-1 text-white transition-all"
                                        >-</Button>
                                        <div className="mx-3">2</div>
                                        <Button
                                            size="none" variant="none"
                                            className="bg-[#1b74e7] hover:bg-[#003cbf] rounded-[5px] px-3 py-1 text-white transition-all"
                                        >+</Button>
                                    </div>
                                </TableCell>
                                <TableCell className="text-[#5dac46] font-bold">876.000₫</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <div
                                        className="xl:w-[400px] flex items-center gap-3 border-b-gray-200">
                                        <div className="w-[20%]">
                                            <img className="w-full"
                                                 src="/Category/2-01-duoc-my-pham-2-01-dermo-ski.webp"
                                                 alt=""/>
                                        </div>
                                        <div className="w-[80%]">
                                            <div
                                                className="text-[13px] font-bold text-left hover:text-[#1b74e7] transition-all">Nhụy
                                                hoa nghệ tây Sasagold Saffron hỗ trợ làm đẹp và phù hợp
                                                cho người bệnh (1g)
                                            </div>
                                            <Button
                                                className="text-[#1b74e7] font-semibold flex justify-start p-0"
                                            >Xoá</Button>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-[#5dac46] font-bold">438.000₫</TableCell>
                                <TableCell>
                                    <div
                                        className="flex items-center border-[1px] border-[#1b74e7] min-h-7 float-left p-1 rounded-[5px]">
                                        <Button
                                            size="none" variant="none"
                                            className="bg-[#1b74e7] hover:bg-[#003cbf] rounded-[5px] px-3 py-1 text-white transition-all"
                                        >-</Button>
                                        <div className="mx-3">2</div>
                                        <Button
                                            size="none" variant="none"
                                            className="bg-[#1b74e7] hover:bg-[#003cbf] rounded-[5px] px-3 py-1 text-white transition-all"
                                        >+</Button>
                                    </div>
                                </TableCell>
                                <TableCell className="text-[#5dac46] font-bold">876.000₫</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
                <div className="flex justify-end mt-4">
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between">
                            <div className="font-medium text-[15px]">Tổng tiền:</div>
                            <div className="text-[#5dac46] font-bold">3.200.000₫</div>
                        </div>
                        <Button variant="none"
                                className="bg-[#1b74e7] hover:bg-[#003cbf] text-white rounded-[6px] transition-all px-28">Thanh
                            toán
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}