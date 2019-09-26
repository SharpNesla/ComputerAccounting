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
using PropertyChanged;
using SiberianGates.Model;
using SiberianGates.Utils;

namespace SiberianGates
{
  [AddINotifyPropertyChangedInterface]
  public class ShellViewModel : IShell
  {
    public void Navigate(string uri)
    {
      this.Uri = uri;
    }

    public void GoBack()
    {
      if (this.navigationService.CanGoBack)
      {
        this.navigationService.GoBack();
      }
    }

    public bool IsDrawerOpened { get; set; }
    public IModel Model { get;}
    public Visibilities Visibilities { get; }

    private NavigationService navigationService;
  
    public ShellViewModel()
    {
      Model = new JsonModel(); 
    }

    public string Uri { get; set; } = "DashBoard.xaml";

    public ICommand SetupShellNavigator => new RelayCommand<NavigationService>(x => this.navigationService = x);
  }

  public interface IShell
  {
    bool IsDrawerOpened { get; set; }

    void Navigate(string uri);
    void GoBack();
  }


  public class Visibilities
  {
  }
}
