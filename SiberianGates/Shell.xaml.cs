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
using PropertyChanged;
namespace SiberianGates
{
  [AddINotifyPropertyChangedInterface]
  public partial class Shell : Window
  {
    public bool DrawerState { get; set; } = true;

    public Control InnerContent { get; set; }

    public Shell()
    {
      InitializeComponent();
    }
  }
}
