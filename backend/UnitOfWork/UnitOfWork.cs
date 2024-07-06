using backend.Data;
using Microsoft.EntityFrameworkCore.Storage;

namespace backend.UnitOfWork;

public class UnitOfWork(DbFactory dbFactory) : IUnitOfWork, IDisposable
{
    private IDbContextTransaction? _currentTransaction;

    public Task<int> CommitAsync()
    {
        return dbFactory.DbContext.SaveChangesAsync();
    }

    public async Task BeginTransactionAsync()
    {
        if (_currentTransaction != null)
        {
            throw new InvalidOperationException("There is already an active transaction.");
        }

        _currentTransaction = await dbFactory.DbContext.Database.BeginTransactionAsync();
    }

    public async Task CommitTransactionAsync()
    {
        if (_currentTransaction != null)
        {
            await _currentTransaction.CommitAsync();
            await _currentTransaction.DisposeAsync();
            _currentTransaction = null;
        }
        else
        {
            throw new InvalidOperationException("No transaction in progress.");
        }
    }

    public async Task RollbackTransactionAsync()
    {
        if (_currentTransaction != null)
        {
            await _currentTransaction.RollbackAsync();
            await _currentTransaction.DisposeAsync();
            _currentTransaction = null;
        }
        else
        {
            throw new InvalidOperationException("No transaction in progress.");
        }
    }
    
    public void Dispose()
    {
        if (_currentTransaction != null)
        {
            _currentTransaction.Dispose();
            _currentTransaction = null;
        };
    }
}