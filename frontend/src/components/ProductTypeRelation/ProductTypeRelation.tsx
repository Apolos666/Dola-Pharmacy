import {Card, CardContent} from "@/components/ui/card.tsx";
import {Link, useParams} from "react-router-dom";
import {useProductType} from "@/hooks/Entity/useProductType.tsx";
import {GetProductTypeChildRelevant} from "@/components/ProductTypeRelation/ProductTypeRelationHelper.ts";

export function ProductTypeRelation() {
    const {productTypeNameNormalized} = useParams();
    const {productTypeWithChildren} = useProductType();

    if (!productTypeWithChildren) {
        return null;
    }

    const productTypeChildRelevant = GetProductTypeChildRelevant(productTypeWithChildren, productTypeNameNormalized);

    return (
        <>
            <div className="flex items-center gap-3 overflow-x-auto h-24 mt-4 scrollbar scrollbar-thumb-blue-400 scrollbar-track-blue-200 scrollbar-thumb-rounded-full scrollbar-h-2">
                {productTypeChildRelevant?.map((productType, productTypeIndex) => (
                    <Link to={`/products/${productType.TypeNameNormalized}`} key={productTypeIndex} className="block h-full">
                        <Card className="min-w-52 h-full rounded-[8px] shadow-card">
                            <CardContent className="p-4 h-full">
                                <div className="flex items-center h-full">
                                    <div>
                                        <img src={productType.ImagePath} alt=""/>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-sm">{productType.TypeName}</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </>
    );
}