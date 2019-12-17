import {Injectable} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {EntityBase} from "../entities/entity-base";

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private dialog: MatDialog) {
  }

  showInfoCard<TEntity extends EntityBase>(element: TEntity,
                                           entityCard,
                                           showEditButton: boolean = false) {
    this.dialog.open(entityCard, {
      data: {id: element.Id, showEditButton: showEditButton},
      minWidth: '900px'
    });
  }
}
