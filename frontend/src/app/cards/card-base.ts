import {Inject, OnInit} from "@angular/core";
import {EntityBase} from "../entities/entity-base";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EntityServiceBase} from "../services/entity-service-base";
import {Observable} from "rxjs";
import {first} from 'rxjs/operators';

export class CardBase<TEntity extends EntityBase, TRepo extends EntityServiceBase<TEntity>>
  implements OnInit {
  public entity : TEntity;

  constructor(
    public dialogRef: MatDialogRef<CardBase<TEntity, TRepo>>,
    protected repo : TRepo,
    @Inject(MAT_DIALOG_DATA) public data : {id : number, showEditButton : boolean}) {
    //this.Entity = repo.getById(data);
  }

  onClick(): void {
    this.dialogRef.close();

  }

  ngOnInit(): void {
    this.repo.getById(this.data.id).pipe(first()).subscribe(x=>this.entity = x);
  }
}
