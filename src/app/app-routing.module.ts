import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './car/car.component';
import { HomeComponent } from './home/home.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { AdminComponent } from './administrador/admin/admin.component';
import { ListComponent } from './administrador/list/list.component';
import { CreateComponent } from './administrador/create/create.component';

const routes: Routes = [
  {path:"", component: HomeComponent},
  {path:"car", component: CarComponent},
  {path:"purchases", component: PurchasesComponent},
  {path:"admin", component: AdminComponent, children:[
    {path:"", component:ListComponent},
    {path:"create", component:CreateComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
