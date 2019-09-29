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

namespace SiberianGates.Utils.Layouts
{
  /// <summary>
  /// Interaction logic for EditorLayout.xaml
  /// </summary>
  public partial class EditorLayout : UserControl
  {
    public bool IsFirstTab
    {
      get { return (bool)GetValue(IsFirstTabProperty); }
      set { SetValue(IsFirstTabProperty, value); }
    }

    // Using a DependencyProperty as the backing store for IsFirstTab.  This enables animation, styling, binding, etc...
    public static readonly DependencyProperty IsFirstTabProperty =
        DependencyProperty.Register("IsFirstTab", typeof(bool), typeof(EditorLayout), new PropertyMetadata(null));


    public EditorLayout()
    {
      InitializeComponent();
    }




    public PackIconKind IconKind
    {
      get { return (PackIconKind)GetValue(IconKindProperty); }
      set { SetValue(IconKindProperty, value); }
    }

    // Using a DependencyProperty as the backing store for IconKind.  This enables animation, styling, binding, etc...
    public static readonly DependencyProperty IconKindProperty =
        DependencyProperty.Register("IconKind", typeof(PackIconKind), typeof(EditorLayout), new PropertyMetadata(null));


  }
}
