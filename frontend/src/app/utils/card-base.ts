import {Inject, OnInit} from "@angular/core";
import {EntityBase} from "../model/entities/entity-base";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

export class CardBase<TEntity extends EntityBase> implements OnInit {

  ngOnInit(): void {
  }
}
