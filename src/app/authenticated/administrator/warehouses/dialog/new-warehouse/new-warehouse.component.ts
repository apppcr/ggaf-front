import { AlertService } from './../../../../../shared/alert.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Warehouse } from '../../../../../core/models/warehouse.model';
import { WharehouseService } from '../../../../../shared/services/wharehouse.service';
import { Wharehouse } from 'src/app/core/models/wharehouse.model';

@Component({
  selector: 'app-new-warehouse',
  templateUrl: './new-warehouse.component.html',
  styleUrls: ['./new-warehouse.component.scss']
})
export class NewWarehouseComponent implements OnInit {

  formNewWareHouse: FormGroup;
  hide: any;

  allWarehouses: Warehouse[] = [];
  currentWarehouse: Warehouse;
  
  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    private data: any,
    private wharehouseService: WharehouseService,
    public dialogRef: MatDialogRef<NewWarehouseComponent>,
    private alert: AlertService
  ) { }

  ngOnInit(): void {

    this.formNewWareHouse = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      responsible: ['', Validators.required],
    });

    if (!!this.data) {
      this.allWarehouses = this.data.allWarehouses;

      if (!!this.data.currentWarehouse) {
        this.currentWarehouse = this.data.currentWarehouse;
        this.setWarehouseEdit(this.currentWarehouse);
      }

    }

  }

  setWarehouseEdit(currentWarehouse: Warehouse): void {
    this.formNewWareHouse.get('name').setValue(currentWarehouse.name);
    this.formNewWareHouse.get('responsible').setValue(currentWarehouse.responsible);
    this.formNewWareHouse.get('email').setValue(currentWarehouse.email);
  }

  validateIfWarehouseExists(): boolean {
    const currentName = this.formNewWareHouse.get('name').value;
    return !!this.allWarehouses.find(x => x.name.toLowerCase() === currentName.toLowerCase()
      && x.id !== this.currentWarehouse.id);
  }

  saveOrUpdate(): void {

    if (this.validateIfWarehouseExists()) {
      this.alert.sucess(`Almoxarifado informado, já encontra-se cadastrado.`);
    } else if (this.formNewWareHouse.valid) {
      const wharehouse: Wharehouse = {
        name: this.formNewWareHouse.get('name').value,
        email: this.formNewWareHouse.get('email').value,
        responsible: this.formNewWareHouse.get('responsible').value,
        operator: JSON.parse(localStorage.getItem('currentUser')).email
      };

      if (!!this.currentWarehouse) {
        this.wharehouseService.updateWharehouse(wharehouse, this.currentWarehouse.id.toString())
          .subscribe(result => {
            this.alert.sucess('Almoxarifado editado com sucesso!');
            this.dialogRef.close(true);
          });
      } else {

        const wharehouseCurrent: Wharehouse = {
          email: wharehouse.email,
          responsible: wharehouse.responsible,
          name: wharehouse.name,
          operator: JSON.parse(localStorage.getItem('currentUser')).email
        };

        this.wharehouseService.createWharehouse(wharehouseCurrent)
          .subscribe(result => {
            this.alert.sucess('Almoxarifado salvo com sucesso!');
            this.dialogRef.close(true);
          });
      }

    }

  }

  close(): void {
    this.dialogRef.close(false);
  }

}
