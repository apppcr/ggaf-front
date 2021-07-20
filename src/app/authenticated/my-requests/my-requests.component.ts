import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DialogNewRequestComponent } from './dialog/dialog-new-request/dialog-new-request.component';
import { DialogTypeUserComponent } from './dialog/dialog-type-user/dialog-type-user.component';

@Component({
    selector: 'app-my-requests',
    templateUrl: './my-requests.component.html',
    styleUrls: ['./my-requests.component.scss']
})
export class MyRequestsComponent implements OnInit {

    displayedColumns: string[] = ['numeroSolicitacao', 'solicitante', 'centroDeCusto', 'dataSolicitacao', 'status', 'pedidoPor', 'verPedido'];
    dataSource = ELEMENT_DATA;

    constructor(public dialog: MatDialog) { }

    ngOnInit(): void {
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

}


const ELEMENT_DATA: any = [
    { numeroSolicitacao: 'PRC-2020-0001', solicitante: 'Rafael Araújo', centroDeCusto: '21312414', dataSolicitacao: '02/02/2021', status: 'Aberto', pedidoPor: 'Fabiano Portela', verPedido: 'ID' },
    { numeroSolicitacao: 'PRC-2020-0002', solicitante: 'André Pinheiro', centroDeCusto: '42423423', dataSolicitacao: '22/02/2021', status: 'Aberto', pedidoPor: 'Fabiano Portela', verPedido: 'ID' },
    { numeroSolicitacao: 'PRC-2020-0003', solicitante: 'Rodrigo Mendes', centroDeCusto: '21312414', dataSolicitacao: '02/04/2021', status: 'Em atendimento', pedidoPor: 'Fabiano Portela', verPedido: 'ID' },
    { numeroSolicitacao: 'PRC-2020-0004', solicitante: 'Yan Portela', centroDeCusto: '32312434', dataSolicitacao: '04/04/2021', status: 'Reprovado', pedidoPor: 'Fabiano Portela', verPedido: 'ID' },
    { numeroSolicitacao: 'PRC-2020-0005', solicitante: 'André Pinheiro', centroDeCusto: '31232211', dataSolicitacao: '15/03/2021', status: 'Aberto', pedidoPor: 'Fabiano Portela', verPedido: 'ID' },
    { numeroSolicitacao: 'PRC-2020-0006', solicitante: 'André Pinheiro', centroDeCusto: '42423423', dataSolicitacao: '20/03/2021', status: 'Finalizado', pedidoPor: 'Fabiano Portela', verPedido: 'ID' },
    { numeroSolicitacao: 'PRC-2020-0007', solicitante: 'Rodrigo Mendes', centroDeCusto: '34123123', dataSolicitacao: '12/04/2021', status: 'Finalizado', pedidoPor: 'Fabiano Portela', verPedido: 'ID' },
];
