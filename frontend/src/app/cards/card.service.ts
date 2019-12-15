import {Injectable} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Computer} from "../entities/computer";
import {EntityBase} from "../entities/entity-base";
import {CardBase} from "../utils/card-base";
import {EntityServiceBase} from "../services/entity-service-base";

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
      data: element.Id,
      minWidth: '900px'
    });
  }
}
