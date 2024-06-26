using backend.Models;
using backend.Repositories.Product;
using backend.Repositories.ProductTargetGroup;
using backend.Repositories.TargetGroup;
using backend.UnitOfWork;

namespace backend.Services.ProductTargetGroupService;

public class ProductTargetGroupService(
    IUnitOfWork unitOfWork,
    IProductRepository productRepository,
    ITargetGroupRepository targetGroupRepository,
    IProductTargetGroupRepository productTargetGroupRepository)
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private readonly IProductRepository _productRepository = productRepository;
    private readonly ITargetGroupRepository _targetGroupRepository = targetGroupRepository;
    private readonly IProductTargetGroupRepository _productTargetGroupRepository = productTargetGroupRepository;
    
    public async Task<ProductTargetGroup> AddProductTargetGroupAsync(Guid productId, Guid groupId)
    {
        var isProductExist = await _productRepository.CheckIfProductExists(productId);
        
        if (!isProductExist)
            throw new Exception($"Product with id {productId} does not exist");
        
        var isGroupExist = await _targetGroupRepository.IsTargetGroupExistAsync(groupId);
        
        if (!isGroupExist)
            throw new Exception($"Group with id {groupId} does not exist");
        
        var isProductTargetGroupExist = await _productTargetGroupRepository.IsProductTargetGroupExistAsync(productId, groupId);
        
        if (isProductTargetGroupExist)
            throw new Exception($"ProductTargetGroup with productId {productId} and groupId {groupId} already exists");
        
        var productTargetGroup = _productTargetGroupRepository.AddProductTargetGroup(productId, groupId);
        var saved = await _unitOfWork.CommitAsync();
        
        if (saved <= 0)
            throw new Exception($"Cannot save ProductTargetGroup to database");
        return productTargetGroup;
    }

    public async Task<bool> DeleteProductTargetGroupAsync(Guid productId, Guid groupId)
    {
        var productTargetGroup = await _productTargetGroupRepository.GetProductTargetGroupAsync(productId, groupId);
        
        if (productTargetGroup is null)
            throw new Exception($"ProductTargetGroup with productId {productId} and groupId {groupId} does not exist");
        
        _productTargetGroupRepository.Delete(productTargetGroup);
        var saved = await _unitOfWork.CommitAsync();
        
        if (saved <= 0)
            throw new Exception($"Cannot delete ProductTargetGroup from database");
        
        return true;
    }
}