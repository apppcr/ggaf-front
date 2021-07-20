import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Product } from '../../../core/models/product.model';
import { NewProductComponent } from './dialog/new-product/new-product.component';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

    displayedColumns: string[] = ['id', 'produto', 'descricao', 'excluir', 'editar'];
    dataSource = new MatTableDataSource<Product>(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(public dialog: MatDialog) { }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
    }

    openDialogNewProduct(): void {
        const dialogRef = this.dialog.open(NewProductComponent, {
            width: '600px',
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }
}

const ELEMENT_DATA: Product[] = [
    { id: 1, name: "produto 1", description: "descricao 1" },
    { id: 2, name: "produto 2", description: "descricao 2" },
    { id: 3, name: "produto 3", description: "descricao 3" },
    { id: 4, name: "produto 4", description: "descricao 4" },
    { id: 5, name: "produto 5", description: "descricao 5" },
    { id: 6, name: "produto 6", description: "descricao 6" },
    { id: 7, name: "produto 7", description: "descricao 7" },
    { id: 8, name: "produto 8", description: "descricao 8" },
    { id: 9, name: "produto 9", description: "descricao 9" },
]
