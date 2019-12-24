import {Component, Inject} from '@angular/core';
import {CardBase} from './card-base';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SoftwareExtension} from '../entities/software';
import {SoftwareService} from '../services/software.service';
import {SoftwareTypeExtension} from '../entities/software-type';
import {SoftwareTypeCardComponent} from './software-type-card.component';
import {CardService} from './card.service';
import {LicenseExtension} from '../entities/license';
import {LicenseCardComponent} from './license-card.component';
import {ComputerExtension} from '../entities/computer';
import {ComputerCardComponent} from './computer-card.component';

@Component({
  selector: 'sg-part-type-card',
  template: `
      <sg-dialog-layout (accept)="onClick()" acceptOnly="true">
          <header>
              <mat-icon id="sg-editor-icon">developer_board</mat-icon>
              Программное обеспечение №{{entity?.Id}}
          </header>
          <div id="sg-editor-card-container">
              <mat-card id="left-section">
                  <h2 class="mat-title">Общая информация</h2>

                  <p class="mat-body" *ngIf="entity?.SoftwareType">
                      <a (click)="showSoftwareTypeCard(entity?.SoftwareType)">Тип ПО:
                          <br>
                          №{{entity?.SoftwareType.Id}}
                          {{entity?.SoftwareType.Typename}}
                          {{entity?.SoftwareType.Category | softwareCategory}}
                      </a>
                  </p>

                  <p class="mat-body" *ngIf="entity?.License">
                      <a (click)="showLicenseCard(entity?.License)">Применённая лицензия:
                          <br>
                          №{{entity?.License.Id}}
                      </a>
                  </p>

                  <p class="mat-body" *ngIf="entity?.Computer">
                      <a (click)="showComputerCard(entity?.Computer)">Компьютер:
                          <br>
                          №{{entity?.Computer.Id}}
                          {{entity?.Computer.Name}}
                          {{entity?.Computer.Type | softwareCategory}}
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
export class SoftwareCardComponent extends CardBase<SoftwareExtension, SoftwareService> {

  constructor(
    public dialogRef: MatDialogRef<SoftwareCardComponent>,
    service: SoftwareService,
    private cardService: CardService,
    @Inject(MAT_DIALOG_DATA) data: { id: number, showEditButton: boolean }) {
    super(dialogRef, service, data);
  }

  showSoftwareTypeCard(softwareType: SoftwareTypeExtension) {
    this.cardService.showInfoCard(softwareType, SoftwareTypeCardComponent);
  }

  showLicenseCard(license: LicenseExtension) {
    this.cardService.showInfoCard(license, LicenseCardComponent);
  }

  showComputerCard(computer: ComputerExtension) {
    this.cardService.showInfoCard(computer, ComputerCardComponent);
  }
}
