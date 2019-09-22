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

namespace SiberianGates.Utils.Controls.Templates
{
  /// <summary>
  /// Interaction logic for AppBarTemplate.xaml
  /// </summary>
  public partial class AppBarTemplate : UserControl
  {


    public object HeaderTemplate
    {
      get { return (object)GetValue(HeaderTemplateProperty); }
      set { SetValue(HeaderTemplateProperty, value); }
    }

    // Using a DependencyProperty as the backing store for HeaderTemplate.  This enables animation, styling, binding, etc...
    public static readonly DependencyProperty HeaderTemplateProperty =
        DependencyProperty.Register("HeaderTemplate", typeof(object), typeof(AppBarTemplate), new PropertyMetadata(0));


    public AppBarTemplate()
    {
      InitializeComponent();
    }
  }
}