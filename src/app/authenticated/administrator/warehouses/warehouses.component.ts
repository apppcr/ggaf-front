import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { NewWarehouseComponent } from './dialog/new-warehouse/new-warehouse.component'
import { Warehouse } from '../../../core/models/warehouse.model';

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.scss']
})
export class WarehousesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'responsible', 'email', 'excluir', 'editar'];
  dataSource = new MatTableDataSource<Warehouse>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
}

openDialogNewWareHouse(): void {
  const dialogRef = this.dialog.open(NewWarehouseComponent, {
      width: '600px',
  });

  dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
  });
}

}

const ELEMENT_DATA: Warehouse[] = [
  { id: 1, name: 'Almoxarifado 1', responsible:'Fabiano Portela', email: 'fabianoportell@gmail.com'},
  { id: 1, name: 'Almoxarifado 2', responsible:'Fabiano Portela', email: 'fabianoportell@gmail.com'},
] 