using System.Linq.Expressions;

namespace backend.Repositories.Generic;

public interface IRepository<T> where T : class
{
    void Add(T entity);
    void Update(T entity);
    void Delete(T entity);
    Task<List<T>> GetAlls();
    Task<T?> GetById(Guid id);
    IQueryable<T> List(Expression<Func<T, bool>> expression);
}