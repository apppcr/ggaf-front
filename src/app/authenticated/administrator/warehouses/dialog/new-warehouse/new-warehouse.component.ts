import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface WareHouse {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-new-warehouse',
  templateUrl: './new-warehouse.component.html',
  styleUrls: ['./new-warehouse.component.scss']
})
export class NewWarehouseComponent implements OnInit {

  formNewWareHouse: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.formNewWareHouse = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],     
      name: ['', Validators.required],
      responsible: ['', Validators.required],     
  });

  }

}
