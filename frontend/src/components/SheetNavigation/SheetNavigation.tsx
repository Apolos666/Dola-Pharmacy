import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet.tsx";
import {GiHamburgerMenu} from "react-icons/gi";
import {Logo} from "@/components/Logo/Logo.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";
import {
    ProductCategoryAccorionMobile
} from "@/components/ProductCategoryAccordionMobile/ProductCategoryAccorionMobile.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {ArticleAccordion} from "@/components/ArticleAccordion/ArticleAccordion.tsx";

export function SheetNavigation() {
    return (
        <>
            <Sheet>
                <SheetTrigger>
                    <div className="p-1 bg-[#003CBF] rounded-[4px]">
                        <GiHamburgerMenu className="text-white text-3xl"/>
                    </div>
                </SheetTrigger>
                <SheetContent side={"left"} className="bg-white px-0">
                    <ScrollArea className="h-[600px]">
                        <Logo className="mt-3 px-10"/>
                        <div className="w-full border-y-[#003CBF] border-y-[1px] my-2">
                            <div className="my-2 mx-2 flex justify-between gap-2">
                                <Button
                                    className="bg-[#1B74E7] hover:bg-[#1B74E7] text-white w-1/2 rounded-[8px] py-5 flex flex-col justify-center">
                                    <Link to="/account/register" className="text-base font-medium">Đăng ký</Link>
                                </Button>
                                <Button
                                    className="bg-[#1B74E7] hover:bg-[#1B74E7] text-white w-1/2 rounded-[8px] py-5 flex flex-col justify-center">
                                    <Link to="/account/login" className="text-base font-medium">Đăng nhập</Link>
                                </Button>
                            </div>
                            <div className="my-2 mx-2">
                                <Button
                                    className="bg-[#1B74E7] hover:bg-[#1B74E7] w-full text-white rounded-[8px] py-5 flex flex-col justify-center">
                                    <Link to="/" className="text-base font-medium">Menu chính</Link>
                                </Button>
                            </div>
                            <div className="my-3 mx-2">
                                <Link to="/" className="text-base font-medium">Trang chủ</Link>
                            </div>
                            <div className="my-3 mx-2">
                                <Link to="/" className="text-base font-medium">Giới thiệu</Link>
                            </div>
                            <div className="my-3 mx-2">
                                <ProductCategoryAccorionMobile/>
                            </div>
                            <div className="my-3 mx-2">
                                <Link to="/" className="text-base font-medium">Sản phẩm khuyến mãi</Link>
                            </div>
                            <div className="my-3 mx-2">
                                <ArticleAccordion/>
                            </div>
                            <div className="my-3 mx-2">
                                <Link to="/" className="text-base font-medium">Video</Link>
                            </div>
                            <div className="my-3 mx-2">
                                <Link to="/" className="text-base font-medium">Câu hỏi thường gặp</Link>
                            </div>
                            <div className="my-3 mx-2">
                                <Link to="/" className="text-base font-medium">Liên hệ</Link>
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="my-3 mx-2">
                                <Link to="/" className="text-base font-medium">Hệ thống cửa hàng</Link>
                            </div>
                            <div className="my-3 mx-2">
                                <Link to="/" className="text-base font-medium">Sản phẩm yêu thích</Link>
                            </div>
                        </div>
                    </ScrollArea>
                </SheetContent>
            </Sheet>
        </>
    )
}