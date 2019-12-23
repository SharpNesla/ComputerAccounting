import {Component, Inject, OnInit} from '@angular/core';
import {CardBase} from "./card-base";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {LicenseExtension} from "../entities/license";
import {LicenseService} from "../services/license.service";
import {SubsidiaryExtension} from '../entities/subsidiary';
import {SubsidiaryCardComponent} from './subsidiary-card.component';
import {SoftwareTypeExtension} from '../entities/software-type';
import {CardService} from './card.service';
import {SoftwareTypeCardComponent} from './software-type-card.component';

@Component({
  selector: 'sg-license-card',
  template: `
      <sg-dialog-layout (accept)="onClick()" acceptOnly="true">
          <header>
              <mat-icon id="sg-editor-icon">desktop_mac</mat-icon>
              Лицензии №{{entity?.Id}}
          </header>
          <div id="sg-editor-card-container">
              <mat-card id="left-section">
                  <h2 class="mat-title">Общая информация</h2>

                  <p>Стоимость: {{entity?.Cost}} ₽</p>
                  <p>Максимальное число применений: {{entity?.MaxApplyCount}}</p>

                  <p>Применена: {{entity?.SoftwareCount}} / {{entity?.MaxApplyCount}}</p>

                  <p class="mat-body" *ngIf="entity?.SoftwareType">
                      <a (click)="showSoftwareTypeCard(entity?.SoftwareType)">Тип ПО:
                          <br>
                          №{{entity?.SoftwareType.Id}}
                          {{entity?.SoftwareType.Typename}}
                          {{entity?.SoftwareType.Category | softwareCategory}}
                      </a>
                  </p>

                  <p>Дата приобретения: {{entity?.PurchasedAt | date: 'yyyy.MM.dd'}}</p>
                  <p>Дата истечения: {{entity?.ExpiredAt | date: 'yyyy.MM.dd'}}</p>
              </mat-card>
              <mat-card id="right-section">
                  <h2 class="mat-title">Комментарии</h2>
              </mat-card>
          </div>
      </sg-dialog-layout>`,

  styleUrls: ['../utils/editors-styles.scss']
})
export class LicenseCardComponent extends CardBase<LicenseExtension, LicenseService> {

  constructor(
    public dialogRef: MatDialogRef<LicenseCardComponent>,
    service: LicenseService,
    private cardService: CardService,
    @Inject(MAT_DIALOG_DATA) data: { id: number, showEditButton: boolean }) {
    super(dialogRef, service, data);
  }
  showSoftwareTypeCard(softwareType: SoftwareTypeExtension) {
    this.cardService.showInfoCard(softwareType, SoftwareTypeCardComponent);
  }

}
