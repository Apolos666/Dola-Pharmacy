import { createContext } from "react";
import { ProductSectionContextType } from "@/components/ProductSection/ProductSectionConfig.ts";

export const ProductSectionContext = createContext<ProductSectionContextType | undefined>(undefined);