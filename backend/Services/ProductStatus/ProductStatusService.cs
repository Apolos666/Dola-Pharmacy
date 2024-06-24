using AutoMapper;
using backend.DTOs.ProductStatus;
using backend.Repositories.ProductStatus;
using backend.UnitOfWork;

namespace backend.Services.ProductStatus;

public class ProductStatusService(
    IUnitOfWork unitOfWork,
    IProductStatusRepository productStatusRepository,
    IMapper mapper)
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private readonly IProductStatusRepository _productStatusRepository = productStatusRepository;
    private readonly IMapper _mapper = mapper;
    
    public async Task<ResponseProductStatusDto> AddProductStatusAsync(string statusName)
    {
        var status = await _productStatusRepository.AddStatusAsync(statusName);
        var saved = await _unitOfWork.CommitAsync();
        
        if (saved <= 0)
            throw new Exception($"Failed to save status {statusName}");
        
        var responseProductStatusDto = _mapper.Map<ResponseProductStatusDto>(status);
        return responseProductStatusDto;
    }
}