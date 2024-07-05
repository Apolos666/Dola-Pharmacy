import {Button} from "@/components/ui/button.tsx";
import {MdClose} from "react-icons/md";
import {FaRegCircleCheck} from "react-icons/fa6";

export function ProductCartPopup() {
    return (
        <>
            <div className="fixed top-0 left-0 z-10 opacity-50 w-full h-screen bg-[#363636]">
            </div>
            <div
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 max-w-[450px] rounded-[7px] border-[1px] border-[#1b74e7]">
                <div
                    className="flex items-center justify-between bg-[#1b74e7] rounded-t-[7px] text-white px-3 py-2">
                    <div className="flex items-center">
                        <FaRegCircleCheck className="text-xl"/>
                        <div className="font-semibold ml-2">Mua hàng thành công</div>
                    </div>
                    <Button variant="none" size="none">
                        <MdClose className="text-2xl"/>
                    </Button>
                </div>
                <div className="flex items-center bg-white py-5 border-b-[#1b74e7] border-b-[1px]">
                    <div className="w-[20%] flex justify-center">
                        <img className="w-[70px]" src="/Category/6-15-6-15-tpcn-cho-gan-6-15-vms.webp" alt=""/>
                    </div>
                    <div className="w-[80%]">
                        <div className="font-bold text-sm">Siro Top Grow Jpanwell hỗ trợ tăng cường sức khỏe, sức đề
                            kháng ở trẻ em (10 chai x 30ml)
                        </div>
                        <div className="font-semibold text-[#5dac46]">890.000₫</div>
                    </div>
                </div>
                <div>
                    <div className="px-3 py-2 bg-white rounded-b-[7px]">
                        <div className="text-sm font-medium mb-2">Giỏ hàng của bạn hiện có <span
                            className="text-[#1b74e7]">8</span> sản phẩm
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <Button variant="none" size="none"
                                    className="bg-[#003cbf] text-white px-2 py-3 rounded-[5px]">Tiếp tục mua
                                hàng</Button>
                            <Button variant="none" size="none"
                                    className="bg-[#1b74e7] text-white px-2 py-3 rounded-[5px]">Thanh toán
                                ngay</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}