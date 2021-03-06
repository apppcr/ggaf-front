
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import 'rxjs/add/operator/catch';

import { AlertService } from './../../../shared/alert.service';
import { Secretary } from '../../../core/models/secretary.model';
import { NewSecretaryComponent } from './dialog/new-secretary/new-secretary.component'
import { SecretaryService } from './../../../shared/services/secretary.service';

@Component({
  selector: 'app-secretary',
  templateUrl: './secretary.component.html',
  styleUrls: ['./secretary.component.scss']
})
export class SecretaryComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'responsible', 'excluir', 'editar'];
  dataSource = new MatTableDataSource<Secretary>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  allSecretarys: Secretary[] = [];

  constructor(
    public dialog: MatDialog,
    private secretaryService: SecretaryService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    Observable.forkJoin([
      this.secretaryService.findAllSecretary()
    ]).subscribe((result) => {
      if (result[0].length > 0) {
        this.allSecretarys = result[0];
        this.dataSource.data = this.allSecretarys;
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  openDialogNewOrEditSecretary(id?: number): void {
    let secretary = null;

    if (!!id) {
      secretary = this.allSecretarys.find(secretary => secretary.id === id);
    }

    const dialogRef = this.dialog.open(NewSecretaryComponent, {
      width: '600px',
      data: {
        allSecretarys: this.allSecretarys,
        currentSecretary: secretary
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.data = [];
        this.reloadTableSecretary();
      }
      console.log(`Dialog result: ${result}`);
    });
  }

  reloadTableSecretary(): void {
    this.secretaryService.findAllSecretary()
      .subscribe((result) => {
        if (result.length > 0) {
          this.allSecretarys = result;
          this.dataSource.data = [];
          this.dataSource.data = this.allSecretarys;
        }
      });
  }

  editSecretary(id: number): void {
    this.openDialogNewOrEditSecretary(id);
  }

  ruleDeleteSecretary(id: number): void {
    this.alert.dialogWarning(
      'Tem certeza que deseja excluir essa Secretaria?',
      'Voc?? n??o poder?? reverter isso!',
      'Sim, excluir!',
      'N??o, cancelar!'
    ).then(result => {
      if (result.isConfirmed) {
        this.deleteSecretary(id);
      }
    });
  }

  deleteSecretary(id: number): void {

    this.secretaryService.deleteSecretary(id)
      .subscribe(
        (result) => {
          const secretary: any = this.allSecretarys
            .find(secretary => secretary.id === id);

          if (!!secretary && secretary.uid) {
            this.secretaryService.deleteSecretary(secretary.uid)
              .subscribe((result) => {
                this.alert.sucess('Excluido com sucesso!');
                this.dataSource.data = [];
                this.reloadTableSecretary();
              });

          } else {
            this.alert.sucess('Excluido com sucesso!');
            this.dataSource.data = [];
            this.reloadTableSecretary();
          }

        }, (err: any) => {
          this.alert.warning('Para excluir essa secret??ria, ser?? necess??rio desvincular a mesma do(s) usu??rio(s) cadastrado(s).');
          console.log("aqui", err);
        }
      );
  }
}
