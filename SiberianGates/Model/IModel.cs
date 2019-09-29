using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SiberianGates.Model.Repositories;

namespace SiberianGates.Model
{
  public interface IModel
  {
    EmployeeRepository Employees { get; }
  }
}