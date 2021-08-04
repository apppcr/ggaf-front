import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {

  formNewProduct: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.formNewProduct = this.formBuilder.group({
      cadum: ['', Validators.required],     
      name: ['', Validators.required],
      description: ['', Validators.required],     
  });

  }

}
