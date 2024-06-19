import {useToast} from "@/components/ui/use-toast.ts";
import {ResponseMessage} from "@/model/ResponseMessage.ts";
import {useEffect, useState} from "react";

export function useHandleToastResponse() {
    const { toast } = useToast();
    const [response, setResponse] = useState<ResponseMessage | null>(null);

    useEffect(() => {
        if (response) {
            toast({
                title: response.type === "success" ? "Thành công" : "Có lỗi hiện tại đang xảy ra",
                description: response.message,
                className: response.type === "success" ? 'bg-emerald-400 text-white rounded-xl' : 'bg-[#7F1D1D] text-white rounded-xl',
            });
        }
    }, [response, toast]);

    return setResponse;
}