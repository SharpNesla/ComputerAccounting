import {EntityBase} from "../entities/entity-base";
import {EntityServiceBase} from "../services/entity-service-base";
import {Input, OnInit, ViewChild} from "@angular/core";
import {Observable} from "rxjs";
import {Computer} from "../entities/computer";
import {MatMenuTrigger} from "@angular/material/menu";
import {MatDialog} from "@angular/material/dialog";
import {DeleteDialogComponent} from "../delete-dialog.component";
import {first, flatMap} from "rxjs/operators";

export abstract class EntityGridBase<TEntity extends EntityBase,
  TRepository extends EntityServiceBase<TEntity>> implements OnInit {

  public entities: TEntity[];
  public count: number = 0;
  public filterState: boolean;

  @Input() public IsDisplaySubtotals: boolean;
  @Input() public IsSearchDrawerOpened: boolean;
  @Input() public isCompact: boolean;

  private _SearchString: string;

  private sortActive: string;
  private sortDirection: "asc" | "desc" | "";

  private currentOffset: number;
  private currentLimit: number;

  set SearchString(value: string) {
    this._SearchString = value;
    this.refresh();
  }

  public get DisplayedColumns(): string[] {
    if (this.isCompact) {
      return this.displayedColumns.filter(x => x != "select");
    } else {
      return this.displayedColumns;
    }
  }

  protected constructor(protected service: TRepository,
                        protected dialog: MatDialog,
                        private displayedColumns: string[],
                        protected card) {
  }

  public refresh() {
    this.service.getWithAllCount(
      this.SearchString ? this.SearchString : null,
      this.currentOffset, this.currentLimit,
      this.constructFilter(), this.sortActive, this.sortDirection)
      .pipe(first())
      .subscribe(result => {
        console.log(result);
        this.entities = result.entities;
        this.count = result.allCount;
      });
  }

  showInfoCard(element: Computer) {
    this.dialog.open(this.card, {
      data: element.Id,
      minWidth: '900px'
    });
  }

  async remove(item: TEntity) {
    const dialog = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      data: true
    });

    dialog.afterClosed()
      .pipe(
        flatMap(x => x ? this.service.remove(item) : null),
        flatMap(x => this.service.getCount(this.constructFilter())),
        first()
      ).subscribe(() => {
      this.refresh();
    });
  }

  constructFilter(): object {
    return {};
  }

  ngOnInit(): void {
    this.currentOffset = 0;
    this.currentLimit = 10;
    this.refresh();
  }

  paginate(offset: number, limit: number) {
    this.currentOffset = offset;
    this.currentLimit = limit;
    this.refresh();
  }

  changeSort(direction: "asc" | "desc" | "", active: string) {
    this.sortActive = active;
    this.sortDirection = direction;
  }
}
