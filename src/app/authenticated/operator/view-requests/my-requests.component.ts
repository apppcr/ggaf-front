import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

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
export class MyRequestsComponent implements OnInit {

    displayedColumns: string[] = ['numeroSolicitacao', 'solicitante', 'dataSolicitacao', 'status', 'verPedido'];
    dataSource = [];

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
                this.dataSource = this.allSocitation;
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

}
