import {Component, Inject, OnInit} from '@angular/core';
import {CardBase} from "./card-base";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PartExtension} from "../entities/part";
import {PartService} from "../services/part.service";
import {SubsidiaryExtension} from '../entities/subsidiary';
import {SubsidiaryCardComponent} from './subsidiary-card.component';
import {CardService} from './card.service';
import {ComputerExtension} from '../entities/computer';
import {ComputerCardComponent} from './computer-card.component';

@Component({
  selector: 'sg-license-card',
  template: `
      <sg-dialog-layout (accept)="onClick()" acceptOnly="true">
          <header>
              <mat-icon id="sg-editor-icon">memory</mat-icon>
              Комплектующее №{{entity?.Id}}
          </header>
          <div id="sg-editor-card-container">
              <mat-card id="left-section">
                  <h2 class="mat-title">Общая информация</h2>
                  <p class="mat-body" *ngIf="entity?.Subsidiary">
                      <a (click)="showSubsidiaryCard(entity?.Subsidiary)">Филиал:
                          <br>
                          №{{entity?.Subsidiary.Id}}
                          "{{entity.Subsidiary.Name}}"
                          {{entity?.Subsidiary.Address}}
                      </a>
                  </p>

                  <p class="mat-body" *ngIf="entity?.Computer">
                      <a (click)="showComputerCard(entity?.Computer)">Филиал:
                          <br>
                          №{{entity?.Computer.Id}}
                          "{{entity.Computer.Name}}"
                          {{entity?.Computer.InventoryId}}
                          {{entity?.Computer.Type | computerType}}
                      </a>
                  </p>
              </mat-card>
              <mat-card id="right-section">
                  <h2 class="mat-title">Комментарий</h2>
                  <p class="mat-body">
                      Комментарий:
                  </p>
                  <p class="sg-card-comment-box">
                      {{entity?.Comment}}
                  </p>
              </mat-card>
          </div>
      </sg-dialog-layout>`,

  styleUrls: ['../utils/editors-styles.scss']
})
export class PartCardComponent extends CardBase<PartExtension, PartService> {

  constructor(
    public dialogRef: MatDialogRef<PartCardComponent>, service: PartService,
    private cardService: CardService,
    @Inject(MAT_DIALOG_DATA) data: { id: number, showEditButton: boolean }) {
    super(dialogRef, service, data);
  }


  showSubsidiaryCard(subsidiary: SubsidiaryExtension) {
    this.cardService.showInfoCard(subsidiary, SubsidiaryCardComponent);
  }

  showComputerCard(computer: ComputerExtension) {
    this.cardService.showInfoCard(computer, ComputerCardComponent);
  }
}
