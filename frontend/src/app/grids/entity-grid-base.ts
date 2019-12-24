import {EntityBase} from '../entities/entity-base';
import {EntityServiceBase} from '../services/entity-service-base';
import {Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DeleteDialogComponent} from '../delete-dialog.component';
import {first, flatMap} from 'rxjs/operators';
import {SelectionModel} from '@angular/cdk/collections';
import {CardService} from '../cards/card.service';

export abstract class EntityGridBase<TEntity extends EntityBase,
  TService extends EntityServiceBase<TEntity>> implements OnInit {
  get customDataSource(): TEntity[] {
    return this._customDataSource;
  }

  @Input() set customDataSource(value: TEntity[]) {
    this._customDataSource = value;
    this.refresh();
  }

  public entities: TEntity[];
  public count: number = 0;
  public filterState: boolean;

  @Input() public IsDisplaySubtotals: boolean;
  @Input() public IsSearchDrawerOpened: boolean;
  @Input() public isCompact: boolean;
  private _customDataSource: TEntity[];

  selection = new SelectionModel<TEntity>(true, []);

  private _searchString: string;

  private sortActive: string;
  private sortDirection: 'asc' | 'desc' | '' = '';

  private currentOffset: number;
  private currentLimit: number;

  set searchString(value: string) {
    this._searchString = value;
    this.refresh();
  }

  public get DisplayedColumns(): string[] {
    if (this.isCompact) {
      return this.displayedColumns.filter(x => x != 'select');
    } else {
      return this.displayedColumns;
    }
  }

  protected constructor(protected service: TService,
                        protected dialog: MatDialog,
                        private displayedColumns: string[],
                        protected cardService: CardService,
                        protected card) {
  }

  public refresh() {
    if (this._customDataSource) {
      this.entities =
        this._customDataSource
          .slice(this.currentOffset, this.currentOffset + this.currentLimit);
      this.count = this._customDataSource.length;
    } else {
      this.service.getWithAllCount(
        this._searchString ? this._searchString : null,
        this.currentOffset, this.currentLimit,
        this.constructFilter(), this.sortActive, this.sortDirection)
        .pipe(first())
        .subscribe(result => {
          this.entities = result.entities;
          this.count = result.allCount;
          this.selection.clear();
        });
    }
  }

  showInfoCard(element: TEntity) {
    this.cardService.showInfoCard(element, this.card);
  }

  remove(item: TEntity) {
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

  changeSort(direction: 'asc' | 'desc' | '', active: string) {
    this.sortActive = active;
    this.sortDirection = direction;
    this.refresh();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.entities.length;
    return numSelected == numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.entities.forEach(row => this.selection.select(row));
  }
}
