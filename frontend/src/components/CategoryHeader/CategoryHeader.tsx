import {
    Dialog,
    DialogContent,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {GiHamburgerMenu} from "react-icons/gi";
import {CategoryHeaderPopup} from "@/components/CategoryHeaderPopup/CategoryHeaderPopup.tsx";

export function CategoryHeader({widthPercent}: {widthPercent: string}) {
    return (
        <>
            <div className={`${widthPercent}`}>
                <Dialog>
                    <DialogTrigger asChild className="px-10 rounded-[10px]">
                        <Button className="bg-white text-black font-bold hover:bg-[#003CBF] hover:text-white">
                            <GiHamburgerMenu className="text-xl mr-2 mb-1"/>
                            <p>Danh mục</p>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md bg-white border-white !rounded-[10px]">
                        <CategoryHeaderPopup />
                    </DialogContent>
                </Dialog>
            </div>
        </>
    )
}