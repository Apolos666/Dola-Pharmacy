using backend.DTOs.ShippingMethod;
using backend.Repositories.ShippingMethod;
using backend.UnitOfWork;

namespace backend.Services.ShippingMethod;

public class ShippingMethodService(IShippingMethodRepository shippingMethodRepository, IUnitOfWork unitOfWork)
{
    private readonly IShippingMethodRepository _shippingMethodRepository = shippingMethodRepository;
    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    public async Task<Models.ShippingMethod?> AddShippingMethodAsync(AddShippingMethodDto addShippingMethodDto)
    {
        var shippingMethod =
            Models.ShippingMethod.Create(addShippingMethodDto.MethodName, addShippingMethodDto.ShippingCost);
        _shippingMethodRepository.Add(shippingMethod);
        await _unitOfWork.CommitAsync();
        return shippingMethod;
    }
    
    public async Task<List<Models.ShippingMethod>> GetAllShippingMethodsAsync()
    {
        return await _shippingMethodRepository.GetAlls();
    }
    
    public async Task<Models.ShippingMethod?> GetShippingMethodByIdAsync(Guid shippingMethodId)
    {
        return await _shippingMethodRepository.GetById(shippingMethodId);
    }
}