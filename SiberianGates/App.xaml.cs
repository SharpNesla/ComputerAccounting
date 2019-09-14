using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Windows;
using Autofac;


namespace SiberianGates
{
  /// <summary>
  /// Interaction logic for App.xaml
  /// </summary>
  public partial class App : Application
  {
    private void Launch(object sender, StartupEventArgs e)
    {
      var containerBuilder = new ContainerBuilder();

      containerBuilder.RegisterType<Shell>().SingleInstance();

      var container = containerBuilder.Build();

      container.Resolve<Shell>().ShowDialog();
      this.Shutdown();
    }
  }
}
