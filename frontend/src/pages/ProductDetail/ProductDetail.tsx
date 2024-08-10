import { useParams } from "react-router-dom";

interface ProductDetailProps { }

const ProductDetail = ({ }: ProductDetailProps) => {
    const {productNameNormalized} = useParams();

    return (
        <>

        </>
    );
};

export default ProductDetail;