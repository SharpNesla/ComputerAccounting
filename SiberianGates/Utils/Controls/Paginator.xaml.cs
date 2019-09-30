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
using PropertyChanged;
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

  [AddINotifyPropertyChangedInterface]
  public partial class Paginator : UserControl
    {
    private int _currentPage;
    private long _count;
    private int _elementsPerPage;

    public string ElementsName { get; set; }

    public int ElementsPerPage
    {
      get { return _elementsPerPage; }
      set
      {
        _elementsPerPage = value;
        CheckButtons();
        this.Changed?.Invoke(this.CurrentPage - 1, this.ElementsPerPage);
      }
    }

    public long Count
    {
      get { return _count; }
      set
      {
        _count = value;
        CheckButtons();
      }
    }

    public int MaxPages
    {
      get
      {
        if (Count != 0)
        {
          return (int)Math.Ceiling((double)Count / ElementsPerPage);
        }

        return 1;
      }
    }

    public int CurrentPage
    {
      get { return _currentPage; }
      set
      {
        _currentPage = value;
        CheckButtons();
        this.Changed?.Invoke(this.CurrentPage - 1, this.ElementsPerPage);
      }
    }

    public int[] ComboValues { get; }

    public Paginator()
    {
      InitializeComponent();

      this.ComboValues = new int[] { 5, 10, 20, 50, 100 };
      this.ElementsPerPage = 10;
      this.CurrentPage = 1;
      MovePrevious = new RelayCommand(() => this.CurrentPage--);
      MoveNext = new RelayCommand(() => this.CurrentPage++);
      CheckButtons();
    }

    public bool IsMoveNextEnabled { get; private set; }
    public bool IsMovePreviousEnabled { get; private set; }

    public event Action<int, int> Changed;

    /// <summary>
    /// Переключить на страницу вперёд
    /// </summary>
    public ICommand MoveNext { get; }

    public void ChangeElementsPerPage()
    {
      this.CurrentPage = 1;
    }

    /// <summary>
    /// Переключить на страницу назад
    /// </summary>
    public ICommand MovePrevious { get; }

    /// <summary>
    /// Проверить кнопки и заблокировать в случае
    /// нахождения на первой или последней странице
    /// </summary>
    private void CheckButtons()
    {
      IsMovePreviousEnabled = CurrentPage != 1;
      IsMoveNextEnabled = CurrentPage != MaxPages;
    }

    /// <summary>
    /// Привязать пагинируемую сущность (IPaginable)
    /// к пагинатору
    /// </summary>
    /// <param name="paginable">Пагинируемая сущность</param>
    /// <param name="refreshOnRegister">Флаг </param>
    public void RegisterPaginable(IPaginable paginable, bool refreshOnRegister = true)
    {
      this.ClearPaginable();
      this.Paginable = paginable;

      this.Paginable.StateChanged += RefreshPaginable;
      this.Changed += Paginable.Refresh;
      if (refreshOnRegister)
      {
        RefreshPaginable();
      }
    }

    public void ClearPaginable()
    {
      var paginable = this.Paginable;
      if (paginable != null) paginable.StateChanged -= RefreshPaginable;
      this.Paginable = null;
    }

    /// <summary>
    /// Обновить пагинируемую сущность на текущую страницу
    /// </summary>
    public void RefreshPaginable()
    {
      this.Count = Paginable.Count;
      if (this.CurrentPage > this.MaxPages)
      {
        this.CurrentPage = 1;
      }

      Paginable.Refresh(this.CurrentPage - 1, this.ElementsPerPage);
    }



    public IPaginable Paginable
    {
      get { return (IPaginable)GetValue(PaginableProperty); }
      set { SetValue(PaginableProperty, value); }
    }

    // Using a DependencyProperty as the backing store for Paginable.  This enables animation, styling, binding, etc...
    public static readonly DependencyProperty PaginableProperty =
        DependencyProperty.Register("Paginable", typeof(IPaginable), typeof(Paginator), new PropertyMetadata(null));




    public string EntityTitle
    {
      get { return (string)GetValue(EntityTitleProperty); }
      set { SetValue(EntityTitleProperty, value); }
    }

    // Using a DependencyProperty as the backing store for EntityTitle.  This enables animation, styling, binding, etc...
    public static readonly DependencyProperty EntityTitleProperty =
        DependencyProperty.Register("EntityTitle", typeof(string), typeof(Paginator), new PropertyMetadata("Сущность"));



  }
}
