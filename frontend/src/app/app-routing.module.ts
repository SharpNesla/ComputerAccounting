import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ComputersComponent} from './directories/computers.component';
import {ComputerEditorComponent} from './editors/computer-editor.component';
import {PartsComponent} from './directories/parts.component';
import {SubsidiariesComponent} from './directories/subsidiaries.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AboutComponent} from './about.component';
import {SettingsComponent} from './settings.component';
import {LicensesComponent} from './directories/licenses.component';
import {SubsidiaryEditorComponent} from './editors/subsidiary-editor.component';
import {RoomEditorComponent} from './editors/room-editor.component';
import {LicenseEditorComponent} from './editors/license-editor.component';
import {SoftwareListComponent} from './directories/software-list.component';
import {SoftwareEditorComponent} from './editors/software-editor.component';
import {SoftwareTypeEditorComponent} from './editors/software-type-editor.component';
import {PartEditorComponent} from './editors/part-editor.component';
import {PartTypeEditorComponent} from './editors/part-type-editor.component';
import {AnalyticsComponent} from './analytics/analytics.component';
import {EmployeeEditorComponent} from './editors/employee-editor.component';
import {EmployeesComponent} from './directories/employees.component';
import {RoleGuard} from './login/role.guard';
import {Roles} from './entities/employee';


const allDirectors = [Roles.Director, Roles.BranchDirector];

const allDirectorsAndAdmins = [...allDirectors, Roles.LeadAdmin, Roles.BranchAdmin];

const allExceptResponsible = [...allDirectorsAndAdmins, Roles.StoreKeeper];

const allRoles = [...allDirectorsAndAdmins, Roles.StoreKeeper, Roles.Responsible];

const routes: Routes = [
  {path: '', component: LoginComponent},

  {path: 'dashboard', component: DashboardComponent, canActivate: [RoleGuard], data: {roles: allRoles}},
  {
    path: 'analytics', component: AnalyticsComponent,
    canActivate: [RoleGuard], data: {roles: [Roles.Director, Roles.BranchDirector]}
  },


  {
    path: 'computers', component: ComputersComponent,
    canActivate: [RoleGuard], data: {roles: allDirectorsAndAdmins}
  },
  {
    path: 'computers/add', component: ComputerEditorComponent,
    canActivate: [RoleGuard], data: {roles: allDirectorsAndAdmins}
  },
  {
    path: 'computers/edit/:id', component: ComputerEditorComponent,
    canActivate: [RoleGuard], data: {roles: allDirectorsAndAdmins}
  },

  {
    path: 'software', component: SoftwareListComponent,
    canActivate: [RoleGuard], data: {roles: allDirectorsAndAdmins}
  },
  {
    path: 'software/add', component: SoftwareEditorComponent,
    canActivate: [RoleGuard], data: {roles: allDirectorsAndAdmins}
  },
  {
    path: 'software/edit/:id', component: SoftwareEditorComponent,
    canActivate: [RoleGuard], data: {roles: allDirectorsAndAdmins}
  },
  {
    path: 'software/:id', component: ComputersComponent,
    canActivate: [RoleGuard], data: {roles: allDirectorsAndAdmins}
  },


  {
    path: 'software-types', component: SoftwareListComponent,
    canActivate: [RoleGuard], data: {roles: allDirectorsAndAdmins}
  },
  {
    path: 'software-types/add', component: SoftwareTypeEditorComponent,
    canActivate: [RoleGuard], data: {roles: allDirectorsAndAdmins}
  },
  {
    path: 'software-types/edit/:id', component: SoftwareTypeEditorComponent,
    canActivate: [RoleGuard], data: {roles: allDirectorsAndAdmins}
  },
  {
    path: 'software-types/:id', component: ComputersComponent,
    canActivate: [RoleGuard], data: {roles: allDirectorsAndAdmins}
  },

  {
    path: 'licenses', component: LicensesComponent,
    canActivate: [RoleGuard], data: {roles: allDirectorsAndAdmins}
  },
  {
    path: 'licenses/add', component: LicenseEditorComponent,
    canActivate: [RoleGuard], data: {roles: allDirectorsAndAdmins}
  },
  {
    path: 'licenses/edit/:id', component: LicenseEditorComponent,
    canActivate: [RoleGuard], data: {roles: allDirectorsAndAdmins}
  },
  {
    path: 'licenses/:id', component: ComputersComponent,
    canActivate: [RoleGuard], data: {roles: allDirectorsAndAdmins}
  },

  {
    path: 'parts', component: PartsComponent,
    canActivate: [RoleGuard], data: {roles: allExceptResponsible}
  },
  {
    path: 'parts/add', component: PartEditorComponent,
    canActivate: [RoleGuard], data: {roles: allExceptResponsible}
  },
  {
    path: 'parts/edit/:id', component: PartEditorComponent,
    canActivate: [RoleGuard], data: {roles: allExceptResponsible}
  },
  {
    path: 'parts/:id', component: ComputersComponent,
    canActivate: [RoleGuard], data: {roles: allExceptResponsible}
  },

  {
    path: 'part-types', component: PartsComponent,
    canActivate: [RoleGuard], data: {roles: allDirectorsAndAdmins}
  },
  {
    path: 'part-types/add', component: PartTypeEditorComponent,
    canActivate: [RoleGuard], data: {roles: allDirectorsAndAdmins}
  },
  {
    path: 'part-types/edit/:id', component: PartTypeEditorComponent,
    canActivate: [RoleGuard], data: {roles: allDirectorsAndAdmins}
  },
  {
    path: 'part-types/:id', component: ComputersComponent,
    canActivate: [RoleGuard], data: {roles: allDirectorsAndAdmins}
  },

  {
    path: 'subsidiaries', component: SubsidiariesComponent,
    canActivate: [RoleGuard], data: {roles: allDirectors}
  },
  {
    path: 'subsidiaries/add', component: SubsidiaryEditorComponent,
    canActivate: [RoleGuard], data: {roles: allDirectors}
  },
  {
    path: 'subsidiaries/edit/:id', component: SubsidiaryEditorComponent,
    canActivate: [RoleGuard], data: {roles: allDirectors}
  },
  {
    path: 'subsidiaries/:id', component: ComputersComponent,
    canActivate: [RoleGuard], data: {roles: allDirectors}
  },

  {
    path: 'rooms', component: SubsidiariesComponent,
    canActivate: [RoleGuard], data: {roles: allDirectors}
  },
  {
    path: 'rooms/add', component: RoomEditorComponent,
    canActivate: [RoleGuard], data: {roles: allDirectors}
  },
  {
    path: 'rooms/edit/:id', component: RoomEditorComponent,
    canActivate: [RoleGuard], data: {roles: allDirectors}
  },
  {
    path: 'rooms/:id', component: ComputersComponent,
    canActivate: [RoleGuard], data: {roles: allDirectors}
  },

  {
    path: 'employees', component: EmployeesComponent,
    canActivate: [RoleGuard], data: {roles: allDirectors}
  },
  {
    path: 'employees/add', component: EmployeeEditorComponent,
    canActivate: [RoleGuard], data: {roles: allDirectors}
  },
  {
    path: 'employees/edit/:id', component: EmployeeEditorComponent,
    canActivate: [RoleGuard], data: {roles: allDirectors}
  },

  {path: 'settings', component: SettingsComponent, canActivate: [RoleGuard], data: {roles: allRoles}},
  {path: 'about', component: AboutComponent, canActivate: [RoleGuard], data: {roles: allRoles}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
