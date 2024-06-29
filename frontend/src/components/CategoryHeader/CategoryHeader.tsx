import {
    Dialog,
    DialogContent,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {GiHamburgerMenu} from "react-icons/gi";
import {CategoryHeaderPopup} from "@/components/CategoryHeaderPopup/CategoryHeaderPopup.tsx";

export function CategoryHeader({widthPercent, className}: {widthPercent?: string, className?: string}) {
    return (
        <>
            <div className={`${widthPercent}`}>
                <Dialog>
                    <DialogTrigger asChild className={`${className} px-10 rounded-[10px] relative`}>
                        <Button className="bg-white text-black font-bold hover:bg-[#003CBF] hover:text-white">
                            <GiHamburgerMenu className="text-xl mr-2 mb-1"/>
                            <p className="h-full">Danh mục</p>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="absolute xl:top-[55%] xl:left-[40%] md:top-[70%] md:left-[50%] md:w-[90%] bg-white border-white md:p-2 !rounded-[10px] max-w-screen-lg">
                        <CategoryHeaderPopup />
                    </DialogContent>
                </Dialog>
            </div>
        </>
    )
}