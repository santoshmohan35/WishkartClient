import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { ShopService } from 'src/app/shop/shop.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductFormValues, IProduct } from 'src/app/shared/models/product';
import { IBrand } from 'src/app/shared/models/brands';
import { IProductType } from 'src/app/shared/models/productType';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  product: IProduct;
  productFormValues: ProductFormValues;
  brands: IBrand[];
  types: IProductType[];

  constructor(private adminService: AdminService,
    private shopService: ShopService,
    private route: ActivatedRoute,
    private router: Router) {
    this.productFormValues = new ProductFormValues();
  }

  ngOnInit(): void {
    const brands = this.getBrands();
    const types = this.getTypes();

    forkJoin([types, brands]).subscribe(results => {
      this.types = results[0];
      this.brands = results[1];
    }, error => {
      console.log(error);
    }, () => {
      if (this.route.snapshot.url[0].path === 'edit') {
        this.loadProduct();
      }
    });
  }

  updatePrice(event: any) {
    this.product.price = event;
  }

  loadProduct() {
    this.shopService.getProduct(+this.route.snapshot.paramMap.get('id')).subscribe((response: any) => {
        const productBrandId = this.brands && this.brands.find(x => x.name === response.productBrand).id;
        const productTypeId = this.types && this.types.find(x => x.name === response.productType).id;
        this.product = response;
        this.productFormValues = {...response, productBrandId, productTypeId};
      });
    }

  getBrands() {
    return this.shopService.getBrandNames();
  }

  getTypes() {
    return this.shopService.getProductTypes();
  }

  onSubmit(product: ProductFormValues) {
    if (this.route.snapshot.url[0].path === 'edit') {
      const updatedProduct = { ...this.product, ...product, price: +product.price };
      this.adminService.updateProduct(updatedProduct, +this.route.snapshot.paramMap.get('id')).subscribe((response: any) => {
        this.router.navigate(['/admin']);
      });
    } else {
      const newProduct = { ...product, price: +product.price };
      this.adminService.createProduct(newProduct).subscribe((response: any) => {
        this.router.navigate(['/admin']);
      });
    }
  }
}
