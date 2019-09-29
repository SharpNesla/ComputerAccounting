using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using SiberianGates.Model.Entities;

namespace SiberianGates.Model.Repositories
{
  public interface IRepositorySource<out TEntity> where TEntity : EntityBase
  {
    IQueryable<TEntity> Get();
  }

  public abstract class RepositoryBase<TEntity> where TEntity : EntityBase
  {
    private readonly IQueryable<TEntity> _repositorySource;
    private readonly string[] _searchStringCriterias;

    protected RepositoryBase(IModel model, IQueryable<TEntity> queryable, string[] searchStringCriterias = null)
    {
      _searchStringCriterias = searchStringCriterias;
      this._repositorySource = queryable;
      this.Model = model;
    }

    protected IModel Model { get; set; }


    public virtual IReadOnlyList<TEntity> Get(int offset, int limit, bool includeDeleted,
      Expression<Func<TEntity, bool>> filterDefinition)
    {

      var wheredef = this._repositorySource
        .Where(x => !includeDeleted || x.DeletionDate != default(DateTime));
      if (filterDefinition != null)
      {
        return wheredef
          .Where(filterDefinition)
          .ToList();
      }
      else
      {
        return wheredef.ToList();
      }
    }

    public virtual long GetCount(Expression<Func<TEntity, bool>> filterDefinition = null)
    {
      return this._repositorySource
        .LongCount(x => x.DeletionDate != default(DateTime));
    }

    public void Add(TEntity entity)
    {
      try
      {
        entity.Id = this._repositorySource
                      .OrderByDescending(x => x.Id)
                      .First().Id + 1;
      }
      catch
      {
        entity.Id = 0;
      }

      this._repositorySource.Concat(new []{entity});
    }

    public virtual TEntity GetById(long id)
    {
      return _repositorySource.First(x => x.Id == id);
    }

    public virtual void Update(TEntity entity)
    {
      //TODO Придумать более рациональный алгоритм
      this._repositorySource.Where(x => entity.Id == x.Id).Select(x => entity);
    }
  }
}