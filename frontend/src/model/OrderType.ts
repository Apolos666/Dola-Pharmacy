export type AddOrderDto = {
    CartItemsDto: CartItemDto[];
    Email: string;
    FullName: string;
    PhoneNumber: string;
    Address: string;
    Province: string;
    District: string;
    Ward: string;
    Note?: string;
    ShippingMethodId: string;
    PaymentMethodId: string;
    CouponId?: string;
}

type CartItemDto = {
    ProductId: string,
    Quantity: number
}