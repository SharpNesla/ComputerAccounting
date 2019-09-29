using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SiberianGates.Model.Entities;
using SiberianGates.Model.Repositories;

namespace SiberianGates.Model
{
  public class JsonModel : IModel
  {
    public JsonModel()
    {
      Employees = new EmployeeRepository(this, new Employee[]{new Employee{Name="Алексей"}}.AsQueryable());
    }

    public EmployeeRepository Employees { get; }
  }
}