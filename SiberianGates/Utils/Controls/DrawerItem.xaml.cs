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
using MaterialDesignThemes.Wpf;

namespace SiberianGates.Utils.Controls
{
  /// <summary>
  /// Контрол, представляющий из себя элемент списка в drawer'е с иконкой и подписью
  /// </summary>
  public partial class DrawerItem : ListBoxItem, ICommandSource
  {
    public string Label
    {
      get { return (string)GetValue(LabelProperty); }
      set { SetValue(LabelProperty, value); }
    }

    // Using a DependencyProperty as the backing store for Label.  This enables animation, styling, binding, etc...
    public static readonly DependencyProperty LabelProperty =
      DependencyProperty.Register("Label", typeof(string), typeof(DrawerItem));

    public PackIconKind Kind
    {
      get { return (PackIconKind)GetValue(KindProperty); }
      set { SetValue(KindProperty, value); }
    }

    // Using a DependencyProperty as the backing store for Kind.  This enables animation, styling, binding, etc...
    public static readonly DependencyProperty KindProperty =
      DependencyProperty.Register("Kind", typeof(PackIconKind), typeof(DrawerItem));

    public DrawerItem()
    {
      InitializeComponent();
      this.Selected += (s,e) => this.Command.Execute(this.CommandParameter);
    }

    protected override void OnSelected(RoutedEventArgs e)
    {
      base.OnSelected(e);
      this.IsSelected = false;
    }



    public ICommand Command
    {
      get { return (ICommand)GetValue(CommandProperty); }
      set { SetValue(CommandProperty, value); }
    }

    // Using a DependencyProperty as the backing store for Command.  This enables animation, styling, binding, etc...
    public static readonly DependencyProperty CommandProperty =
        DependencyProperty.Register("Command", typeof(ICommand), typeof(DrawerItem));



    public object CommandParameter
    {
      get { return (object)GetValue(CommandParameterProperty); }
      set { SetValue(CommandParameterProperty, value); }
    }

    // Using a DependencyProperty as the backing store for CommandParameter.  This enables animation, styling, binding, etc...
    public static readonly DependencyProperty CommandParameterProperty =
        DependencyProperty.Register("CommandParameter", typeof(object), typeof(DrawerItem));


    public IInputElement CommandTarget => this;
  }
}
