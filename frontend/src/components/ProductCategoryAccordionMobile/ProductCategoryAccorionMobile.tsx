import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.tsx";
import {Link} from "react-router-dom";
import {categoriesData, CategoryItemsData} from "@/components/CategoryHeaderPopup/CategoryHeaderPopupConfig.ts";

export function ProductCategoryAccorionMobile() {
    return (
        <>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="1" className="border-0">
                    <AccordionTrigger className="no-underline p-0">Sản phẩm</AccordionTrigger>
                    <AccordionContent>
                        <Accordion type="single" collapsible className="w-full">
                            {categoriesData.map((category, index) => (
                                <AccordionItem value={index.toString()} key={index} className="border-0">
                                    <AccordionTrigger
                                        className="no-underline pl-2 py-1">{category}</AccordionTrigger>
                                    <AccordionContent>
                                        {CategoryItemsData[category].map((item, index) => (
                                            <Link key={index} to="/" className="pl-4 py-1 block">{item.title}</Link>
                                        ))}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </>
    )
}