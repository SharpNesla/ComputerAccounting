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

namespace SiberianGates.Utils.Layouts
{
  /// <summary>
  /// Interaction logic for DictionaryLayout.xaml
  /// </summary>
  public partial class DictionaryLayout : UserControl
  {
    public DictionaryLayout()
    {
      InitializeComponent();
    }





    public ICommand ApplyCommand
    {
      get { return (ICommand)GetValue(ApplyCommandProperty); }
      set { SetValue(ApplyCommandProperty, value); }
    }

    // Using a DependencyProperty as the backing store for ApplyCommand.  This enables animation, styling, binding, etc...
    public static readonly DependencyProperty ApplyCommandProperty =
        DependencyProperty.Register("ApplyCommand", typeof(ICommand), typeof(DictionaryLayout), new PropertyMetadata(null));





    public string Title
    {
      get { return (string)GetValue(TitleProperty); }
      set { SetValue(TitleProperty, value); }
    }

    // Using a DependencyProperty as the backing store for Title.  This enables animation, styling, binding, etc...
    public static readonly DependencyProperty TitleProperty =
        DependencyProperty.Register("Title", typeof(string), typeof(DictionaryLayout), new PropertyMetadata(null));




    public string SearchHint
    {
      get { return (string)GetValue(SearchHintProperty); }
      set { SetValue(SearchHintProperty, value); }
    }

    // Using a DependencyProperty as the backing store for SearchHint.  This enables animation, styling, binding, etc...
    public static readonly DependencyProperty SearchHintProperty =
        DependencyProperty.Register("SearchHint", typeof(string), typeof(DictionaryLayout), new PropertyMetadata(null));



    public MaterialDesignThemes.Wpf.PackIconKind Kind
    {
      get { return (MaterialDesignThemes.Wpf.PackIconKind)GetValue(KindProperty); }
      set { SetValue(KindProperty, value); }
    }

    // Using a DependencyProperty as the backing store for Kind.  This enables animation, styling, binding, etc...
    public static readonly DependencyProperty KindProperty =
        DependencyProperty.Register("Kind", typeof(MaterialDesignThemes.Wpf.PackIconKind), typeof(DictionaryLayout), new PropertyMetadata(null));
  }
}