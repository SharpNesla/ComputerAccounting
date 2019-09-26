﻿using System;
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
  public partial class DrawerItem : ListBoxItem
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
      DataContext = this;
    }

    protected override void OnSelected(RoutedEventArgs e)
    {
      base.OnSelected(e);
      this.IsSelected = false;
    }
  }
}
