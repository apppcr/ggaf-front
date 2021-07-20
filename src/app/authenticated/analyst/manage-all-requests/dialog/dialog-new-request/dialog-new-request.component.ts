import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ProductSolicitation } from './../../../../../core/models/product-solicitation.model';
import { DialogAddProductComponent } from '../dialog-add-product/dialog-add-product.component';

@Component({
    selector: 'app-dialog-new-request',
    templateUrl: './dialog-new-request.component.html',
    styleUrls: ['./dialog-new-request.component.scss']
})
export class DialogNewRequestComponent implements OnInit {

    displayedColumns: string[] = ['cadum', 'nomeProduto', 'qtdProdutos', 'excluir', 'editar'];
    dataSource = LIST_PRODUCTS;

    openDialogAddProduct(): void {
        const dialogRef = this.dialog.open(DialogAddProductComponent);

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

    constructor(public dialog: MatDialog) { }

    ngOnInit(): void { }

    centroCustos = [
        { value: 'PRC-00001', viewValue: 'PRC-00001' },
        { value: 'PRC-00002', viewValue: 'PRC-00002' },
        { value: 'PRC-00003', viewValue: 'PRC-00003' }
    ];

}

const LIST_PRODUCTS: ProductSolicitation[] = [
    { id_product: 1, cadum: 'PCR123', amount: 30, id: 1, id_solicitation: 1 },
    { id_product: 1, cadum: 'PCR123', amount: 11, id: 1, id_solicitation: 1 },
    { id_product: 1, cadum: 'PCR123', amount: 2, id: 1, id_solicitation: 1 },
    { id_product: 1, cadum: 'PCR123', amount: 5, id: 1, id_solicitation: 1 },
];
