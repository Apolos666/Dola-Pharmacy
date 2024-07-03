import {SystemError, UnknownError} from "@/api/Exception/ApiErrorException.ts";
import axios from "@/api/Base/axios.ts";
import {productTypeResponse} from "@/model/ProductType.ts";

async function GetProductTypeByTypeNameNormalized(typeNameNormalized: string ,abortSignal: AbortSignal) {
    try {
        const result = await axios.get(`/producttype/get-product-type/${typeNameNormalized}`, {signal: abortSignal});
        const productTypeResponse: productTypeResponse = {
            TypeName: result.data.typeName,
            TypeNameNormalized: result.data.typeNameNormalized,
            ImagePath: result.data.imagePath,
            parentId: result.data.parentId,
            typeId: result.data.typeId
        }
        return productTypeResponse;

    } catch (error) {
        switch (error.response.status) {
            case 500:
                throw new SystemError()
            default:
                throw new UnknownError()
        }
    }
}

export const ProductTypeApi = {
    GetProductTypeByTypeNameNormalized
}