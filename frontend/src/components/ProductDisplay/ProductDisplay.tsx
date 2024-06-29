import {TbSortDescendingLetters} from "react-icons/tb";
import {Button} from "@/components/ui/button.tsx";
import {ProductCard} from "@/components/ProductCard/ProductCard.tsx";
import {ProductPagination} from "@/components/ProductPagination/ProductPagination.tsx";

export function ProductDisplay() {
    return (
        <>
            <div className="font-bold text-3xl">Tất cả sản phẩm</div>
            <div className="my-4">
                <div className="text-lg flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <TbSortDescendingLetters className="h-full text-3xl"/>
                        <div>Xếp theo:</div>
                    </div>
                    <Button
                        className="text-white bg-[#003CBF] rounded-[8px] hover:bg-[#003CBF] hover:text-white">Tên
                        A-Z</Button>
                    <Button
                        className="text-[#003CBF] border-[#003CBF] border-[1px] bg-white rounded-[8px] hover:bg-[#003CBF] hover:text-white">Tên
                        Z-A</Button>
                    <Button
                        className="text-[#003CBF] border-[#003CBF] border-[1px] bg-white rounded-[8px] hover:bg-[#003CBF] hover:text-white">Giá
                        thấp đến cao</Button>
                    <Button
                        className="text-[#003CBF] border-[#003CBF] border-[1px] bg-white rounded-[8px] hover:bg-[#003CBF] hover:text-white">Giá
                        cao xuống thấp</Button>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
                <ProductCard
                    imgUrl={"https://dolapharmacy.s3.ap-southeast-1.amazonaws.com/product-images/08cb8884-28fa-4bc6-ad36-d0d071030ddf-792af436-21b3-42ed-8980-003638b8b3f3"}/>
                <ProductCard
                    imgUrl={"https://dolapharmacy.s3.ap-southeast-1.amazonaws.com/product-images/129bf09d-e62a-4c1a-87d0-0d4e0a687f54-e5e45c38-1cef-4502-bcd1-f966ffba3c99"}/>
                <ProductCard
                    imgUrl={"https://dolapharmacy.s3.ap-southeast-1.amazonaws.com/product-images/08cb8884-28fa-4bc6-ad36-d0d071030ddf-792af436-21b3-42ed-8980-003638b8b3f3"}/>
                <ProductCard
                    imgUrl={"https://dolapharmacy.s3.ap-southeast-1.amazonaws.com/product-images/08cb8884-28fa-4bc6-ad36-d0d071030ddf-792af436-21b3-42ed-8980-003638b8b3f3"}/>
                <ProductCard
                    imgUrl={"https://dolapharmacy.s3.ap-southeast-1.amazonaws.com/product-images/08cb8884-28fa-4bc6-ad36-d0d071030ddf-792af436-21b3-42ed-8980-003638b8b3f3"}/>
                <ProductCard
                    imgUrl={"https://dolapharmacy.s3.ap-southeast-1.amazonaws.com/product-images/08cb8884-28fa-4bc6-ad36-d0d071030ddf-792af436-21b3-42ed-8980-003638b8b3f3"}/>
                <ProductCard
                    imgUrl={"https://dolapharmacy.s3.ap-southeast-1.amazonaws.com/product-images/08cb8884-28fa-4bc6-ad36-d0d071030ddf-792af436-21b3-42ed-8980-003638b8b3f3"}/>
                <ProductCard
                    imgUrl={"https://dolapharmacy.s3.ap-southeast-1.amazonaws.com/product-images/08cb8884-28fa-4bc6-ad36-d0d071030ddf-792af436-21b3-42ed-8980-003638b8b3f3"}/>
            </div>
            <div className="my-8">
                <ProductPagination/>
            </div>
        </>
    )
}