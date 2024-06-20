import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet.tsx";
import {GiHamburgerMenu} from "react-icons/gi";

export function SheetNavigation() {
    return (
        <>
            <Sheet>
                <SheetTrigger>
                    <div className="p-1 bg-[#003CBF] rounded-[4px]">
                        <GiHamburgerMenu className="text-white text-3xl"/>
                    </div>
                </SheetTrigger>
                <SheetContent side={"left"}>
                    <SheetHeader>
                        <SheetTitle>Are you absolutely sure?</SheetTitle>
                        <SheetDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </>
    )
}