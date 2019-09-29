using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SiberianGates.Model.Repositories;
using SiberianGates.Utils.Controls.Grids;

namespace SiberianGates.Model.Entities
{
  public enum Gender
  {
    Male,
    Female,
    Undefined
  }

  public class Employee : EntityBase
  {
    public string Name { get; set; }

    public string Surname { get; set; }

    public string Patronymic { get; set; }

    public string PhoneNumber { get; set; }

    public DateTime DateBirth { get; set; }

    public Gender Gender { get; set; }

    public string House { get; set; }

    public string Street { get; set; }

    public string City { get; set; }

    public string Flat { get; set; }

    public string ZipCode { get; set; }

    public override string Signature
    {
      get { return $"{this.Id} {this.Name} {this.Surname}"; }
    }

    public override string ToString()
    {
      return $"{this.Surname} {this.Name} {this.Patronymic}";
    }
  }
}
