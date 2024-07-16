export type AddOrderDto = {
    CartItemsDto: CartItemDto[];
}

type CartItemDto = {
    CartId: string,
    ProductId: string,
    Quantity: number
}