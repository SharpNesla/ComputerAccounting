using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SiberianGates.Model.Entities;
using SiberianGates.Model.Repositories;
using SiberianGates.Views;

namespace SiberianGates.Model
{
  public class JsonModel : IModel
  {
    public List<Employee> EmployeesList { get; set; }

    public JsonModel()
    {
      Employees = new EmployeeRepository(this, new Employee[] {new Employee {Name = "Алексей"}}.AsQueryable());
      Computers = new ComputerRepository(this, new Computer[] {new Computer()}.AsQueryable());
    }

    public void Load()
    {

    }

    public void Save()
    {
      
    }

    public EmployeeRepository Employees { get; }
    public ComputerRepository Computers { get; }
  }
}