export type ProductPagedList = {
    hasNextPage: boolean,
    hasPreviousPage: boolean,
    items: Product[],
    page: number,
    pageSize: number,
    totalCount: number,
}

export type Product = {
    brandId: string,
    buyingGuide: string,
    description: string,
    price: number,
    productId: string,
    productName: string,
    statusId: string,
    weight: number,
    productImages: ProductImage[]
}

export type ProductImage = {
    imageUrl: "string"
}