using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SiberianGates.Model.Entities;

namespace SiberianGates.Model.Repositories
{
  public class EmployeeRepository : RepositoryBase<Employee>
  {
    public EmployeeRepository(IModel model, IQueryable<Employee> repositorySource) : base(model, repositorySource)
    {
    }
  }
}
