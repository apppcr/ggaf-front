import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { User } from './../../../core/models/user.model';
import { Location } from './../../../core/models/location.model';
import { Secretary } from './../../../core/models/secretary.model';
import { Wharehouse } from './../../../core/models/wharehouse.model';
import { Solicitation } from './../../../core/models/solicitation.model';

import { DialogManagerRequestComponent } from './dialog/dialog-manager-request/dialog-manager-request.component';

import { LocationService } from './../../../shared/services/location.service';
import { SecretaryService } from '../../../shared/services/secretary.service';
import { WharehouseService } from '../../../shared/services/wharehouse.service';
import { SolicitationService } from '../../../shared/services/solicitation.service';
import {
    DialogViewSolicitationComponent
} from '../../my-requests/dialog/dialog-view-solicitation/dialog-view-solicitation.component';

@Component({
    selector: 'app-manage-all-requests',
    templateUrl: './manage-all-requests.component.html',
    styleUrls: ['./manage-all-requests.component.scss']
})
export class ManageAllRequestsComponent implements OnInit {

    displayedColumns: string[] = ['numeroSolicitacao', 'solicitante', 'secretaria', 'dataSolicitacao', 'status', 'pedidoPor', 'verPedido', 'gerenciarPedido'];
    dataSource = [];

    allLocation: Location[];
    allSecretary: Secretary[];
    allWharehouse: Wharehouse[];
    allSocitation: Solicitation[];

    currentUser: User;

    todosStatus = [
        { value: 'Aberto', viewValue: 'Aberto' },
        { value: 'Em Atendiment', viewValue: 'Em Atendimento' },
        { value: 'Aguardando Aprovaçã', viewValue: 'Aguardando Aprovação' },
        { value: 'Aprovado', viewValue: 'Aprovado' },
        { value: 'Reprovado', viewValue: 'Reprovado' }
    ];

    constructor(
        private router: Router,
        private dialog: MatDialog,
        private secretaryService: SecretaryService,
        private wharehouseService: WharehouseService,
        private solicitationService: SolicitationService,
        private locationService: LocationService
    ) { }

    ngOnInit(): void {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

        Observable.forkJoin([
            this.solicitationService.findAllSolicitation(),
            this.secretaryService.findAllSecretary(),
            this.wharehouseService.findAllWharehouse(),
            this.locationService.getAllLocation()
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
                this.allLocation = result[2];
            }

        });

    }

    openDialogView(id: number) {
        const dialogRef = this.dialog.open(DialogViewSolicitationComponent, {
            width: '800px',
            data: {
                idSolicitation: id
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

    openDialogManageRequest(id: number) {
        const dialogRef = this.dialog.open(DialogManagerRequestComponent, {
            width: '800px',
            data: {
                idSolicitation: id,
                allWharehouse: this.allWharehouse
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

}
