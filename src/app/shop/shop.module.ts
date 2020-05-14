import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { ShopRoutingModule } from './shop-routing.module';



@NgModule({
  declarations: [ShopComponent, ProductItemComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    ShopRoutingModule
  ]
})
export class ShopModule { }
