import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import {
    DialogAddProductComponent
} from '../../../analyst/manage-all-requests/dialog/dialog-add-product/dialog-add-product.component';

interface CentroCusto {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'app-dialog-new-request',
    templateUrl: './dialog-new-request.component.html',
    styleUrls: ['./dialog-new-request.component.scss']
})
export class DialogNewRequestComponent implements OnInit {

    isplayedColumns: string[] = ['cadum', 'nomeProduto', 'descricaoProduto', 'qtdProdutos', 'excluir', 'editar'];
    dataSource = LIST_PRODUCTS;

    openDialogAddProduct() {
        const dialogRef = this.dialog.open(DialogAddProductComponent);

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

    constructor(public dialog: MatDialog) { }

    ngOnInit(): void {
    }

    centroCustos: CentroCusto[] = [
        { value: 'PRC-00001', viewValue: 'PRC-00001' },
        { value: 'PRC-00002', viewValue: 'PRC-00002' },
        { value: 'PRC-00003', viewValue: 'PRC-00003' }
    ];

}

const LIST_PRODUCTS: any[] = [
    { cadum: 'PCR123', nomeProduto: 'Papel A4', descricaoProduto: 'Papel para impressão', qtdProdutos: 30, excluir: '<mat-icon>delete</mat-icon>', editar: 'teste' },
    { cadum: 'PCR123', nomeProduto: 'Mesa Redonda', descricaoProduto: 'Mesa com 4 cadeiras', qtdProdutos: 11, excluir: '<mat-icon>delete</mat-icon>', editar: '<mat-icon>delete</mat-icon>' },
    { cadum: 'PCR123', nomeProduto: 'Notebook', descricaoProduto: 'Notebook Dell Inspiron I15-3501-A25P Intel Core I3 4GB', qtdProdutos: 2, excluir: '<mat-icon>delete</mat-icon>', editar: '<mat-icon>delete</mat-icon>' },
    { cadum: 'PCR123', nomeProduto: 'Fragmentadora', descricaoProduto: 'Fragmentadora Multilaser Of003 Com Cesto 127v 7 Folhas', qtdProdutos: 5, excluir: '<mat-icon>delete</mat-icon>', editar: '<mat-icon>delete</mat-icon>' },
];

