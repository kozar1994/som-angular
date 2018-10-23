import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from './products.service';
import { NgForm } from '@angular/forms';
import { Product } from './product.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: Product[];
  productSub: Subscription;

  constructor(
    private productsService: ProductsService,
    private router: Router
    ) { }

  ngOnInit() {
    this.productsService.getProduct();
    this.productSub = this.productsService.getProductUpdateListeren()
      .subscribe((updateProduct: Product[]) => {
        console.log(updateProduct);

        this.products = updateProduct;
      })
  }

  ngOnDestroy() {
    this.productSub.unsubscribe()
  }

  onSubmitForm(form: NgForm) {
    this.productsService.addProduct(form.value.title, form.value.price);
    form.resetForm();
  }

  onDeleteProduct(id) {
    // console.log(id,"component");
    this.productsService.deleteProduct(id);
  }

  onEditProduct(id) {
    this.router.navigate(['/products-edit/'+id]);
  }
}
