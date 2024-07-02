import {Dispatch, SetStateAction} from "react";

export interface Filters {
    [key: string]: string[];
}

export interface ProductSectionContextType {
    filters: Filters,
    setFilters: Dispatch<SetStateAction<Filters>>
}