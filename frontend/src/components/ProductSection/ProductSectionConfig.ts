import {Dispatch, SetStateAction} from "react";

interface Filters {
    [key: string]: string[];
}

export interface ProductSectionContextType {
    filters: Filters,
    setFilters: Dispatch<SetStateAction<Filters>>
}