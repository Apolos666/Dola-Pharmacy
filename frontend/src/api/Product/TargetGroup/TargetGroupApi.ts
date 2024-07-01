import axios from "@/api/Base/axios.ts";
import {FilterData} from "@/components/ProductFilterSection/ProductFilterData.ts";
import {SystemError, UnknownError} from "@/api/Exception/ApiErrorException.ts";

async function GetTargetGroupListAsync(abortSignal: AbortSignal) {
    try {
        const result = await axios.get('/targetgroup/get-target-groups', {signal: abortSignal});
        const targetGroupFilters: FilterData[] = result.data.map((targetGroup) => {
            return {
                name: targetGroup.groupName,
                filterValue: convertString(targetGroup.groupName)
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

function convertString(input: string) {
    return input
        .normalize('NFD') // Decompose Unicode characters
        .replace(/[\u0300-\u036f]/g, '') // Remove diacritical marks
        .replace(/đ/g, 'd') // Map specific characters
        .replace(/Đ/g, 'D') // Handle uppercase if needed
        .replace(/[^a-zA-Z0-9\s]/g, '') // Remove special characters
        .replace(/\s+/g, '') // Remove spaces
        .toLowerCase();
}

export const TargetGroupApi = {
    GetTargetGroupListAsync
}