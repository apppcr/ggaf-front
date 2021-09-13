import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { ProfileService } from './../../../shared/services/profile.service';
import { NewWarehouseComponent } from './dialog/new-warehouse/new-warehouse.component'
import { WharehouseService } from './../../../shared/services/wharehouse.service';
import { Warehouse } from '../../../core/models/warehouse.model';
import { AlertService } from './../../../shared/alert.service';
import { Profile } from '../../../core/models/profile.model';

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.scss']
})
export class WarehousesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'responsible', 'email', 'excluir', 'editar'];
  dataSource = new MatTableDataSource<Warehouse>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  allWarehouses: Warehouse[] = [];
  allProfiles: Profile[] = [];

  constructor(
    public dialog: MatDialog,
    private wharehouseService: WharehouseService,
    private alert: AlertService,
    private profileService: ProfileService
  ){ }

  ngOnInit(): void {
    Observable.forkJoin([
      this.wharehouseService.findAllWharehouse(),
      this.profileService.findAllProfile()
    ]).subscribe((result) => {
      if (result[0].length > 0) {
        this.allWarehouses = result[0];
        this.dataSource.data = this.allWarehouses;
      }

      if (result[1].length > 0) {
        this.allProfiles = result[1];
      }
    });
  }
    
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;    
}

openDialogNewOrEditWareHouse(id?: number): void {
  let wharehouse = null;

  if(!!id) {
    wharehouse = this.allWarehouses.find(wharehouse => wharehouse.id === id);
  }

  const dialogRef = this.dialog.open(NewWarehouseComponent, {
      width: '600px',
      data: {
        allWarehouses: this.allWarehouses,
        currentWarehouse: wharehouse 
      }
  });

  dialogRef.afterClosed().subscribe(result => {
    if(result) {
      this.dataSource.data = [];
      this.reloadTableWharehouse();
    }
      console.log(`Dialog result: ${result}`);
  });
}

reloadTableWharehouse(): void {
  this.wharehouseService.findAllWharehouse()
      .subscribe((result) => {
          if (result.length > 0) {
              this.allWarehouses = result;
              this.dataSource.data = [];
              this.dataSource.data = this.allWarehouses;           
          }
      });
}

editWarehouse(id: number): void {
  this.openDialogNewOrEditWareHouse(id);
}

ruleDeleteWarehouse(id: number): void {
  this.alert.dialogWarning(
      'Tem certeza que deseja excluir esse Almoxarifado?',
      'Você não poderá reverter isso!'
  ).then(result => {
          if (result.isConfirmed) {
              this.deleteWarehouse(id);
          }
      });
}

deleteWarehouse(id: number): void {
  this.wharehouseService.deleteWharehouse(id)
      .subscribe((result) => {
          const wharehouse: any = this.allWarehouses.find(wharehouse => wharehouse.id === id);

          if (!!wharehouse && wharehouse.uid) {
              this.wharehouseService.deleteWharehouse(wharehouse.uid)
                  .subscribe((result) => {
                      this.alert.sucess('Excluido com sucesso!');
                      this.dataSource.data = [];
                      this.reloadTableWharehouse();
                  });

          } else {
              this.alert.sucess('Excluido com sucesso!');
              this.dataSource.data = [];
              this.reloadTableWharehouse();
          }

      });
}

getLabelProfile(id: number): string {
  return this.allProfiles.find(x => x.id === id).name;
}

}

