import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Customer } from "./customer.model";
import { Subject } from "rxjs";

@Injectable()
export class CustomersService {

  private customers: Customer[];
  private productsUpdate = new Subject<Customer[]>();

  constructor(private http: HttpClient) {

  }

  editCustomer(customer: Customer) {
    console.log(customer);
    this.http.put("http://localhost:4200/api/customers/"+customer.id, customer).subscribe((susses: Customer)=>{
      console.log(susses,"susses add");
      this.getCustomers();
    })
  }

  getCustomers(){
    this.http.get("http://localhost:4200/api/customers").subscribe((customersServer: Customer[]) => {
      this.customers = customersServer;
      this.productsUpdate.next([...this.customers]);
    })
  }

  greateCustomer(customer: Customer) {
    this.http.post("http://localhost:4200/api/customers", customer).subscribe((addCustomer: Customer) => {
      console.log(addCustomer,"subscribe");
      this.customers.push(addCustomer)
      this.productsUpdate.next([...this.customers]);
    });
  }

  deleteCustomer(id) {
    this.http.delete("http://localhost:4200/api/customers/"+id).subscribe((deleteCustomer) => {
      const filterCus = this.customers.filter(cus => cus.id !== id);
      console.log(deleteCustomer,"delete 1");
      console.log(filterCus,"delete 2");
      this.customers = filterCus;
      this.productsUpdate.next([...this.customers]);
    });
  }

  getCustomersUpdateListeren() {
    return this.productsUpdate.asObservable();
  }

}
