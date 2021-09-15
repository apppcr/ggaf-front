import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { NewLocationComponent } from './dialog/new-location/new-location.component';
import { Location } from '../../../core/models/location.model';
import { LocationService } from './../../../shared/services/location.service';
import { AlertService } from './../../../shared/alert.service';


@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  displayedColumns: string[] = ['id', 'local', 'zip_code', 'address', 'number', 'city', 'district', 'excluir', 'editar'];
  dataSource = new MatTableDataSource<Location>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  allLocations: Location[] = [];

  constructor(
    public dialog: MatDialog,
    private locationService: LocationService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    Observable.forkJoin([
      this.locationService.getAllLocation(),
    ]).subscribe((result) => {
      if (result[0].length > 0) {
        this.allLocations = result[0];
        this.dataSource.data = this.allLocations;
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  openDialogNewOrEditLocation(id?: number): void {
    let location = null;

    if (!!id) {
      location = this.allLocations.find(location => location.id === id);
    }

    const dialogRef = this.dialog.open(NewLocationComponent, {
      width: '600px',
      data: {
        allLocations: this.allLocations,
        currentLocation: location
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.data = [];
        this.reloadTableLocation();
      }
      console.log(`Dialog result: ${result}`);
    });
  }

  reloadTableLocation(): void {
    this.locationService.getAllLocation()
      .subscribe((result) => {
        if (result.length > 0) {
          this.allLocations = result;
          this.dataSource.data = [];
          this.dataSource.data = this.allLocations;
        }
      });
  }

  editLocation(id: number): void {
    this.openDialogNewOrEditLocation(id);
  }

  ruleDeleteLocation(id: number): void {
    this.alert.dialogWarning(
      'Tem certeza que deseja excluir esse Localização?',
      'Você não poderá reverter isso!',
      'Sim, excluir!',
      'Não, cancelar!'
    ).then(result => {
      if (result.isConfirmed) {
        this.deleteLocation(id);
      }
    });
  }

  deleteLocation(id: number): void {
    this.locationService.deleteLocal(id.toString())
      .subscribe((result) => {
        const location: any = this.allLocations.find(location => location.id === id);

        if (!!location && location.uid) {
          this.locationService.deleteLocal(location.uid)
            .subscribe((result) => {
              this.alert.sucess('Excluido com sucesso!');
              this.dataSource.data = [];
              this.reloadTableLocation();
            });

        } else {
          this.alert.sucess('Excluido com sucesso!');
          this.dataSource.data = [];
          this.reloadTableLocation();
        }

      }, (err: any) => {
        this.alert.warning('Para excluir essa secretária, será necessário desvincular a mesma do(s) usuário(s) cadastrado(s).');
        console.log("aqui", err);
      }
      );
  }

}

