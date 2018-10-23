import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Product } from "./product.model";
import { Subject } from "rxjs"

@Injectable()
export class ProductsService {
  private products: Product[] = [];
  private productsUpdate = new Subject<Product[]>();

  constructor(private http: HttpClient) {}

  gData() {
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

      return fullData;
  }

  addProduct(title, price) {
    const fullData = this.gData();

    const productPost = {
      id: null,
      name: title,
      price: price,
      createdAt: fullData,
      updatedAt: fullData
    }

    this.http.post("http://localhost:4200/api/products", productPost).subscribe((productsResponse: Product) => {
      console.log(productsResponse)
      this.products.push(productsResponse);
      this.productsUpdate.next([...this.products]);
    });
  }

  getProductUpdateListeren() {
    return this.productsUpdate.asObservable()
  }

  getProduct() {
    this.http.get("http://localhost:4200/api/products").subscribe((products: Product[]) => {
      this.products = products;
      this.productsUpdate.next([...this.products]);
    });
  }

  getOneProduct(id) {
    return this.http.get("http://localhost:4200/api/products/"+id);
  }

  editProduct(product) {
    this.http.put("http://localhost:4200/api/products/"+product.id, product).subscribe((edit) => {
      console.log(edit, "Edit success!");
    });
  }

  deleteProduct(id) {
    this.http.delete("http://localhost:4200/api/products/"+id).subscribe((deliteІuccess) => {
      console.log(deliteІuccess,"Product DELETE");
      // console.log("До фільтра", this.products);
      // const updatedProducts = this.products.filter(post => post.id !== id)
      // console.log("Що вийшло з фільтра", updatedProducts);
      // this.products = updatedProducts;
      // console.log("Продукт", this.products);
      // this.productsUpdate.next([...this.products]);
      // console.log("Продукт ...", [...this.products]);
      const updatedProducts = this.products.filter(post => post.id !== id)
      this.products = updatedProducts;
      this.productsUpdate.next([...this.products]);
    });

  }
}
