import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';


const routes: Routes = [ 
{
  path: 'list',
  component: ListComponent 
},
{
  path: 'customer/:id',
  component: CustomerDetailComponent,
  pathMatch: 'full'
},
{ path: '',
  redirectTo: '/list',
  pathMatch: 'full'
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
