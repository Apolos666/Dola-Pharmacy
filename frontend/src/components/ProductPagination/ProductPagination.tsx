import {Pagination, PaginationContent, PaginationItem} from "@/components/ui/pagination.tsx";
import {Button} from "@/components/ui/button.tsx";
import {MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight} from "react-icons/md";
import {FaEllipsisH} from "react-icons/fa";

export function ProductPagination() {
    return (
        <>
            <Pagination className="scale-[0.85]">
                <PaginationContent className="font-bold">
                    <PaginationItem className="border-black border-[1px] rounded-[8px]">
                        <Button variant="none">
                            <MdOutlineKeyboardArrowLeft className="text-xl"/>
                        </Button>
                    </PaginationItem>
                    <PaginationItem className="border-[1px] rounded-[8px] bg-[#1B74E7] text-white text-xl">
                        <Button variant="none">1</Button>
                    </PaginationItem>
                    <PaginationItem className="border-black border-[1px] rounded-[8px] text-xl hover:text-white hover:bg-[#1B74E7] hover:border-white transition-all">
                        <Button variant="none">2</Button>
                    </PaginationItem>
                    <PaginationItem className="border-black border-[1px] rounded-[8px] text-xl">
                        <Button variant="none">3</Button>
                    </PaginationItem>
                    <PaginationItem className="border-black border-[1px] rounded-[8px] text-xl">
                        <Button variant="none">
                            <FaEllipsisH />
                        </Button>
                    </PaginationItem>
                    <PaginationItem className="border-black border-[1px] rounded-[8px]">
                        <Button variant="none">
                            <MdOutlineKeyboardArrowRight className="text-xl"/>
                        </Button>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </>
    )
}