import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.tsx";
import {Link} from "react-router-dom";
import {useProductType} from "@/hooks/Entity/useProductType.tsx";

export function ProductCategoryAccorionMobile() {
    const { productTypeWithChildren }  = useProductType()

    return (
        <>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="1" className="border-0">
                    <AccordionTrigger className="no-underline p-0">Sản phẩm</AccordionTrigger>
                    <AccordionContent>
                        <Accordion type="single" collapsible className="w-full">
                            {productTypeWithChildren?.map((productType, productTypeIndex) => (
                                <AccordionItem value={productTypeIndex.toString()} key={productTypeIndex} className="border-0">
                                    <AccordionTrigger
                                        className="no-underline pl-2 py-1">{productType.TypeName}</AccordionTrigger>
                                    <AccordionContent>
                                        {productType.children.map((productTypeChildren, productTypeChildrenIndex) => (
                                            <Link key={productTypeChildrenIndex} to={`/products/${productTypeChildren.TypeNameNormalized}`} className="pl-4 py-1 block">{productTypeChildren.TypeName}</Link>
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