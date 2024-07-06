import {ProductSection} from "@/components/ProductSection/ProductSection.tsx";
import {ProductTypeRelation} from "@/components/ProductTypeRelation/ProductTypeRelation.tsx";

export function Product() {
    return (
        <div className="container-app">
            <ProductTypeRelation />
            <ProductSection />
        </div>
    )
}