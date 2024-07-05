import {SystemError, UnknownError} from "@/api/Exception/ApiErrorException.ts";
import axios from "@/api/Base/axios.ts";
import {FilterData} from "@/components/ProductFilterSection/ProductFilterData.ts";

async function GetBrandListAsync(abortSignal: AbortSignal) {
    try {
        const result = await axios.get('/brand/get-brands', {signal: abortSignal});
        const brandFilters: FilterData[] = result.data.map((brand) => {
            return {
                name: brand.brandName,
                filterValue: brand.brandName
            }
        })
        return brandFilters;

    } catch (error) {
        switch (error.response.status) {
            case 500:
                throw new SystemError()
            default:
                throw new UnknownError()
        }
    }
}

export const BrandApi = {
    GetBrandListAsync
}