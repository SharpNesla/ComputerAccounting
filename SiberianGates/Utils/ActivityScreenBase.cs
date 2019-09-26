using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Input;
using SiberianGates.Annotations;
using SiberianGates.Model;
using PropertyChanged;

namespace SiberianGates.Utils
{
  [AddINotifyPropertyChangedInterface]
  public class ActivityScreenBase
  {
    protected IModel Model { get; }
    public Visibilities Visibilities { get; }
    protected IShell Shell { get; }

    public RelayCommand<string> Navigate { get; }

    public ActivityScreenBase()
    {
      var shell = Application.Current.Resources["Shell"] as ShellViewModel;

      this.Shell = shell;
      this.Visibilities = shell.Visibilities;
      this.Model = shell.Model;

      this.Navigate = new RelayCommand<string>(x => this.Shell.Navigate(x));
    }
  }

}