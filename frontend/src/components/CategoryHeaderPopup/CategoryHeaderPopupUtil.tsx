import {Category} from "@/components/CategoryHeaderPopup/CategoryHeaderPopupConfig.ts";
import {Card} from "@/components/ui/card.tsx";

// Todo: sẽ tạo một cái hold data sẽ có img src và tên loại
// Sau đó sẽ se map ra phần tử cần thiết
// Nghiên cứu cách tạo kích thước thích hợp cho phần tử popup nữa
export function GetItemsElementBasedonCategory(category: Category) {
    switch (category) {
        case Category.DuocPham:
            return <>
                <Card className="flex items-center px-10">
                    <div>
                        <img src="" alt=""/>
                    </div>
                    <div>
                        Thuốc không kê đơn
                    </div>
                </Card>
            </>;
        case Category.ChamSocSucKhoe:
            return <>
                <Card className="flex items-center px-10">
                    <div>
                        <img src="" alt=""/>
                    </div>
                    <div>
                        Thực phẩm dinh dưỡng
                    </div>
                </Card>
                <Card className="flex items-center px-10">
                    <div>
                    </div>
                    <img src="" alt=""/>
                    <div>
                        Dụng cụ sơ cứu
                    </div>
                </Card>
                <Card className="flex items-center px-10">
                    <div>
                        <img src="" alt=""/>
                    </div>
                    <div>
                        Dụng cụ sơ cứu
                    </div>
                </Card>
                <Card className="flex items-center px-10">
                    <div>
                        <img src="" alt=""/>
                    </div>
                    <div>
                        Dụng cụ sơ cứu
                    </div>
                </Card>
            </>;
        case Category.ChamSocCaNhan:
            return <div>Items</div>;
        case Category.SanPhamTienLoi:
            return <div>Items</div>;
        case Category.ThucPhamChucNang:
            return <div>Items</div>;
        case Category.MeVaBe:
            return <div>Items</div>;
        case Category.ChamSocSacDep:
            return <div>Items</div>;
        case Category.ThietBiYTe:
            return <div>Items</div>;
        case Category.KhuyenMaiHot:
            return <div>Items</div>;
    }
}