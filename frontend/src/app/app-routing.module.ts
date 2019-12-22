import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {ComputersComponent} from "./directories/computers.component";
import {PageNotFoundComponent} from "./page-not-found.component";
import {ComputerEditorComponent} from "./editors/computer-editor.component";
import {PartsComponent} from "./directories/parts.component";
import {SubsidiariesComponent} from "./directories/subsidiaries.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AboutComponent} from "./about.component";
import {SettingsComponent} from "./settings.component";
import {LicensesComponent} from "./directories/licenses.component";
import {SubsidiaryEditorComponent} from "./editors/subsidiary-editor.component";
import {RoomEditorComponent} from "./editors/room-editor.component";
import {LicenseEditorComponent} from "./editors/license-editor.component";
import {SoftwareListComponent} from "./directories/software-list.component";
import {SoftwareEditorComponent} from "./editors/software-editor.component";
import {ComputerCardComponent} from "./cards/computer-card.component";
import {SoftwareTypeEditorComponent} from "./editors/software-type-editor.component";
import {PartEditorComponent} from "./editors/part-editor.component";
import {PartTypeEditorComponent} from "./editors/part-type-editor.component";
import {AnalyticsComponent} from "./analytics/analytics.component";
import {EmployeeEditorComponent} from "./editors/employee-editor.component";
import {EmployeesComponent} from "./directories/employees.component";

const routes: Routes = [
  {path: '', component: LoginComponent},

  {path: 'dashboard', component: DashboardComponent},

  {path: 'analytics', component: AnalyticsComponent},

  {path: 'computers', component: ComputersComponent},
  {path: 'computers/add', component: ComputerEditorComponent},
  {path: 'computers/edit/:id', component: ComputerEditorComponent},


  {path: 'software', component: SoftwareListComponent},
  {path: 'software/add', component: SoftwareEditorComponent},
  {path: 'software/edit/:id', component: SoftwareEditorComponent},
  {path: 'software/:id', component: ComputersComponent},


  {path: 'software-types', component: SoftwareListComponent},
  {path: 'software-types/add', component: SoftwareTypeEditorComponent},
  {path: 'software-types/edit/:id', component: SoftwareTypeEditorComponent},
  {path: 'software-types/:id', component: ComputersComponent},

  {path: 'licenses', component: LicensesComponent},
  {path: 'licenses/add', component: LicenseEditorComponent},
  {path: 'licenses/edit/:id', component: LicenseEditorComponent},
  {path: 'licenses/:id', component: ComputersComponent},

  {path: 'parts', component: PartsComponent},
  {path: 'parts/add', component: PartEditorComponent},
  {path: 'parts/edit/:id', component: PartEditorComponent},
  {path: 'parts/:id', component: ComputersComponent},

  {path: 'part-types', component: PartsComponent},
  {path: 'part-types/add', component: PartTypeEditorComponent},
  {path: 'part-types/edit/:id', component: PartTypeEditorComponent},
  {path: 'part-types/:id', component: ComputersComponent},

  {path: 'subsidiaries', component: SubsidiariesComponent},
  {path: 'subsidiaries/add', component: SubsidiaryEditorComponent},
  {path: 'subsidiaries/edit/:id', component: SubsidiaryEditorComponent},
  {path: 'subsidiaries/:id', component: ComputersComponent},

  {path: 'rooms', component: SubsidiariesComponent},
  {path: 'rooms/add', component: RoomEditorComponent},
  {path: 'rooms/edit/:id', component: RoomEditorComponent},
  {path: 'rooms/:id', component: ComputersComponent},

  {path: 'employees', component: EmployeesComponent},
  {path: 'employees/add', component: EmployeeEditorComponent},
  {path: 'employees/edit/:id', component: EmployeeEditorComponent},

  {path: 'settings', component: SettingsComponent},
  {path: 'about', component: AboutComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
