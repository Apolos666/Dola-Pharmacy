import {Dispatch, SetStateAction} from "react";

export interface Sorting {
    column: string;
    order:  "asc" | "desc";
}

export interface Pagination {
    page: number;
    pageSize: number;
}

export interface Filters {
    [key: string]: string[];
}

export interface ProductSectionContextType {
    productTypeNameNormalized?: string | undefined;
    filters: Filters,
    setFilters: Dispatch<SetStateAction<Filters>>,
    sort: Sorting,
    setSort: Dispatch<SetStateAction<Sorting>>,
    pagination: Pagination,
    setPagination: Dispatch<SetStateAction<Pagination>>,
    buildQueryParams: () => string,
    setTotalCount: Dispatch<SetStateAction<number>>,
    totalPages: number,
}