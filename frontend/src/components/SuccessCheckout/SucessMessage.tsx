import React from "react";
import { CiCircleCheck } from "react-icons/ci";

export function SuccessMessage() {
    return (
        <div className="flex gap-2 items-center">
            <CiCircleCheck className="w-20 h-20" color="#8EC343" />
            <div className="text-[#333333] text-xl font-bold ">
                Cảm ơn bạn đã đặt hàng
            </div>
        </div>
    );
}