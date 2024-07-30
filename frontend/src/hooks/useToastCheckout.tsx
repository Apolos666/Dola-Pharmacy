import {useToast} from "@/components/ui/use-toast.ts";
import {AddOrderDto} from "@/model/OrderType.ts";

export function useToastCheckout() {
    const { toast } = useToast();

    const fieldTranslations: { [key: string]: string } = {
        'CartItemsDto': 'Giỏ hàng',
        'Email': 'Email',
        'FullName': 'Họ tên',
        'PhoneNumber': 'Số điện thoại',
        'Address': 'Địa chỉ',
        'Province': 'Tỉnh/Thành phố',
        'District': 'Quận/Huyện',
        'Ward': 'Phường/Xã',
        'ShippingMethodId': 'Phương thức vận chuyển',
        'PaymentMethodId': 'Phương thức thanh toán'
    };

    function translateField(field: string): string {
        return fieldTranslations[field] || field;
    }

    function validateAddOrderDto(order: AddOrderDto): string[] {
        const requiredFields: (keyof AddOrderDto)[] = [
            'CartItemsDto',
            'Email',
            'FullName',
            'PhoneNumber',
            'Address',
            'Province',
            'District',
            'Ward',
            'ShippingMethodId',
            'PaymentMethodId'
        ];

        return requiredFields.filter(field => {
            const value = order[field];
            return value === undefined || value === null ||
                (Array.isArray(value) && value.length === 0) ||
                (typeof value === 'string' && (value.trim() === '' || value === '---'));
        }).map(translateField);
    }

    function handleToastCheckout(order: AddOrderDto): boolean {
        const invalidFields = validateAddOrderDto(order);

        console.log(invalidFields);
        console.log(order);

        if (invalidFields.length > 0) {
            toast({
                title: 'Có lỗi hiện tại đang xảy ra',
                description: `Vui lòng điền đầy đủ thông tin: ${invalidFields.join(', ')}`,
                className: 'bg-[#7F1D1D] text-white rounded-xl',
            });
            return false;
        }

        return true;
    }

    return {handleToastCheckout};
}