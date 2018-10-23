import { Component, OnInit, OnDestroy } from '@angular/core';
import { Customer } from './customer.model';
import { CustomersService } from './customers.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit, OnDestroy {

  customers: Customer[];
  form: FormGroup;
  customerSub: Subscription;
  parentEditCustomer: Customer;

  constructor(private customerService: CustomersService) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('',[Validators.required, Validators.min(3)]),
      address: new FormControl('',[Validators.required, Validators.min(3)]),
      phone: new FormControl('',[Validators.required, Validators.min(3)]),
    })

    this.customerService.getCustomers();
    this.customerSub = this.customerService.getCustomersUpdateListeren().subscribe((customersServer: Customer[]) => {
      this.customers = customersServer;
    })
  }

  ngOnDestroy() {
    this.customerSub.unsubscribe();
  }

  onEditCustomer(customer: Customer) {
    this.parentEditCustomer = customer;
  }

  onCreateCusSubmit() {
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

    const customer: Customer = {
      id: null,
      name: this.form.value.name,
      address: this.form.value.address,
      phone: this.form.value.phone,
      createdAt: fullData,
      updatedAt: fullData
    }

    this.customerService.greateCustomer(customer);
  }

  onDeleteCustomer(id) {
    this.customerService.deleteCustomer(id);
  }
}
