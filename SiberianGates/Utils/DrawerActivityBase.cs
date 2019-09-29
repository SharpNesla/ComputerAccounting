using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SiberianGates.Utils
{
  public class DrawerActivityBase : DataContextBase
  {
    private bool _isDrawerButtonChecked;
    /// <summary>
    /// Своство, к которому привязывается значение
    /// гамбургер-кнопки для сворачивания-разворачивание drawer'а
    /// при смене состояния передаёт соответствующее сообщение в Shell
    /// </summary>
    public bool IsDrawerButtonChecked
    {
      get { return _isDrawerButtonChecked; }
      set
      {
        _isDrawerButtonChecked = value;
        this.Shell.IsDrawerOpened = value;
        _isDrawerButtonChecked = false;
      }
    }
  }
}