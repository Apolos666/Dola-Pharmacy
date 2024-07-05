import {Pagination, PaginationContent, PaginationItem} from "@/components/ui/pagination.tsx";
import {Button} from "@/components/ui/button.tsx";
import {MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight} from "react-icons/md";
import {FaEllipsisH} from "react-icons/fa";
import {Fragment, useContext} from "react";
import {ProductSectionContext} from "@/components/ProductSection/ProductSectionContext.ts";

export function ProductPagination() {
    const context = useContext(ProductSectionContext);

    if (!context) throw new Error("ProductSectionContext is not provided");

    const { pagination, totalPages, setPagination } = context;

    function createPaginationItem(pageNumber: number, isCurrentPage: boolean) {
        return (
            <PaginationItem key={pageNumber} className={isCurrentPage ? "border-[1px] rounded-[8px] bg-[#1B74E7] text-white text-xl" : "border-black border-[1px] rounded-[8px] text-xl"}>
                <Button
                    variant="none"
                    onClick={() => setPagination({ ...pagination, page: pageNumber })}
                >
                    {pageNumber}
                </Button>
            </PaginationItem>
        );
    }

    function getPageNavigation() {
        let pages = [];

        if (pagination.page === 1) {
            for (let i = 1; i <= Math.min(3, totalPages); i++) {
                pages.push(createPaginationItem(i, pagination.page === i));
            }
            if (totalPages > 3) {
                pages.push(
                    <PaginationItem key="ellipsis" className="border-black border-[1px] rounded-[8px] text-xl">
                        <Button variant="none">
                            <FaEllipsisH />
                        </Button>
                    </PaginationItem>
                );
            }
        } else if (pagination.page === totalPages) {
            if (totalPages > 3) {
                pages.push(
                    <PaginationItem key="ellipsis" className="border-black border-[1px] rounded-[8px] text-xl">
                        <Button variant="none">
                            <FaEllipsisH />
                        </Button>
                    </PaginationItem>
                );
            }
            for (let i = Math.max(1, totalPages - 2); i <= totalPages; i++) {
                pages.push(createPaginationItem(i, pagination.page === i));
            }
        } else {
            pages.push(
                createPaginationItem(pagination.page - 1, false),
                createPaginationItem(pagination.page, true),
                createPaginationItem(pagination.page + 1, false)
            );
            if (pagination.page + 1 < totalPages) {
                pages.push(
                    <PaginationItem key="ellipsis" className="border-black border-[1px] rounded-[8px] text-xl">
                        <Button variant="none">
                            <FaEllipsisH />
                        </Button>
                    </PaginationItem>
                );
            }
        }

        return pages;
    }

    return (
        <>
            <Pagination className="scale-[0.85]">
                <PaginationContent className="font-bold">
                    {pagination.page > 1 && (
                        <PaginationItem className="border-black border-[1px] rounded-[8px]">
                            <Button
                                variant="none"
                                onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
                            >
                                <MdOutlineKeyboardArrowLeft className="text-xl" />
                            </Button>
                        </PaginationItem>
                    )}
                    {getPageNavigation().map((page, index) => (
                        <Fragment key={index}>
                            {page}
                        </Fragment>
                    ))}
                    {pagination.page < totalPages && (
                        <PaginationItem className="border-black border-[1px] rounded-[8px]">
                            <Button
                                variant="none"
                                onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
                            >
                                <MdOutlineKeyboardArrowRight className="text-xl" />
                            </Button>
                        </PaginationItem>
                    )}
                </PaginationContent>
            </Pagination>
        </>
    );
}