import axios from "@/api/Base/axios.ts";
import {FilterData} from "@/components/ProductFilterSection/ProductFilterData.ts";
import {SystemError, UnknownError} from "@/api/Exception/ApiErrorException.ts";

async function GetTargetGroupListAsync(abortSignal: AbortSignal) {
    try {
        const result = await axios.get('/targetgroup/get-target-groups', {signal: abortSignal});
        const targetGroupFilters: FilterData[] = result.data.map((targetGroup) => {
            return {
                name: targetGroup.groupName,
                filterValue: targetGroup.groupName
            }
        })
        return targetGroupFilters;

    } catch (error) {
        switch (error.response.status) {
            case 500:
                throw new SystemError()
            default:
                throw new UnknownError()
        }
    }
}

export const TargetGroupApi = {
    GetTargetGroupListAsync
}