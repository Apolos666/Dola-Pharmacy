using AutoMapper;
using backend.DTOs.Brand;
using backend.Repositories.Brand;
using backend.UnitOfWork;

namespace backend.Services.Brand;

public class BrandService(IUnitOfWork unitOfWork, IBrandRepository brandRepository, IMapper mapper)
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private readonly IBrandRepository _brandRepository = brandRepository;
    private readonly IMapper _mapper = mapper;

    public async Task<ResponseBrandDto> AddBrand(string branchName)
    {
        var brand = _brandRepository.AddBrand(branchName);
        var saved = await _unitOfWork.CommitAsync();
        
        if (saved <= 0)
            throw new Exception($"Failed to save brand {brand}");
        
        var responseBrandDto = _mapper.Map<ResponseBrandDto>(brand);
        return responseBrandDto;
    }
}