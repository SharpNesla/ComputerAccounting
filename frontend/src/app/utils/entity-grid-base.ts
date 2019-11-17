import {EntityBase} from "../model/entities/entity-base";
import {EntityRepository} from "../model/repositories/entity-repository";
import {Input, OnInit, ViewChild} from "@angular/core";
import {Observable} from "rxjs";
import {SelectionModel} from "@angular/cdk/collections";
import {Computer} from "../computers/computer";
import {MatMenuTrigger} from "@angular/material/menu";

export abstract class EntityGridBase<TEntity extends EntityBase,
  TRepository extends EntityRepository<TEntity>> implements OnInit {
  public Filter: TEntity[];
  public Entities: Observable<TEntity[]>;
  public SelectedEntity: TEntity;
  public IsCompact: boolean;
  public Count: number = 0;

  protected Repo: TRepository;

  @Input() public IsDisplaySubtotals: boolean;
  @Input() public IsSearchDrawerOpened: boolean;
  @Input() public DisplaySelectionColumn: boolean;

  public SearchString: string;

  protected constructor(repository: TRepository, displayedColumns: string[]) {
    this.Repo = repository;
    this.DisplayedColumns = displayedColumns;
  }

  public DisplayedColumns: string[];
  private offset : number;
  private limit : number;
  public refreshPrevious(){

    this.Entities = this.Repo.get(this.offset, this.limit,
      [], null, null)
  }

  public refresh(offset : number, limit : number) {
    this.offset = offset;
    this.limit = limit;
    this.Entities = this.Repo.get(offset, limit,
      [], null, null)
  }

  selection = new SelectionModel<Computer>(true, []);

  @ViewChild(MatMenuTrigger, {static: false}) contextMenu: MatMenuTrigger;

  contextMenuPosition = {x: '0px', y: '0px'};

  onContextMenu(event: MouseEvent, item: Computer) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = {'item': item};
    this.contextMenu.openMenu();
  }

  edit(item: TEntity) {

  }

  remove(item: TEntity) {
    this.Repo.remove(item);
    this.refreshPrevious();
  }

  ngOnInit(): void {
    this.Entities = this.Repo.get(0, 5, [], null, null)
    this.Repo.getCount(null).subscribe(x => this.Count = x);
  }
}
