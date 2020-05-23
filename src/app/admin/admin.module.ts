import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductFormComponent } from './edit-product/product-form/product-form.component';
import { EditProductPhotosComponent } from './edit-product/edit-product-photos/edit-product-photos.component';



@NgModule({
  declarations: [AdminComponent, EditProductComponent, ProductFormComponent, EditProductPhotosComponent],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }
