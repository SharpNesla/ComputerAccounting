import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {ComputersComponent} from "./computers/computers.component";
import {PageNotFoundComponent} from "./page-not-found.component";
import {ComputerEditorComponent} from "./computers/computer-editor.component";
import {PartsComponent} from "./parts/parts.component";
import {SubsidiariesComponent} from "./subsidiary/subsidiaries.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AboutComponent} from "./about.component";
import {SettingsComponent} from "./settings.component";
import {LicensesComponent} from "./licenses/licenses.component";
import {SubsidiaryEditorComponent} from "./subsidiary/subsidiary-editor.component";
import {RoomEditorComponent} from "./subsidiary/room-editor.component";
import {License} from "./licenses/license";
import {LicenseEditorComponent} from "./licenses/license-editor.component";
import {SoftwareListComponent} from "./software/software-list.component";
import {SoftwareEditorComponent} from "./software/software-editor.component";
import {ComputerCardComponent} from "./computers/computer-card.component";
import {SoftwareTypeEditorComponent} from "./software/software-type-editor.component";
import {PartEditorComponent} from "./parts/part-editor.component";
import {PartTypeEditorComponent} from "./parts/part-type-editor.component";
import {AnalyticsComponent} from "./analytics/analytics.component";
import {EmployeeEditorComponent} from "./employees/employee-editor.component";
import {EmployeesComponent} from "./employees/employees.component";

const routes: Routes = [
  {path: '', component: LoginComponent},

  {path: 'dashboard', component: DashboardComponent},

  {path: 'analytics', component: AnalyticsComponent},

  {path: 'computers', component: ComputersComponent},
  {path: 'computers/add', component: ComputerEditorComponent},
  {path: 'computers/edit/:id', component: ComputerEditorComponent},
  {path: 'computers/:id', component: ComputerCardComponent},

  {path: 'software', component: SoftwareListComponent},
  {path: 'software/add', component: SoftwareEditorComponent},
  {path: 'software/edit/:id', component: SoftwareEditorComponent},
  {path: 'software/:id', component: ComputersComponent},

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
