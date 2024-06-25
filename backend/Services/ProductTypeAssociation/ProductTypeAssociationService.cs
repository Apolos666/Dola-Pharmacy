using backend.Repositories.Product;
using backend.Repositories.ProductType;
using backend.Repositories.ProductTypeAssociation;
using backend.UnitOfWork;

namespace backend.Services.ProductTypeAssociation;

public class ProductTypeAssociationService(
    IUnitOfWork unitOfWork,
    IProductRepository productRepository,
    IProductTypeRepository productTypeRepository,
    IProductTypeAssociationRepository productTypeAssociationRepository)
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private readonly IProductRepository _productRepository = productRepository;
    private readonly IProductTypeRepository _productTypeRepository = productTypeRepository;
    private readonly IProductTypeAssociationRepository _productTypeAssociationRepository = productTypeAssociationRepository;

    public async Task<Models.ProductTypeAssociation> AddProductTypeAssociationAsync(Guid productId, Guid productType)
    {
        var isProductExist = await _productRepository.CheckIfProductExists(productId);
        
        if (!isProductExist)
            throw new Exception($"Product with id {productId} does not exist");
        
        var isProductTypeExist = await _productTypeRepository.IsProductTypeExistAsync(productType);
        
        if (!isProductTypeExist)
            throw new Exception($"Product Type with id {productType} does not exist");
        
        var isProductTypeAssociationExist = await _productTypeAssociationRepository.IsProductTypeAssociationExistAsync(productId, productType);
        
        if (isProductTypeAssociationExist)
            throw new Exception($"Product Type Association already exists");
        
        var productTypeAssociation = _productTypeAssociationRepository.AddProductTypeAssociation(productId, productType);
        var saved = await _unitOfWork.CommitAsync();
        
        if (saved <= 0)
            throw new Exception("Error ocurred when trying to save ProductTypeAssociation");
        
        return productTypeAssociation;
    }
}