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
using SiberianGates.Utils;

namespace SiberianGates.Views
{
  class DashboardViewModel : ActivityScreenBase
  {
    public ICommand Apply { get; set; } = new RelayCommand(() => MessageBox.Show("WWW!"));
  }
}
