import {CategoryHeader} from "@/components/CategoryHeader/CategoryHeader.tsx";
import {Logo} from "@/components/Logo/Logo.tsx";
import {SearchHeader} from "@/components/SearchHeader/SearchHeader.tsx";
import {StoreSystemNavigation} from "@/components/StoreSystemNavigation/StoreSystemNavigation.tsx";
import {UserCart} from "@/components/UserCart/UserCart.tsx";
import {SheetNavigation} from "@/components/SheetNavigation/SheetNavigation.tsx";

export function StoreNavigation() {
    return (
        <>
            {/* PC */}
            <div className="xl:flex hidden items-center justify-between gap-16 container-app">
                <div className="flex items-center w-9/12">
                    <Logo widthPercent="w-2/12"/>
                    <CategoryHeader widthPercent="w-3/12"/>
                    <SearchHeader widthPercent="w-7/12"/>
                </div>
                <div className="flex items-center gap-3 w-3/12">
                    <StoreSystemNavigation/>
                    <UserCart/>
                </div>
            </div>

            {/* Mobile */}
            <div className="xl:hidden block container-app">
                <div className="flex items-center justify-between gap-8">
                    <SheetNavigation />
                    <Logo className=""/>
                    <UserCart />
                </div>
                <div className="my-4">
                    <SearchHeader />
                </div>
            </div>
        </>
    )
}