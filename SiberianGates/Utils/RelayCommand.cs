using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Data;
using System.Windows.Input;

namespace SiberianGates.Utils
{
  public class RelayCommand<TFirst, TSecond> : ICommand where TSecond : class where TFirst : class
  {
    private Action<TFirst, TSecond> execute;
    private Func<TFirst, TSecond, bool> canExecute;


    public event EventHandler CanExecuteChanged
    {
      add { CommandManager.RequerySuggested += value; }
      remove { CommandManager.RequerySuggested -= value; }
    }

    public RelayCommand(Action<TFirst, TSecond> execute, Func<TFirst, TSecond, bool> canExecute = null)
    {
      this.execute = execute;
      this.canExecute = canExecute;
    }

    public bool CanExecute(object parameter)
    {
      var values = (object[])parameter;
      return this.canExecute == null || this.canExecute(values[0] as TFirst, values[1] as TSecond);
    }

    public void Execute(object parameter)
    {
      if (parameter != null)
      {
        var values = (object[])parameter;
        this.execute(values[0] as TFirst, values[1] as TSecond);
      }
      else
      {
        throw new NullReferenceException("CommandParameter is not set properly");
      }
    }
  }

  public class RelayCommand<T> : ICommand where T : class
  {
    private Action<T> execute;
    private Func<T, bool> canExecute;


    public event EventHandler CanExecuteChanged
    {
      add { CommandManager.RequerySuggested += value; }
      remove { CommandManager.RequerySuggested -= value; }
    }

    public RelayCommand(Action<T> execute, Func<T, bool> canExecute = null)
    {
      this.execute = execute;
      this.canExecute = canExecute;
    }

    public bool CanExecute(object parameter)
    {
      return this.canExecute == null || this.canExecute(parameter as T);
    }

    public void Execute(object parameter)
    {
      if (parameter != null)
      {
        this.execute(parameter as T);
      }
      else
      {
        throw new NullReferenceException("CommandParameter is not set properly");
      }
    }
  }

  public class RelayCommand : ICommand
  {
    private Action execute;
    private Func<bool> canExecute;


    public event EventHandler CanExecuteChanged
    {
      add { CommandManager.RequerySuggested += value; }
      remove { CommandManager.RequerySuggested -= value; }
    }

    public RelayCommand(Action execute, Func<bool> canExecute = null)
    {
      this.execute = execute;
      this.canExecute = canExecute;
    }

    public bool CanExecute(object parameter)
    {
      if (this.canExecute != null)
      {
        return this.canExecute();
      }
      else
      {
        return true;
      }
    }

    public void Execute(object parameter)
    {
      this.execute();
    }
  }

  public class MultiArgConverter : IMultiValueConverter
  {


    public object Convert(object[] values, Type targetType, object parameter, CultureInfo culture)
    {
      return values.Clone();
    }

    public object[] ConvertBack(object value, Type[] targetTypes, object parameter, CultureInfo culture)
    {
      throw new NotImplementedException();
    }
  }
}
