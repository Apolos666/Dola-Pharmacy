using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;
using backend.Utilities.PhoneNumber;
using Microsoft.AspNetCore.Identity;

namespace backend.Models;

[Table("Orders")]
public class Order
{
    public Order()
    {
        OrderItems = new HashSet<OrderItem>();
    }
    
    [Key] public Guid OrderId { get; init; }
    [Required] public string UserId { get; init; } = null!;
    [Required] [StringLength(50)] [EmailAddress] public string Email { get; init; } = null!;
    [Required] [StringLength(50)] public string FullName { get; init; } = null!;
    [Required] [StringLength(50)] [Phone] public string PhoneNumber { get; init; } = null!;
    [Required] [StringLength(150)] public string Address { get; set; } = null!;
    [Required] [StringLength(50)] public string Province { get; set; } = null!;
    [Required] [StringLength(50)] public string District { get; set; } = null!;
    [Required] [StringLength(50)] public string Ward { get; set; } = null!;
    [StringLength(150)] public string? Note { get; init; }
    [Required] public Guid ShippingMethodId { get; init; }
    [Required] public Guid PaymentMethodId { get; init; }
    public Guid? CouponId { get; init; }
    [Required] public DateTime OrderDate { get; init; }
    [Required] public TimeSpan DeliveryTime { get; set; }
    
    [ForeignKey(nameof(UserId))] public virtual ApplicationIdentityUser User { get; init; } = null!;
    [ForeignKey(nameof(ShippingMethodId))] public virtual ShippingMethod ShippingMethod { get; init; } = null!;
    [ForeignKey(nameof(PaymentMethodId))] public virtual PaymentMethod PaymentMethod { get; init; } = null!;
    [ForeignKey(nameof(CouponId))] public virtual Coupon Coupon { get; init; } = null!;
    public virtual ICollection<OrderItem> OrderItems { get; init; }
    
    public static Order Create(string userId, string email, string fullName, string phoneNumber, string address, string province, string district, string ward, string note, Guid shippingMethodId, Guid paymentMethodId, Guid? couponId, DateTime orderDate, TimeSpan deliveryTime)
    {
        if (string.IsNullOrEmpty(userId))
        {
            throw new ArgumentException("UserId is required.", nameof(userId));
        }

        if (string.IsNullOrEmpty(email) || !new EmailAddressAttribute().IsValid(email))
        {
            throw new ArgumentException("Valid Email is required.", nameof(email));
        }

        if (string.IsNullOrEmpty(fullName) || fullName.Length > 50)
        {
            throw new ArgumentException("FullName is required and must be less than or equal to 50 characters.", nameof(fullName));
        }

        if (string.IsNullOrEmpty(phoneNumber) || !new PhoneAttribute().IsValid(phoneNumber))
        {
            throw new ArgumentException("Valid PhoneNumber is required.", nameof(phoneNumber));
        }

        if (string.IsNullOrEmpty(address) || address.Length > 150)
        {
            throw new ArgumentException("Address is required and must be less than or equal to 150 characters.", nameof(address));
        }

        if (string.IsNullOrEmpty(province) || province.Length > 50)
        {
            throw new ArgumentException("Province is required and must be less than or equal to 50 characters.", nameof(province));
        }

        if (string.IsNullOrEmpty(district) || district.Length > 50)
        {
            throw new ArgumentException("District is required and must be less than or equal to 50 characters.", nameof(district));
        }

        if (string.IsNullOrEmpty(ward) || ward.Length > 50)
        {
            throw new ArgumentException("Ward is required and must be less than or equal to 50 characters.", nameof(ward));
        }

        if (string.IsNullOrEmpty(note) || note.Length > 150)
        {
            throw new ArgumentException("Note is required and must be less than or equal to 150 characters.", nameof(note));
        }

        return new Order
        {
            OrderId = Guid.NewGuid(),
            UserId = userId,
            Email = email,
            FullName = fullName,
            PhoneNumber = phoneNumber,
            Address = address,
            Province = province,
            District = district,
            Ward = ward,
            Note = note,
            ShippingMethodId = shippingMethodId,
            PaymentMethodId = paymentMethodId,
            CouponId = couponId,
            OrderDate = orderDate,
            DeliveryTime = deliveryTime,
            OrderItems = new HashSet<OrderItem>()
        };
    }
}

public class OrderBuilder()
{
    private Guid _orderId = Guid.NewGuid();
    private string _userId;
    private string _email;
    private string _fullName;
    private string _phoneNumber;
    private string _address;
    private string _province;
    private string _district;
    private string _ward;
    private string _note;
    private Guid _shippingMethodId;
    private Guid _paymentMethodId;
    private Guid? _couponId;
    private DateTime _orderDate;
    private TimeSpan _deliveryTime;
    
    public OrderBuilder SetUserId(string userId)
    {
        if (string.IsNullOrEmpty(userId))
        {
            throw new ArgumentException("UserId is required.", nameof(userId));
        }
        
        _userId = userId;
        return this;
    }

    public OrderBuilder SetEmail(string email)
    {
        if (string.IsNullOrEmpty(email) || !new EmailAddressAttribute().IsValid(email))
        {
            throw new ArgumentException("Valid Email is required.", nameof(email));
        }
        
        _email = email;
        return this;
    }

    public OrderBuilder SetFullName(string fullName)
    {
        if (string.IsNullOrEmpty(fullName) || fullName.Length > 50)
        {
            throw new ArgumentException("FullName is required and must be less than or equal to 50 characters.", nameof(fullName));
        }
        
        _fullName = fullName;
        return this;
    }

    public OrderBuilder SetPhoneNumber(string phoneNumber, string defaultCountryCode = "VN")
    {
        string countryCode;
        try
        {
            countryCode = PhoneNumberHelper.GetCountryCodeFromPhoneNumber(phoneNumber);
        }
        catch (ArgumentException)
        {
            countryCode = defaultCountryCode; // Use default country code if unable to determine
        }

        if (!PhoneNumberHelper.IsValidPhoneNumber(phoneNumber, countryCode))
        {
            throw new ArgumentException("Valid PhoneNumber is required.", nameof(phoneNumber));
        }

        _phoneNumber = phoneNumber;
        return this;
    }

    public OrderBuilder SetAddress(string address)
    {
        if (string.IsNullOrEmpty(address) || address.Length > 150)
        {
            throw new ArgumentException("Address is required and must be less than or equal to 150 characters.", nameof(address));
        }
        
        _address = address;
        return this;
    }

    public OrderBuilder SetProvince(string province)
    {
        if (string.IsNullOrEmpty(province) || province.Length > 50)
        {
            throw new ArgumentException("Province is required and must be less than or equal to 50 characters.", nameof(province));
        }
        
        _province = province;
        return this;
    }

    public OrderBuilder SetDistrict(string district)
    {
        if (string.IsNullOrEmpty(district) || district.Length > 50)
        {
            throw new ArgumentException("district is required and must be less than or equal to 50 characters.", nameof(district));
        }
        
        _district = district;
        return this;
    }

    public OrderBuilder SetWard(string ward)
    {
        if (string.IsNullOrEmpty(ward) || ward.Length > 50)
        {
            throw new ArgumentException("ward is required and must be less than or equal to 50 characters.", nameof(ward));
        }
        
        _ward = ward;
        return this;
    }

    public OrderBuilder SetNote(string note)
    {
        _note = note;
        return this;
    }

    public OrderBuilder SetShippingMethodId(string shippingMethodId)
    {
        if (Guid.TryParse(shippingMethodId, out var parsedShippingMethodId))
        {
            _shippingMethodId = parsedShippingMethodId;
        }
        else
        {
            throw new ArgumentException("ShippingMethodId is required.", nameof(shippingMethodId));
        }
        return this;
    }

    public OrderBuilder SetPaymentMethodId(string paymentMethodId)
    {
        if (Guid.TryParse(paymentMethodId, out var parsedPaymentMethodId))
        {
            _paymentMethodId = parsedPaymentMethodId;
        }
        else
        {
            throw new ArgumentException("PaymentMethodId is required.", nameof(paymentMethodId));
        }
        return this;
    }

    public OrderBuilder SetCouponId(string couponId)
    {
        if (Guid.TryParse(couponId, out var parsedCouponId))
        {
            _couponId = parsedCouponId;
        }
        return this;
    }

    public OrderBuilder SetOrderDate(string orderDate)
    {
        if (DateTime.TryParse(orderDate, CultureInfo.InvariantCulture, DateTimeStyles.AdjustToUniversal, out var parsedOrderDate))
        {
            _orderDate = DateTime.SpecifyKind(parsedOrderDate, DateTimeKind.Utc);
        }
        else
        {
            throw new ArgumentException("OrderDate is required and must be a valid UTC date.", nameof(orderDate));
        }
        return this;
    }

    public OrderBuilder SetDeliveryTime(string deliveryTime)
    {
        if (TimeSpan.TryParse(deliveryTime, out var parsedDeliveryTime))
        {
            _deliveryTime = parsedDeliveryTime;
        }
        else
        {
            throw new ArgumentException("DeliveryTime is required.", nameof(deliveryTime));
        }
        return this;
    }
    
    public Order Build()
    {
        return new Order
        {
            OrderId = _orderId,
            UserId = _userId,
            Email = _email,
            FullName = _fullName,
            PhoneNumber = _phoneNumber,
            Address = _address,
            Province = _province,
            District = _district,
            Ward = _ward,
            Note = _note,
            ShippingMethodId = _shippingMethodId,
            PaymentMethodId = _paymentMethodId,
            CouponId = _couponId,
            OrderDate = _orderDate,
            DeliveryTime = _deliveryTime,
        };
    }
}