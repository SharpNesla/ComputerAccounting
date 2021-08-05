import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '../services/employee.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'sg-director-dashboard',
  template: `
    <sg-drawer-appbar-base>
      <header>Обзор: директор</header>
      <div id="sg-director-dashboard-container">
        <mat-card>
          <h2 class="mat-title">Общая информация</h2>
          <p>Количество компьютеров: {{this.dashBoardInfo.ComputersCount}}</p>
          <p>Количество ПО: {{this.dashBoardInfo?.SoftwareCount }}</p>
          <p>Количество лицензий: {{this.dashBoardInfo?.LicensesCount}}</p>
          <p>Количество филиалов: {{this.dashBoardInfo?.SubsidiariesCount}}</p>
        </mat-card>
        <mat-card>
          <h2 class="mat-title">Информация о сотрудниках</h2>
          <p>Количество работников: {{this.dashBoardInfo?.EmployeesCount}}</p>
          <p>Кладовщиков: {{this.dashBoardInfo?.StorekeeperCount}}</p>
          <p>Администраторов: {{this.dashBoardInfo?.AdminCount}}</p>
          <p>Администраторов филиалов: {{this.dashBoardInfo?.BranchAdminCount}}</p>
          <p>Ответственных лиц: {{this.dashBoardInfo?.ResponsibleCount}} </p>
        </mat-card>
      </div>
    </sg-drawer-appbar-base>`,
  styles: [`
    #sg-director-dashboard-container {
      display: flex;
      flex-direction: column;

      gap: 1rem;

      min-width: 50rem;
      margin-top: 2rem;
      margin-right: auto;
      margin-left: auto;
    }

  `]
})
export class DirectorDashboardComponent implements OnInit {
  dashBoardInfo;



  constructor(private service: EmployeeService) {
    this.dashBoardInfo = service.getDirectorDashboardInfo()
      .pipe(first())
      .subscribe(x => this.dashBoardInfo = x);
  }

  ngOnInit() {
  }

}
