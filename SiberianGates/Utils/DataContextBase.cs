using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using SiberianGates.Annotations;
using SiberianGates.Model;
using PropertyChanged;

namespace SiberianGates.Utils
{
  [AddINotifyPropertyChangedInterface]
  public class DataContextBase
  {
    protected IModel Model { get; }
    public Visibilities Visibilities { get; }
    protected IShell Shell { get; }

    public ICommand NavigateUri { get; }
    public ICommand NavigatePage { get; }
    public ICommand GoBack { get; }

    public DataContextBase()
    {
      var shell = Application.Current.Resources["Shell"] as ShellViewModel;

      this.Shell = shell;
      this.Visibilities = shell.Visibilities;
      this.Model = shell.Model;

      this.NavigateUri = shell.NavigateUri;

      this.NavigatePage = shell.NavigatePage;
      this.GoBack = shell.GoBackCommand;
    }
  }

}