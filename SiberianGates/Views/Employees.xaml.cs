using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using SiberianGates.Model.Entities;
using SiberianGates.Utils;
using SiberianGates.Utils.Controls;

namespace SiberianGates.Views
{
  /// <summary>
  /// Interaction logic for Employees.xaml
  /// </summary>
  public partial class Employees
  {
    public Employees()
    {
      InitializeComponent();
    }
  }

  public class EmployeeDictionaryViewModel : DictionaryActivityBase<EmployeeGridViewModel>
  {
    public EmployeeDictionaryViewModel()
    {
      this.EntityGrid.Repo = Model.Employees;
      this.EntityGrid.Refresh(0, int.MaxValue);
    }
  }
}