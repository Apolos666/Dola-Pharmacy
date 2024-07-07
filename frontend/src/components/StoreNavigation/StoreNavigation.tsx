import {CategoryHeader} from "@/components/CategoryHeader/CategoryHeader.tsx";
import {Logo} from "@/components/Logo/Logo.tsx";
import {SearchHeader} from "@/components/SearchHeader/SearchHeader.tsx";
import {StoreSystemNavigation} from "@/components/StoreSystemNavigation/StoreSystemNavigation.tsx";
import {UserCart} from "@/components/UserCart/UserCart.tsx";
import {SheetNavigation} from "@/components/SheetNavigation/SheetNavigation.tsx";
import {HeaderMenu} from "@/components/HeaderMenu/HeaderMenu.tsx";

export function StoreNavigation() {
    return (
        <>
            {/* PC */}
            <div className="xl:flex flex-col hidden items-center justify-between gap-3 container-app">
                <div className="flex gap-16 items-center justify-between">
                    <div className="flex items-center w-9/12">
                        <Logo widthPercent="w-2/12"/>
                        <CategoryHeader widthPercent="w-3/12"/>
                        <SearchHeader widthPercent="w-7/12"/>
                    </div>
                    <div className="flex items-center gap-3 w-3/12 justify-end">
                        <StoreSystemNavigation/>
                        <UserCart/>
                    </div>
                </div>
                <div className="w-full mb-2">
                    <HeaderMenu/>
                </div>
            </div>

            {/* Tablet */}
            <div className="md:block xl:hidden hidden container-app">
                <div className="flex items-center justify-between gap-8">
                    <SheetNavigation/>
                    <Logo className="w-72"/>
                    <UserCart/>
                </div>
                <div className="my-4">
                    <CategoryHeader className="w-full"/>
                </div>
                <div className="my-4">
                    <SearchHeader/>
                </div>
            </div>

            {/* Mobile */}
            <div className="md:hidden block container-app">
                <div className="flex items-center justify-between gap-8">
                    <SheetNavigation/>
                    <Logo className=""/>
                    <UserCart/>
                </div>
                <div className="my-4">
                    <SearchHeader/>
                </div>
            </div>
        </>
    )
}