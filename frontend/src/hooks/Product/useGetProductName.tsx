import { axiosPrivate } from "@/api/Base/axios";
import { useQuery } from "@tanstack/react-query";

type useGetProductNameProps = { 
    productNameNormalized: string | undefined;
}

const useGetProductName = ({ productNameNormalized }: useGetProductNameProps) => {
    const { data: product, error, isLoading } = useQuery({
        queryKey: ["getProductName", productNameNormalized], 
        queryFn: async () => {
            const product = await axiosPrivate.get(`/product/get-product/${productNameNormalized}`);
            return product.data;
        },
        enabled: !!productNameNormalized, 
    });

    return { product, error, isLoading };
};

export default useGetProductName;