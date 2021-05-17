import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommunicationformComponent } from './communicationform/communicationform.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'communication',
    pathMatch: 'full',
  },
  {
    path: 'communication',
    component: CommunicationformComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
