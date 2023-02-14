import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { ListComponent } from './list/list.component';
import { AppRoutingModule } from '../app-routing.module';
import { CreateComponent } from './create/create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PurchasesComponentAdmin } from './purchases/purchases.component';





@NgModule({
  declarations: [
    AdminComponent,
    ListComponent,
    CreateComponent,
    PurchasesComponentAdmin
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
   
  ],
  exports: [AdminComponent]
})
export class AdministradorModule { }
