import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '../services/employee.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'sg-branch-director-dashboard',
  template: `
      <sg-drawer-appbar-base>
          <header>Обзор: директор филиала</header>
          <div id="sg-director-dashboard-container">
              <mat-card>
                  <h2 class="mat-title">Общая информация</h2>
                  <p>Количество компьютеров: {{this.dashBoardInfo.ComputersCount}}</p>

                  <p>Количество ПО: {{this.dashBoardInfo?.SoftwareCount }}</p>
                  <p>Количество лицензий: {{this.dashBoardInfo?.LicensesCount}}</p>
                  <p>Количество филиалов: {{this.dashBoardInfo?.SubsidiariesCount}}</p>
              </mat-card>
              <mat-card id="first-chart">
                  <h2 class="mat-title">Общая информация</h2>
              </mat-card>
              <mat-card id="second-chart">
                  <h2 class="mat-title">Комплектующие за последний месяц</h2>

              </mat-card>
              <mat-card>
                  <h2 class="mat-title">Информация о сотрудниках</h2>
                  <p>Количество работников: {{this.dashBoardInfo?.EmployeesCount}}</p>
                  <p>Кладовщиков: {{this.dashBoardInfo?.StoreKeeperCount}}</p>
                  <p>Администраторов: {{this.dashBoardInfo?.AdminCount}}</p>
                  <p>Администраторов филиалов: {{this.dashBoardInfo?.BranchAdminCount}}</p>
                  <p>Ответственных лиц: {{this.dashBoardInfo?.ResponsibleCount}} </p>
              </mat-card>
          </div>
      </sg-drawer-appbar-base>`,
  styles: [`
      #sg-director-dashboard-container {
          padding: 2em;
          display: grid;

          grid-template-columns: 1fr 1fr 1fr;

          grid-template-rows: 1fr 1fr;
          grid-gap: 1.5em;
      }

      #first-chart {
          grid-column: 2 / 4;
      }

      #second-chart {
          grid-column: 1 / 3;
      }
  `]
})
export class BranchDirectorDashboardComponent implements OnInit {
  dashBoardInfo;
  colorScheme = {
    domain: ['#0060b7', '#d50061', '#AAAAAA']
  };


  constructor(private service: EmployeeService) {
    this.dashBoardInfo = service.getDirectorDashboardInfo()
      .pipe(first())
      .subscribe(x => this.dashBoardInfo = x);
  }

  ngOnInit() {
  }

}
