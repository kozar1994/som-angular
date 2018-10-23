import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Customer } from '../customer.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'app-edit-customers',
  templateUrl: './edit-customers.component.html',
  styleUrls: ['./edit-customers.component.css']
})
export class EditCustomersComponent implements OnInit, OnChanges {
  @Input() customerEdit: Customer;
  formEdit: FormGroup;

  constructor(private customersService: CustomersService) { }

  ngOnInit() {

  }

  ngOnChanges() {
    this.formEdit = new FormGroup({
      name: new FormControl(
        (this.customerEdit !== undefined) ? this.customerEdit.name : ""
        ,[Validators.required, Validators.min(3)]),
      address: new FormControl(
        (this.customerEdit !== undefined) ? this.customerEdit.address : ""
        ,[Validators.required, Validators.min(3)]),
      phone: new FormControl(
        (this.customerEdit !== undefined) ? this.customerEdit.phone : ""
        ,[Validators.required, Validators.min(3)]),
    })
    console.log(this.customerEdit);
  }

  onEditCustomer() {
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

    const editCustomer: Customer = {
      id: this.customerEdit.id,
      name: this.formEdit.value.name,
      address: this.formEdit.value.address,
      phone: this.formEdit.value.phone,
      createdAt: this.customerEdit.createdAt,
      updatedAt: fullData
    }

    this.customersService.editCustomer(editCustomer);
    this.customerEdit = undefined;
  }

  onIChangedMyMind() {
    this.customerEdit = undefined;
  }

}
