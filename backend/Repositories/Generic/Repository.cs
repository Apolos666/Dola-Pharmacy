using System.Linq.Expressions;
using backend.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories.Generic;

public class Repository<T> : IRepository<T> where T : class
{
    private readonly DbFactory _dbFactory;
    private DbSet<T> _dbSet;
    
    protected DbSet<T> DbSet => _dbSet ??= _dbFactory.DbContext.Set<T>();
    
    public Repository(DbFactory dbFactory)
    {
        _dbFactory = dbFactory;
    }
    
    public void Add(T entity)
    {
        DbSet.Add(entity);
    }

    public void AddRange(IEnumerable<T> entities)
    {
        DbSet.AddRange(entities);
    }

    public void Update(T entity)
    {
        DbSet.Update(entity);
    }

    public void Delete(T entity)
    {
        DbSet.Remove(entity);
    }

    public async Task<List<T>> GetAlls()
    {
        return await DbSet.AsNoTracking().ToListAsync();
    }

    public async Task<T?> GetById(Guid id)
    {
        return await DbSet.FindAsync(id);
    }

    public IQueryable<T> List(Expression<Func<T, bool>> expression)
    {
        return DbSet.Where(expression);
    }
}