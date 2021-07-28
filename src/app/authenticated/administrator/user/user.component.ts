import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { NewUserComponent } from './dialog/new-user/new-user.component';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'email', 'operator', 'id_secretary', 'excluir', 'editar'];
  dataSource = new MatTableDataSource<User>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
}

openDialogNewUser(): void {
  const dialogRef = this.dialog.open(NewUserComponent, {
      width: '600px',
  });

  dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
  });
}

}

const ELEMENT_DATA: User[] = [
  { id: 1, name: "Fabiano Portela", email: 'fabianoportell@gmail.com', phone: '81 9999.9999', registration: '125351', cpf: '123.543.542-98', id_location: 12, id_profile: 5, id_secretary: 5, operator: 'Administrador'  },
  { id: 1, name: "Fabiano Portela", email: 'fabianoportell@gmail.com', phone: '81 9999.9999', registration: '125351', cpf: '123.543.542-98', id_location: 12, id_profile: 5, id_secretary: 5, operator: 'Administrador'  },
] 
