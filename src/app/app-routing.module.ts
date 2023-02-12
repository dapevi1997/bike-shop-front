import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './car/car.component';
import { HomeComponent } from './home/home.component';
import { PurchasesComponent } from './purchases/purchases.component';

const routes: Routes = [
  {path:"", component: HomeComponent},
  {path:"car", component: CarComponent},
  {path:"purchases", component: PurchasesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
