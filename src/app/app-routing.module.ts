import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardProd1Component } from './dashboard-prod1/dashboard-prod1.component';
import { IndexComponent } from './index/index.component';
import { CarritoComponent } from './carrito/CarritoComponent';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'dashboard-prod1', component: DashboardProd1Component },
  { path: 'carrito', component: CarritoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
