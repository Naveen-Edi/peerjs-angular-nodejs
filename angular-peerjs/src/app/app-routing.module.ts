import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideocallComponent } from './videocall/videocall.component';


const routes: Routes = [
    {
        path: '/videocall',
        component: VideocallComponent,
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
