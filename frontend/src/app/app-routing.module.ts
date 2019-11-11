import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {ComputersComponent} from "./computers/computers.component";
import {PageNotFoundComponent} from "./page-not-found.component";
import {ComputerEditorComponent} from "./computers/computer-editor.component";
import {PartsComponent} from "./parts/parts.component";
import {SubsidiariesComponent} from "./subsidiary/subsidiaries.component";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'computers', component: ComputersComponent},
  {path: 'computers/add', component: ComputerEditorComponent},
  {path: 'computers/:id', component: ComputersComponent},
  {path: 'parts', component: PartsComponent},

  {path: 'subsidiaries', component: SubsidiariesComponent},
  {path: 'subsidiaries/add', component: ComputerEditorComponent},
  {path: 'subsidiaries/:id', component: ComputersComponent},
  {path: 'rooms', component: ComputersComponent},
  {path: 'rooms/add', component: ComputerEditorComponent},
  {path: 'rooms/:id', component: ComputersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
