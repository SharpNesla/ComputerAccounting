import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {ComputersComponent} from "./computers/computers.component";
import {PageNotFoundComponent} from "./page-not-found.component";
import {ComputerEditorComponent} from "./computers/computer-editor.component";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'computers', component: ComputersComponent},
  {path: 'computers/add', component: ComputerEditorComponent},
  {path: 'computers/:id', component: ComputersComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
