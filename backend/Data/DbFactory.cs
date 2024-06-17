using Microsoft.EntityFrameworkCore;

namespace backend.Data;

public class DbFactory : IDisposable
{
    private bool _disposed;
    private Func<ApplicationDbContext> _instanceFunc;
    private DbContext _dbContext;
    public DbContext DbContext => _dbContext ??= _instanceFunc.Invoke();
    
    public DbFactory(Func<ApplicationDbContext> instanceFunc)
    {
        _instanceFunc = instanceFunc;
    }
    
    public void Dispose()
    {
        if (!_disposed && _dbContext != null)
        {
            _disposed = true;
            _dbContext.Dispose();
        }
    }
}