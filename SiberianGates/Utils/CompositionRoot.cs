using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Markup;
using Autofac;
using SiberianGates.Views;

namespace SiberianGates.Utils
{
  [ContentProperty(nameof(Content))]
  [MarkupExtensionReturnType(typeof(ActivityScreenBase))]
  class CompositionRoot : MarkupExtension
  {
    private static IContainer _container;
    public object Content { get; set; }
    public CompositionRoot()
    {
      if (_container == null)
      {
        var builder = new ContainerBuilder();

        builder.RegisterType<ShellViewModel>().SingleInstance();
        builder.RegisterType<DashboardViewModel>().SingleInstance();

        _container = builder.Build();
      }
    }

    public override object ProvideValue(IServiceProvider serviceProvider)
    {
      var providerValuetarget = (IProvideValueTarget) serviceProvider
        .GetService(typeof(IProvideValueTarget));
      
      DependencyObject _targetObject = (DependencyObject) providerValuetarget.TargetObject;

      var name = _targetObject.GetType().Name.Replace("View", "ViewModel");

      var type = Assembly.GetExecutingAssembly().GetTypes().FirstOrDefault(x => x.Name == name);
      return _container.Resolve(type);
    }
  }
}