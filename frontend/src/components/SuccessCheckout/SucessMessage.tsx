import { CiCircleCheck } from "react-icons/ci";

export function SuccessMessage({ className }: { className: string }) {
  return (
    <div className={`flex gap-2 items-center ${className}`}>
      <CiCircleCheck className="w-20 h-20" color="#8EC343" />
      <div className="text-[#333333] text-xl font-bold ">
        Cảm ơn bạn đã đặt hàng
      </div>
    </div>
  );
}
