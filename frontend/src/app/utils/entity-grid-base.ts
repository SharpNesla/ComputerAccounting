import {EntityBase} from "../entities/entity-base";
import {EntityRepository} from "../services/entity-repository";
import {Input, OnInit, ViewChild} from "@angular/core";
import {Observable} from "rxjs";
import {SelectionModel} from "@angular/cdk/collections";
import {Computer} from "../entities/computer";
import {MatMenuTrigger} from "@angular/material/menu";
import {ComputerCardComponent} from "../cards/computer-card.component";
import {MatDialog} from "@angular/material/dialog";
import {DeleteDialogComponent} from "../delete-dialog.component";

export abstract class EntityGridBase<TEntity extends EntityBase,
  TRepository extends EntityRepository<TEntity>> implements OnInit {
  public Filter: TEntity[];
  public Entities: Observable<TEntity[]>;
  public SelectedEntity: TEntity;
  public Count: number = 0;

  protected Repo: TRepository;

  @Input() public IsDisplaySubtotals: boolean;
  @Input() public IsSearchDrawerOpened: boolean;
  @Input() public isCompact : boolean;

  public SearchString: string;

  public get DisplayedColumns() : string[]{
    if (this.isCompact){
      return this.displayedColumns.filter(x=>x != "select");
    }else {
      return this.displayedColumns;
    }
  }


  protected constructor(repository: TRepository, protected dialog: MatDialog,
                        private displayedColumns: string[], protected card = null) {
    this.Repo = repository;
  }

  private offset: number;
  private limit: number;

  public refreshPrevious() {
    this.refresh(this.offset, this.limit)
  }
  public refresh(offset: number, limit: number) {
    this.offset = offset;
    this.limit = limit;
    this.Entities = this.Repo.get(offset, limit,
      [], null, null)
  }

  @ViewChild(MatMenuTrigger, {static: false}) contextMenu: MatMenuTrigger;

  contextMenuPosition = {x: '0px', y: '0px'};

  onContextMenu(event: MouseEvent, item: Computer) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = {'item': item};
    this.contextMenu.openMenu();
  }

  showInfoCard(element: Computer) {

    const dialogRef = this.dialog.open(this.card, {
      data: element.Id,
      minWidth: '900px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  async remove(item: TEntity) {
    const dialog = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      data: true
    });
    dialog.afterClosed().subscribe(x => {
      console.log(x);
      if (x){
        this.Repo.remove(item).subscribe(x => {
          this.refreshPrevious()
        });
      }
    });
  }

  ngOnInit(): void {
    this.refresh(0, 10);
    this.Repo.getCount(null).subscribe(x => this.Count = x);
  }
}
