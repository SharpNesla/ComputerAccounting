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
using SiberianGates.Model.Repositories;
using SiberianGates.Utils.Controls.Grids;
using SiberianGates.Views.Cards;

namespace SiberianGates.Utils.Controls
{
    /// <summary>
    /// Interaction logic for EmployeeGrid.xaml
    /// </summary>
    public partial class EmployeeGridView : UserControl
    {
      public EmployeeGridView()
      {
        InitializeComponent();
      }
    }

    public class EmployeeGridViewModel : EntityGrid<Employee, EmployeeRepository, Card<Employee>>
    {
    }
}
