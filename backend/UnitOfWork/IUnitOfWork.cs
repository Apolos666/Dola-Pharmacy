namespace backend.UnitOfWork;

public interface IUnitOfWork
{
    Task<int> CommitAsync();
}