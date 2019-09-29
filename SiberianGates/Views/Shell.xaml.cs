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

    public ICommand NavigateUri { get; }
    public ICommand NavigatePage { get; }


    public void Navigate(string uri)
    {
      this.Uri = uri;
      this.IsDrawerOpened = false;
    }

    public void Navigate(Page page)
    {
      this.Uri = null;
      this.IsDrawerOpened = false;
      page.GetType().GetMethod("InitializeComponent").Invoke(page, null);
      this.Content = page;
    }

    public void GoBack()
    {
      if (this.navigationService.CanGoBack)
      {
        this.navigationService.GoBack();
      }
    }

    public bool IsDrawerOpened { get; set; }
    public IModel Model { get; }
    public Visibilities Visibilities { get; }

    private NavigationService navigationService;

    public ShellViewModel()
    {
      Model = new JsonModel();


      this.NavigateUri = new RelayCommand<string>(this.Navigate);

      this.NavigatePage = new RelayCommand<Page>(this.Navigate);

      this.GoBackCommand = new RelayCommand(() => 
        GoBack());
    }

    public string Uri { get; set; } = "JsonSelectModel.xaml";
    public Page Content { get; set; }
    public ICommand GoBackCommand { get; set; }
  }

  public interface IShell
  {
    bool IsDrawerOpened { get; set; }

    void Navigate(string uri);
    void Navigate(Page content);
    void GoBack();
  }


  public class Visibilities
  {
  }
}