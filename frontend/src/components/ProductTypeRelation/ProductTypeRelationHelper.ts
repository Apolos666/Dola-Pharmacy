import {productTypesWithChildrenResponse} from "@/model/ProductType.ts";

function findParent(data: productTypesWithChildrenResponse[], typeNameNormalized: string | undefined) {
    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        if (item.children && item.children.length > 0) {
            for (let j = 0; j < item.children.length; j++) {
                const child = item.children[j];
                if (child.TypeNameNormalized === typeNameNormalized) {
                    return item;
                }
            }
        }
    }

    return null;
}

export function GetProductTypeChildRelevant(productTypeWithChildren: productTypesWithChildrenResponse[] , typeNameNormalized: string | undefined) {
    if (typeNameNormalized === undefined)
        return productTypeWithChildren;

    const productType = productTypeWithChildren.find(ptwc => ptwc.TypeNameNormalized === typeNameNormalized);

    if (productType) {
        return productType.children;
    } else {
        const parent = findParent(productTypeWithChildren, typeNameNormalized);
        if (parent) {
            return parent.children;
        }
    }
}