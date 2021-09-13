import { AlertService } from './../../../../../shared/alert.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ProductService } from '../../../../../shared/services/product.service';
import { Product } from 'src/app/core/models/product.model';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {

  formNewProduct: FormGroup;
  hide: any;

  allProducts: Product[] = [];
  currentProduct: Product;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    private data: any,
    private productService: ProductService,
    public dialogRef: MatDialogRef<NewProductComponent>,
    private alert: AlertService
  ) { }

  ngOnInit(): void {

    this.formNewProduct = this.formBuilder.group({
      cadum: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
    });

    if (!!this.data) {
      this.allProducts = this.data.allProducts;

      if (!!this.data.currentProduct) {
        this.currentProduct = this.data.currentProduct;
        this.setProductEdit(this.currentProduct);
      }
    }
  }

  setProductEdit(currentProduct: Product): void {
    this.formNewProduct.get('name').setValue(currentProduct.name);
    this.formNewProduct.get('cadum').setValue(currentProduct.cadum);
    this.formNewProduct.get('description').setValue(currentProduct.description);
  }

  validateIfProductExists(): boolean {
    const currentCadum = this.formNewProduct.get('cadum').value;
    return !!this.allProducts.find(x => x.name.toLowerCase() === currentCadum.toLowerCase()
      && x.id !== this.currentProduct.id);
  }

  saveOrUpdate(): void {

    if (this.validateIfProductExists()) {
      this.alert.sucess(`Produto informado, já encontra-se cadastrado.`);
    } else if (this.formNewProduct.valid) {
      
      const product: Product = {
        name: this.formNewProduct.get('name').value,
        cadum: this.formNewProduct.get('cadum').value,
        description: this.formNewProduct.get('description').value,
        operator: JSON.parse(localStorage.getItem('currentUser')).email
      };

      if (!!this.currentProduct) {
        this.productService.updateProduct(product, this.currentProduct.id.toString())
          .subscribe(result => {
            this.alert.sucess('Produto editado com sucesso!');
            this.dialogRef.close(true);
          });

      } else {
        this.productService.createProduct(product)
          .subscribe(result => {
            this.alert.sucess('Produto salvo com sucesso!');
            this.dialogRef.close(true);
          });
      }

    }

  }

  close(): void {
    this.dialogRef.close(false);
  }

}
