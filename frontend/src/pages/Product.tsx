import {ProductSection} from "@/components/ProductSection/ProductSection.tsx";
import {ProductTypeRelation} from "@/components/ProductTypeRelation/ProductTypeRelation.tsx";
import {ProductCartPopup} from "@/components/ProductCartPopup/ProductCartPopup.tsx";

export function Product() {
    return (
        <div className="container-app">
            <ProductCartPopup />
            <ProductTypeRelation />
            <ProductSection />
        </div>
    )
}