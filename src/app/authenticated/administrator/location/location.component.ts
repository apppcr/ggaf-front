import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { NewLocationComponent } from './dialog/new-location/new-location.component';
import { Location } from '../../../core/models/location.model';


@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  displayedColumns: string[] = ['id', 'local', 'zip_code', 'address', 'number', 'city', 'district', 'excluir', 'editar'];
  dataSource = new MatTableDataSource<Location>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
}

openDialogNewLocal(): void {
  const dialogRef = this.dialog.open(NewLocationComponent, {
      width: '600px',
  });

  dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
  });
}

}

const ELEMENT_DATA: Location[] = [
  { id: 1, local: 'Local 1', zip_code:'50050-000', address: 'Rua Joaquin Nabuco', number: 100,  city: 'Recife', district: 'PE'},
  { id: 2, local: 'Local 2', zip_code:'50050-000', address: 'Rua Tavares Nabuco', number: 100,  city: 'Recife', district: 'PE'}
] 