import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.tsx";
import {Link} from "react-router-dom";

export function ArticleAccordion() {
    return (
        <>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="1" className="border-0">
                    <AccordionTrigger className="no-underline p-0">Tin tức</AccordionTrigger>
                    <AccordionContent>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="1" className="border-0">
                                <Link to="/" className="pl-4 py-1 mt-1 block">Góc dinh dưỡng</Link>
                            </AccordionItem>
                            <AccordionItem value="2" className="border-0">
                                <Link to="/" className="pl-4 py-1 block">Góc khoẻ đẹp</Link>
                            </AccordionItem>
                        </Accordion>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </>
    )
}