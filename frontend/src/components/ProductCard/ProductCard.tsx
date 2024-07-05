import {Card, CardContent} from "@/components/ui/card.tsx";
import {TbShoppingBagPlus} from "react-icons/tb";
import {Product} from "@/components/ProductDisplay/ProductDisplayConfig.ts";

type ProductProps = {
    product: Product;
}

export function ProductCard({product}: ProductProps) {
    const truncateNumber: number = 40;

    function truncateString(str: string, num: number) {
        if (str.length <= num) {
            return str
        }
        return str.slice(0, num) + '...'
    }

    return (
        <>
            <Card
                className="rounded-[6px] border-2 cursor-pointer group hover:border-[#003CBF] hover:shadow-custom transition-all duration-300">
                <CardContent className="p-2">
                    <div className="w-full overflow-hidden py-8">
                        <img
                            src={product.productImages[0].imageUrl}
                            alt=""
                            className="block xl:w-2/3 md:w-full w-2/3 mx-auto group-hover:scale-[1.1] transition-all duration-300"
                        />
                    </div>
                    <div
                        className="text-[#4B494A] font-bold group-hover:text-[#003CBF] transition-all">{truncateString(product.productName, truncateNumber)}
                    </div>
                    <div className="my-2 flex justify-between">
                        <div className="text-[#8AC379] font-bold text-xl">
                            {product.price.toLocaleString()}₫
                        </div>
                        <div className="p-2 bg-[#1b74e7] rounded-full mt-4 hover:-translate-y-2 hover:bg-[#003CBF] transition-all duration-300">
                            <TbShoppingBagPlus className="text-2xl text-white"/>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}