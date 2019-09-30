using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SiberianGates.Model.Entities;

namespace SiberianGates.Model.Repositories
{
  public class ComputerRepository : RepositoryBase<Computer>
  {
    public ComputerRepository(IModel model, IQueryable<Computer> repositorySource) : base(model, repositorySource)
    {
    }
  }
}
