using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using SiberianGates.Annotations;

namespace SiberianGates
{
  class ActivityScreen<T> : INotifyPropertyChanged where T : FrameworkElement
  {
    public T View { private get; set; }
    
    public ActivityScreen(bool isAutoWire = false)
    {
      this.View.DataContext = this;
    }

    public event PropertyChangedEventHandler PropertyChanged;

    [NotifyPropertyChangedInvocator]
    protected virtual void OnPropertyChanged([CallerMemberName] string propertyName = null)
    {
      PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
  }
}
