export enum Category {
    DuocPham = "Dược phẩm",
    ChamSocSucKhoe = "Chăm sóc sức khỏe",
    ChamSocCaNhan = "Chăm sóc cá nhân",
    SanPhamTienLoi = "Sản phẩm tiện lợi",
    ThucPhamChucNang = "Thực phẩm chức năng",
    MeVaBe = "Mẹ và bé",
    ChamSocSacDep = "Chăm sóc sắc đẹp",
    ThietBiYTe = "Thiết bị y tế",
    KhuyenMaiHot = "Khuyến mãi Hot",
}

export const categoriesData: Category[] = [
    Category.DuocPham,
    Category.ChamSocSucKhoe,
    Category.ChamSocCaNhan,
    Category.SanPhamTienLoi,
    Category.ThucPhamChucNang,
    Category.MeVaBe,
    Category.ChamSocSacDep,
    Category.ThietBiYTe,
    Category.KhuyenMaiHot,
];

type CategoryItems = {
    src: string;
    title: string;
}

export const CategoryItemsData: Record<Category, CategoryItems[]> = {
    [Category.DuocPham]: [
        {
            src: "/Category/thuoc-ko-ke-don.webp",
            title: "Thuốc không kê đơn"
        },
    ],
    [Category.ChamSocSucKhoe]: [
        {
            src: "/Category/2-04thuc-pham-dinh-duong-2-04-nu.webp",
            title: "Thực phẩm dinh dưỡng"
        },
        {
            src: "/Category/2-06-dung-cu-so-cuu-2-06-first-a.webp",
            title: "Dụng cụ sơ cứu"
        },
        {
            src: "/Category/2-08-cham-soc-mattaimui-2-08-for.webp",
            title: "Chăm sóc Mắt/Tai/Mũi"
        },
        {
            src: "/Category/2-09-cham-soc-chan-2-09-foot-car.webp",
            title: "Chăm sóc chân"
        },
        {
            src: "/Category/2-10-khau-trang-y-te-2-10-medica.webp",
            title: "Khẩu trang y tế"
        },
        {
            src: "/Category/2-11.webp",
            title: "Chống muỗi"
        },
        {
            src: "/Category/2-12.webp",
            title: "Dầu tràm, dầu xoa bóp"
        },
    ],
    [Category.ChamSocCaNhan]: [
        {
            src: "/Category/3-02-san-pham-phong-tam-3-02-bat.webp",
            title: "Sản phẩm phòng tắm"
        },
        {
            src: "/Category/3-04-san-pham-khu-mui-3-04-deodo.webp",
            title: "Sản phẩm khử mùi"
        }
        ,
        {
            src: "/Category/3-05-cham-soc-toc-3-05-hair-care.webp",
            title: "Chăm sóc tóc"
        }
        ,
        {
            src: "/Category/3-06-ve-sinh-phu-nu-3-06-feminin.webp",
            title: "Vệ sinh phụ nữ"
        }
        ,
        {
            src: "/Category/3-07-cham-soc-nam-gioi-3-07-men.webp",
            title: "Chăm sóc nam giới"
        }
        ,
        {
            src: "/Category/3-08-cham-soc-rang-mieng-3-08-or.webp",
            title: "Chăm sóc răng miệng"
        }
        ,
        {
            src: "/Category/3-03-cham-soc-co-the-3-03-body-c.webp",
            title: "Chăm sóc cơ thể"
        }
    ],
    [Category.SanPhamTienLoi]: [
        {
            src: "/Category/5-01-hang-tong-hop-5-01-general.webp",
            title: "Hàng tổng hợp"
        },
        {
            src: "/Category/hang-bach-hoa.webp",
            title: "Hàng bách hóa"
        }
    ],
    [Category.ThucPhamChucNang] : [
        {
            src: "/Category/6-01-6-01-tpcn-nhom-tieu-hoa-6-0.webp",
            title: "TPCN Nhóm dạ dày"
        },
        {
            src: "/Category/6-02-6-02-tpcn-nhom-tim-mach-h.webp",
            title: "TPCN Nhóm tim mạch"
        },
        {
            src: "/Category/6-02-03-6-02-03-tpcn-nhom-duong.webp",
            title: "TPCN Nhóm đường huyết"
        },
        {
            src: "/Category/6-03-6-03-tpcn-nhom-ho-hap-6-03.webp",
            title: "TPCN Nhóm hô hấp"
        },
        {
            src: "/Category/6-04-6-04-tpcn-nhom-than-kinh-6.webp",
            title: "TPCN Nhóm thần kinh"
        },
        {
            src: "/Category/6-05-6-05-tpcn-nhom-co-xuong-kh.webp",
            title: "TPCN Nhóm cơ xương khớp"
        },
        {
            src: "/Category/6-06-6-06-tpcn-giam-can-6-06-vms.webp",
            title: "TPCN Giảm cân"
        },
        {
            src: "/Category/6-17.webp",
            title: "TPCN Chăm sóc sắc đẹp"
        },
        {
            src: "/Category/6-08-6-08-tpcn-cham-soc-suc-khoe.webp",
            title: "TPCN Chăm sóc sức khỏe"
        },
        {
            src: "/Category/6-09-6-09-tpcn-nhom-mattaimui-6.webp",
            title: "TPCN Nhóm Mắt/Tai/Mũi"
        },
        {
            src: "/Category/6-10-6-10-tpcn-vitamin-tong-hop.webp",
            title: "TPCN Vitamin tổng hợp"
        },
        {
            src: "/Category/6-11.webp",
            title: "TPCN Chăm sóc tóc"
        },{
            src: "/Category/6-14-6-14-tpcn-nhom-khac-6-14-vm.webp",
            title: "TPCN Nhóm khác"
        },
        {
            src: "/Category/6-15-6-15-tpcn-cho-gan-6-15-vms.webp",
            title: "TPCN Cho gan"
        },
    ],
    [Category.MeVaBe]: [
        {
            src: "/Category/photo-2021-08-23-21-10-35-8080.webp",
            title: "Chăm sóc em bé"
        },
        {
            src: "/Category/6-12-6-12-tpcn-danh-cho-tre-em-6.webp",
            title: "TPCN dành cho trẻ em"
        },
        {
            src: "/Category/photo-2021-08-23-21-08-20.webp",
            title: "Sản phẩm dành cho mẹ"
        },
        {
            src: "/Category/6-16.webp",
            title: "TPCN dành cho phụ nữ mang thai"
        },
    ],
    [Category.ChamSocSacDep]: [
        {
            src: "/Category/4-01-cham-soc-mat-4-01-face-care.webp",
            title: "Chăm sóc mặt"
        },
        {
            src: "/Category/4-02-san-pham-chong-nang-4-02-su.webp",
            title: "Sản phẩm chống nắng"
        },
        {
            src: "/Category/4-03-dung-cu-lam-dep-4-03-beauty.webp",
            title: "Dụng cụ làm đẹp"
        },
        {
            src: "/Category/2-01-duoc-my-pham-2-01-dermo-ski.webp",
            title: "Dược - Mỹ phẩm"
        },
    ],
    [Category.ThietBiYTe]: [
        {
            src: "/Category/2-05-01-nhiet-ke-2-05-01-thermom.webp",
            title: "Nhiệt kế"
        },
        {
            src: "/Category/2-05-02-may-do-huyet-ap-2-05-02.webp",
            title: "Máy đo huyết áp"
        },
        {
            src: "/Category/2-05-03-may-do-duong-huyet-2-05.webp",
            title: "Máy đo đường huyết"
        },
        {
            src: "/Category/2-05-04-may-xong-khi-dung-2-05-0.webp",
            title: "Máy xông khí dung"
        },
        {
            src: "/Category/2-05-05-thiet-bi-y-te-khac-2-05.webp",
            title: "Thiết bị y tế khác"
        },
        {
            src: "/Category/cat-dung-cu-kiem-tra.webp",
            title: "Dụng cụ kiểm tra"
        },
    ],
    [Category.KhuyenMaiHot]: []
}