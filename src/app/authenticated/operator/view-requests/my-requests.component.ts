import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Observable } from 'rxjs';
import 'rxjs/add/observable/forkJoin';

import { SolicitationService } from './../../../shared/services/solicitation.service';
import { WharehouseService } from './../../../shared/services/wharehouse.service';
import { SecretaryService } from './../../../shared/services/secretary.service';
import { ProductService } from './../../../shared/services/product.service';

import { Solicitation } from '../../../core/models/solicitation.model';
import { Wharehouse } from '../../../core/models/wharehouse.model';
import { Secretary } from '../../../core/models/secretary.model';
import { Product } from '../../../core/models/product.model';
import { User } from '../../../core/models/user.model';

import {
    DialogViewSolicitationComponent
} from '../dialog-view-solicitation/dialog-view-solicitation.component';


@Component({
    selector: 'app-my-requests',
    templateUrl: './my-requests.component.html',
    styleUrls: ['./my-requests.component.scss']
})
export class MyRequestsComponent implements OnInit, AfterViewInit {

    displayedColumns: string[] = ['numeroSolicitacao', 'solicitante', 'dataSolicitacao', 'status', 'verPedido'];
    dataSource: MatTableDataSource<any>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    allSocitation: Solicitation[];
    allSecretary: Secretary[];
    allWharehouse: Wharehouse[];
    allproducts: Product[] = [];

    currentUser: User;

    constructor(
        private router: Router,
        private dialog: MatDialog,

        private productService: ProductService,
        private SecretaryService: SecretaryService,
        private wharehouseService: WharehouseService,
        private solicitationService: SolicitationService,
    ) { }

    ngOnInit(): void {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

        Observable.forkJoin([
            this.solicitationService.findSolicitationByEmail(this.currentUser.email),
            this.SecretaryService.findAllSecretary(),
            this.wharehouseService.findAllWharehouse(),
            this.productService.getAllProduct(),
        ]).subscribe((result) => {

            if (result[0].length > 0) {
                this.allSocitation = result[0];
                this.dataSource = new MatTableDataSource(this.allSocitation);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            }

            if (result[1].length > 0) {
                this.allSecretary = result[1];
            }

            if (result[2].length > 0) {
                this.allWharehouse = result[2];
            }

            if (result[3].length > 0) {
                this.allproducts = result[3];
            }

        });
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    openDialogView(id: number) {
        const dialogRef = this.dialog.open(DialogViewSolicitationComponent, {
            width: '800px',
            data: {
                idSolicitation: id,
                allproducts: this.allproducts
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

    newSocicitation(): void {
        this.router.navigate(['operador/new-request'])
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}
