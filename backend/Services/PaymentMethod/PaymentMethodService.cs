using backend.DTOs.PaymentMethodDto;
using backend.Repositories.PaymentMethod;
using backend.UnitOfWork;

namespace backend.Services.PaymentMethod;

public class PaymentMethodService(IPaymentMethodRepository paymentMethodRepository, IUnitOfWork unitOfWork)
{
    private readonly IPaymentMethodRepository _paymentMethodRepository = paymentMethodRepository;
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    
    public async Task<Models.PaymentMethod> AddPaymentMethodAsync(AddPaymentMethodDto addPaymentMethodDto)
    {
        var paymentMethod = Models.PaymentMethod.Create(addPaymentMethodDto.MethodName);
        _paymentMethodRepository.Add(paymentMethod);
        await _unitOfWork.CommitAsync();
        return paymentMethod;
    }
    
    public async Task<List<Models.PaymentMethod>> GetAllPaymentMethodsAsync()
    {
        return await _paymentMethodRepository.GetAlls();
    }
}