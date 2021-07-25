import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Observable } from 'rxjs';
import 'rxjs/add/observable/forkJoin';

import { DialogNewRequestComponent } from './../dialog/dialog-new-request/dialog-new-request.component';
import { DialogTypeUserComponent } from './../dialog/dialog-type-user/dialog-type-user.component';

import { SolicitationService } from './../../../shared/services/solicitation.service';
import { WharehouseService } from './../../../shared/services/wharehouse.service';
import { SecretaryService } from './../../../shared/services/secretary.service';

import { Solicitation } from '../../../core/models/solicitation.model';
import { Secretary } from '../../../core/models/secretary.model';
import { Wharehouse } from '../../../core/models/wharehouse.model';

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

    constructor(
        private router: Router,
        private dialog: MatDialog,
        private SecretaryService: SecretaryService,
        private wharehouseService: WharehouseService,
        private solicitationService: SolicitationService,
    ) { }

    ngOnInit(): void {
        Observable.forkJoin([
            this.solicitationService.findAllSolicitation(),
            this.SecretaryService.findAllSecretary(),
            this.wharehouseService.findAllWharehouse()
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

        });

    }

    openDialog() {
        const dialogRef = this.dialog.open(DialogTypeUserComponent);

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

    openDialogNewRequest() {
        const dialogRef = this.dialog.open(DialogNewRequestComponent);

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

    newSocicitation(): void {
        this.router.navigate(['request/new'])
    }

}