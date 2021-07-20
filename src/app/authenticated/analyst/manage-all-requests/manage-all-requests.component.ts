import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Secretary } from './../../../core//models/secretary.model';
import { Location } from './../../../core//models/location.model';
import { User } from './../../../core//models/user.model';
import { Solicitation } from './../../../core//models/solicitation.model';
import { DialogManagerRequestComponent } from './dialog/dialog-manager-request/dialog-manager-request.component';
import { DialogNewRequestComponent } from './dialog/dialog-new-request/dialog-new-request.component';

@Component({
    selector: 'app-manage-all-requests',
    templateUrl: './manage-all-requests.component.html',
    styleUrls: ['./manage-all-requests.component.scss']
})
export class ManageAllRequestsComponent implements OnInit {

    displayedColumns: string[] = ['numeroSolicitacao', 'solicitante', 'secretaria', 'dataSolicitacao', 'status', 'pedidoPor', 'verPedido', 'gerenciarPedido'];
    dataSource = ELEMENT_DATA;

    todasSecretarias: Secretary[] = [
        { id: 1, name: 'Secretaria de Finanças 1', responsible: 'Fabiano', email: 'fabiano@gmail.com', background: 'N/A' },
        { id: 2, name: 'Secretaria de Finanças 2', responsible: 'Fabiano', email: 'fabiano@gmail.com', background: 'N/A' },
        { id: 3, name: 'Secretaria de Finanças 3', responsible: 'Fabiano', email: 'fabiano@gmail.com', background: 'N/A' },
        { id: 4, name: 'Secretaria de Finanças 4', responsible: 'Fabiano', email: 'fabiano@gmail.com', background: 'N/A' },
    ];

    todosLocais: Location[] = [
        { id: 1, name: 'Unidade 1', local: 'Local 1', address: 'address 1', zip_code: '11111-111', city: 'city 1', state: 'state 1' },
        { id: 2, name: 'Unidade 2', local: 'Local 2', address: 'address 2', zip_code: '22222-222', city: 'city 2', state: 'state 2' },
        { id: 3, name: 'Unidade 3', local: 'Local 3', address: 'address 3', zip_code: '33333-333', city: 'city 3', state: 'state 3' },
        { id: 4, name: 'Unidade 4', local: 'Local 4', address: 'address 4', zip_code: '44444-444', city: 'city 4', state: 'state 4' },
        { id: 5, name: 'Unidade 5', local: 'Local 5', address: 'address 5', zip_code: '55555-555', city: 'city 5', state: 'state 5' },
        { id: 6, name: 'Unidade 6', local: 'Local 6', address: 'address 6', zip_code: '66666-666', city: 'city 6', state: 'state 6' },
    ];

    todosSolicitantes: User[] = [
        {
            id: 1, name: 'Fabiano Portela 1', email: 'email 1', phone: '81 90000-0000', registration: 'registration 1', cpf: '111.111.111-11', id_secretary: 1, id_profile: 1, id_location: 1
        },
        {
            id: 2, name: 'Fabiano Portela 2', email: 'email 2', phone: '82 90000-0000', registration: 'registration 2', cpf: '222.222.222-22', id_secretary: 2, id_profile: 2, id_location: 2
        },
        {
            id: 3, name: 'Fabiano Portela 3', email: 'email 3', phone: '83 90000-0000', registration: 'registration 3', cpf: '333.333.333-33', id_secretary: 3, id_profile: 3, id_location: 3
        },
        {
            id: 4, name: 'Fabiano Portela 4', email: 'email 4', phone: '84 90000-0000', registration: 'registration 4', cpf: '444.444.444-44', id_secretary: 4, id_profile: 4, id_location: 4
        },
    ];

    todosStatus = [
        { value: '1', viewValue: 'Aberto' },
        { value: '2', viewValue: 'Em Atendimento' },
        { value: '3', viewValue: 'Aguardando Aprovação' },
        { value: '4', viewValue: 'Aprovado' },
        { value: '5', viewValue: 'Reprovado' }
    ];

    constructor(public dialog: MatDialog) { }

    ngOnInit(): void {
    }

    openDialogViewRequest() {
        const dialogRef = this.dialog.open(DialogNewRequestComponent);

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

    openDialogManageRequest() {
        const dialogRef = this.dialog.open(DialogManagerRequestComponent);

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

}

const ELEMENT_DATA: Solicitation[] = [
    {
        id: 1, requester: 'requester 1', registration: 'registration 1', date_request: new Date(), request_number: 'request_number 1', email: 'email 1', address: 'address 1', number: 1, city: 'city 1', state: 'state 1', complement: 'complement 1', id_secretary: 1, status: 'status 1', id_warehouse: 1
    },
    {
        id: 2, requester: 'requester 2', registration: 'registration 2', date_request: new Date(), request_number: 'request_number 2', email: 'email 2', address: 'address 2', number: 2, city: 'city 2', state: 'state 2', complement: 'complement 2', id_secretary: 2, status: 'status 2', id_warehouse: 2
    },
    {
        id: 3, requester: 'requester 3', registration: 'registration 3', date_request: new Date(), request_number: 'request_number 3', email: 'email 3', address: 'address 3', number: 3, city: 'city 3', state: 'state 3', complement: 'complement 3', id_secretary: 3, status: 'status 3', id_warehouse: 3
    },
]

