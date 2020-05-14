import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { HomeComponent } from './home.component';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [HomeComponent, ProductDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ],
  exports: [HomeComponent, ProductDetailsComponent]
})
export class HomeModule { }
