import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommunicationformComponent } from './communicationform/communicationform.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'communication/:key',
    pathMatch: 'full',
  },
  {
    path: 'communication/:key',
    component: CommunicationformComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
