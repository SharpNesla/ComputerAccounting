import {Inject, OnInit} from "@angular/core";
import {EntityBase} from "../model/entities/entity-base";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EntityRepository} from "../model/repositories/entity-repository";
import {Observable} from "rxjs";

export class CardBase<TEntity extends EntityBase, TRepo extends EntityRepository<TEntity>>
  implements OnInit {
  public Entity: Observable<TEntity>;

  constructor(
    public dialogRef: MatDialogRef<CardBase<TEntity, TRepo>>,
    protected repo : TRepo,
    @Inject(MAT_DIALOG_DATA) public data: number) {
    this.Entity = repo.getById(data);
  }

  onClick(): void {
    this.dialogRef.close();

  }

  ngOnInit(): void {
  }
}
