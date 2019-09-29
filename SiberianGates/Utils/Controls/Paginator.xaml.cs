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

namespace SiberianGates.Utils.Controls
{
  /// <summary>
  /// Пагинируемая пагинатором сущность
  /// </summary>
  public interface IPaginable
  {
    /// <summary>
    /// Общее количество сущностей в пагинируемом объекте
    /// </summary>
    long Count { get; }

    /// <summary>
    /// Обновление сущности на конкретную страницу с количество элементов
    /// </summary>
    /// <param name="page">Страница</param>
    /// <param name="elements">Количество элементов на страницу</param>
    void Refresh(int page, int elements);

    /// <summary>
    /// Внутреннее событие, вызываемое из сущности
    ///  при изменении состояния оно (как правило CRUD-действия)
    /// </summary>
    event Action StateChanged;
  }


  public partial class Paginator : UserControl
    {
        public Paginator()
        {
            InitializeComponent();
        }
    }
}
