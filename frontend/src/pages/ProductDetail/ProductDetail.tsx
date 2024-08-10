import { useParams } from "react-router-dom";

interface ProductDetailProps { }

const ProductDetail = ({ }: ProductDetailProps) => {
    const {name} = useParams();

    return (
        <>

        </>
    );
};

export default ProductDetail;