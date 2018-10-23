import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProductsComponent } from "./products/products.component";
import { CustomersComponent } from "./customers/customers.component";
import { EditProductComponent } from "./products/edit-product/edit-product.component";
import { HomeComponent } from "./home/home.component";

const routers: Routes = [
  { path: "", component: HomeComponent },
  { path: "products", component: ProductsComponent},
  { path: "products-edit/:id", component: EditProductComponent},
  { path: "customers", component: CustomersComponent},
  { path: "**", component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routers)],
  exports: [RouterModule]
})
export class AppRouters {}
