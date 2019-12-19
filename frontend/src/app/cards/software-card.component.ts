import {Component, Inject} from '@angular/core';
import {CardBase} from './card-base';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Software} from '../entities/software';
import {SoftwareService} from '../services/software.service';
import {SoftwareType} from '../entities/software-type';
import {SoftwareTypeCardComponent} from './software-type-card.component';
import {CardService} from './card.service';
import {License} from '../entities/license';
import {LicenseCardComponent} from './license-card.component';
import {Computer} from '../entities/computer';
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

              </mat-card>
          </div>
      </sg-dialog-layout>`,

  styleUrls: ['../utils/editors-styles.scss']
})
export class SoftwareCardComponent extends CardBase<Software, SoftwareService> {

  constructor(
    public dialogRef: MatDialogRef<SoftwareCardComponent>,
    service: SoftwareService,
    private cardService: CardService,
    @Inject(MAT_DIALOG_DATA) data: { id: number, showEditButton: boolean }) {
    super(dialogRef, service, data);
  }

  showSoftwareTypeCard(softwareType: SoftwareType) {
    this.cardService.showInfoCard(softwareType, SoftwareTypeCardComponent);
  }

  showLicenseCard(license: License) {
    this.cardService.showInfoCard(license, LicenseCardComponent);
  }

  showComputerCard(computer: Computer) {
    this.cardService.showInfoCard(computer, ComputerCardComponent);
  }
}
