import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductsService } from '../products.service';
import { Product } from '../product.model';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit, OnDestroy {

  unSub: Subscription;
  product: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private router: Router
    ) { }

  ngOnInit() {
    this.unSub = this.productService.getOneProduct(this.route.snapshot.params['id']).subscribe((products: Product) => {
      this.product = products;
    });
    console.log(this.route.snapshot.params['id']);
  }

  ngOnDestroy(){
    this.unSub.unsubscribe();
  }

  onSubmitForm(postForm: NgForm) {
    const d = new Date();
    const fullData =
      d.getFullYear() +
      "-" +
      d.getMonth() +
      "-" +
      d.getDate() +
      "T" +
      d.getHours() +
      ":" +
      d.getMinutes() +
      ":" +
      d.getSeconds() +
      ":" +
      d.getMilliseconds() +
      "Z";


    this.product.name = postForm.value.name;
    this.product.price = postForm.value.price;
    this.product.updatedAt = fullData;

    this.productService.editProduct(this.product)
    this.router.navigate(['/products']);
  }

}
