using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using SiberianGates.Model.Entities;
using SiberianGates.Model.Repositories;
using SiberianGates.Views.Cards;

namespace SiberianGates.Utils.Controls.Grids
{
  public interface IEntityGrid<out TEntity> : IPaginable
  {
    IReadOnlyList<TEntity> Entities { get; }

    TEntity SelectedEntity { get; }

    void ExportToCSV();
    void ExportToExcel();

    /// <summary>
    /// Добавить элемент
    /// </summary>
    void Add();

    /// <summary>
    /// Редактирование выделенного элемента
    /// </summary>
    void Edit();

    /// <summary>
    /// Удаление выделенного элемента
    /// </summary>
    void Remove();

    /// <summary>
    /// Удаление выделенную группу элементов
    /// </summary>
    void RemoveSelectedGroup();

  }

  /// <inheritdoc cref="IEntityGrid{TEntity}" />
  /// <summary>
  /// Базовый класс таблицы с сущностями
  /// </summary>
  /// <typeparam name="TEntity">Тип сущности</typeparam>
  /// <typeparam name="TRepository">Тип repository для работы с данной сущностью</typeparam>
  /// <typeparam name="TCard">Тип карточки, показывающей информацию о данной сущности</typeparam>
  public abstract class EntityGrid<TEntity, TRepository, TCard> : DataContextBase, IEntityGrid<TEntity>
    where TEntity : EntityBase
    where TRepository : RepositoryBase<TEntity>
    where TCard : Card<TEntity>
  {
    private Card<TEntity> _card;
    public string EntityName { get; set; }

    public virtual IReadOnlyList<TEntity> Entities { get; set; }
    public TEntity SelectedEntity { get; set; }
    public void ExportToCSV()
    {
    }

    public void ExportToExcel()
    {
    }

    /// <summary>
    /// Компактный режим отображения таблицы (в карточках, действиях и.т.п.)
    /// </summary>
    public bool IsCompact { get; set; }

    /// <summary>
    /// Список выделенных сущностей
    /// </summary>
    public IReadOnlyList<TEntity> SelectedEntities
    {
      get { return this.Entities.Where(x => x.IsSelected).ToList(); }
    }
    
    public TRepository Repo { get; set; }
    public bool IsDisplaySubtotals { get; set; }
    public Visibilities Visibilities { get; }

    public virtual string[] TableSheetHeader => new[] { "№" };
    public virtual string TableSheetName => "Объекты";

    /// <summary>
    /// Св-во, к которому привязано состояние панели
    /// фильтров (скрыта или показана)
    /// </summary>
    public bool IsSearchDrawerOpened { get; set; }

    public bool DisplaySelectionColumn { get; set; }

    public string SearchString { get; set; }

    public EntityGrid()
    {
    }

    public virtual long Count
    {
      get
      {
        if (!string.IsNullOrEmpty(SearchString))
        {
          return 0;
        }
        else
        {
          return this.Repo.GetCount();
        }
      }
    }

    /// <inheritdoc />
    /// <summary>
    /// Обновить элементы таблицы согласно текущей странице
    /// </summary>
    /// <param name="page">Текущая страница</param>
    /// <param name="elements">Элементов на странице</param>
    public virtual void Refresh(int page, int elements)
    {
      if (!string.IsNullOrEmpty(SearchString))
      {
        
      }
      else
      {
        this.Entities = Repo.Get(page * elements, elements, false, null);
      }
    }

    public event Action StateChanged;

    /// <summary>
    /// Показать карточку для выбранного в таблице объекта
    /// </summary>
    public async void ShowInfoCard()
    {
      //if (SelectedEntity != null)
      //{
      //  _card.Entity = SelectedEntity;

      //  await DialogHostExtensions.ShowCaliburnVM(_card);
      //}
    }

    /// <summary>
    /// Показать карточку для сущности
    /// </summary>
    /// <param name="context">сущность</param>
    public async void ShowInfoCard(TEntity context)
    {
      //if (context != null)
      //{
      //  _card.Entity = context;

      //  await DialogHostExtensions.ShowCaliburnVM(_card);
      //}
    }


    /// <inheritdoc />
    public virtual void Add()
    {
      //EventAggregator.PublishOnUIThread(_editScreen);
      StateChanged?.Invoke();
    }


    /// <inheritdoc />
    public virtual void Edit()
    {
      //EventAggregator.PublishOnUIThread(_editScreen);
      //EventAggregator.PublishOnUIThread(SelectedEntity);
    }


    public virtual async void Remove()
    {
      //var isDelete = await RemoveDialog.AskQuestion();
      //if (isDelete)
      //{
      //  this.Repo.Remove(SelectedEntity);
      //  StateChanged?.Invoke();
      //}
    }

    public void RemoveSelectedGroup()
    {
      //foreach (var selectedEntity in SelectedEntities)
      //{
      //  this.Repo.Remove(selectedEntity);
      //}

      //RaiseStateChanged();
    }

    public void RaiseStateChanged()
    {
      this.StateChanged?.Invoke();
    }
  }
}
