import axios from "@/api/Base/axios.ts";
import {SystemError, UnknownError} from "@/api/Exception/ApiErrorException.ts";
import {ProductPagedList} from "@/components/ProductDisplay/ProductDisplayConfig.ts";

async function GetProductsAsync(query: string ,abortSignal: AbortSignal) {
    try {
        const result = await axios.get(`/product/get-products?${query}`, {signal: abortSignal});
        const productPagedList: ProductPagedList = {
            hasNextPage: result.data.hasNextPage,
            hasPreviousPage: result.data.hasPreviousPage,
            page: result.data.page,
            pageSize: result.data.pageSize,
            totalCount: result.data.totalCount,
            items: result.data.items.map(item => {
                return {
                    brandId: item.brandId,
                    buyingGuide: item.buyingGuide,
                    description: item.description,
                    price: item.price,
                    productId: item.productId,
                    productName: item.productName,
                    statusId: item.statusId,
                    weight: item.weight,
                    productImages: item.productImages.map(image => {
                        return {
                            imageUrl: image.imageUrl
                        }
                    })
                }
            })
        }
        return productPagedList;
    } catch (error) {
        switch (error.response.status) {
            case 500:
                throw new SystemError()
            default:
                throw new UnknownError()
        }
    }
}

export const ProductApi = {
    GetProductsAsync
}