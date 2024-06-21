import {Menu, MenuData} from "@/components/HeaderMenu/HeaderMenuConfig.ts";
import {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {ProductCategoryMenu} from "@/components/ProductCategoryMenu/ProductCategoryMenu.tsx";
import {ArticleMenu} from "@/components/ArticleMenu/ArticleMenu.tsx";

export function HeaderMenu() {
    const [selectedMenu, setSelectedMenu] = useState<Menu>(Menu.TrangChu);

    // Todo: Boc nó vào trong thẻ Link
    function NormalButton(menu: Menu, index: number) {
        return <Button
            key={index}
            onClick={() => setSelectedMenu(menu)}
            className={`
                        ${selectedMenu === menu ?
                "text-[#5dac46] bg-white hover:text-[#5dac46] hover:bg-white" :
                "text-white hover:text-[#5dac46] hover:bg-white"} 
                        rounded-[8px] font-semibold
                        `}
        >{menu}</Button>
    }

    const getSelectedMenu = (menu: Menu, index: number) => {
        switch (menu){
            case Menu.TinTuc:
                return <ArticleMenu key={index} menu={menu} selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu}/>
            case Menu.SanPham:
                return <ProductCategoryMenu key={index} menu={menu} selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu}/>
            default:
                return NormalButton(menu, index)
        }
    }

    return (
        <>
            <div className="flex items-center justify-start w-full gap-1">
                {MenuData.map((menu, index) => (
                    getSelectedMenu(menu, index)
                ))}
            </div>
        </>
    )
}