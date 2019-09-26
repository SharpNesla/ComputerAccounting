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

namespace SiberianGates.Utils.Layouts
{
    /// <summary>
    /// Interaction logic for DrawerLayout.xaml
    /// </summary>
    public partial class DrawerLayout : UserControl
    {
        public DrawerLayout()
        {
            InitializeComponent();
        }


        public object Header
        {
          get { return (object)GetValue(HeaderProperty); }
          set { SetValue(HeaderProperty, value); }
        }

        // Using a DependencyProperty as the backing store for Header.  This enables animation, styling, binding, etc...
        public static readonly DependencyProperty HeaderProperty =
          DependencyProperty.Register("Header", typeof(object), typeof(DrawerLayout), new PropertyMetadata(null));

  }
}
