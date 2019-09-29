using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;
using SiberianGates.Model.Entities;
using SiberianGates.Model.Repositories;
using SiberianGates.Utils.Controls.Grids;

namespace SiberianGates.Utils
{
  public class DictionaryActivityBase<TGrid> : DrawerActivityBase
    where TGrid : IEntityGrid<EntityBase>, new()
  {
    public DictionaryActivityBase()
    {
    }

    public TGrid EntityGrid { get; } = new TGrid();
  }
}