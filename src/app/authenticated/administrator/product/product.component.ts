import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { NewProductComponent } from './dialog/new-product/new-product.component';
import { ProductService } from './../../../shared/services/product.service';
import { AlertService } from './../../../shared/alert.service';
import { Product } from '../../../core/models/product.model';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

    displayedColumns: string[] = ['id', 'cadum', 'name', 'description', 'excluir', 'editar'];
    dataSource = new MatTableDataSource<Product>();
    @ViewChild(MatPaginator) paginator: MatPaginator;

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    allProducts: Product[] = [];

    constructor(
        public dialog: MatDialog,
        private productService: ProductService,
        private alert: AlertService
    ) { }

    ngOnInit(): void {
        Observable.forkJoin([
            this.productService.getAllProduct()
        ]).subscribe((result) => {
            if (result[0].length > 0) {
                this.allProducts = result[0];
                this.dataSource.data = this.allProducts;
            }
        });
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
    }

    openDialogNewOrEditProduct(id?: number): void {
        let product = null;

        if (!!id) {
            product = this.allProducts.find(product => product.id === id);
        }

        const dialogRef = this.dialog.open(NewProductComponent, {
            width: '600px',
            data: {
                allProducts: this.allProducts,
                currentProduct: product
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.dataSource.data = [];
                this.reloadTableProduct();
            }
            console.log(`Dialog result: ${result}`);
        });
    }

    reloadTableProduct(): void {
        this.productService.getAllProduct()
            .subscribe((result) => {
                if (result.length > 0) {
                    this.allProducts = result;
                    this.dataSource.data = [];
                    this.dataSource.data = this.allProducts;
                }
            });
    }

    editProduct(id: number): void {
        this.openDialogNewOrEditProduct(id);
    }

    ruleDeleteProduct(id: number): void {
        this.alert.dialogWarning(
            'Tem certeza que deseja excluir esse Produto?',
            'Você não poderá reverter isso!',
            'Sim, excluir!',
            'Não, cancelar!'
        ).then(result => {
            if (result.isConfirmed) {
                this.deleteProduct(id);
            }
        });
    }

    deleteProduct(id: number): void {
        this.productService.deleteProduct(id.toString())
            .subscribe((result) => {
                const product: any = this.allProducts.find(product => product.id === id);

                if (!!product && product.uid) {
                    this.productService.deleteProduct(product.uid)
                        .subscribe((result) => {
                            this.alert.sucess('Excluido com sucesso!');
                            this.dataSource.data = [];
                            this.reloadTableProduct();
                        });

                } else {
                    this.alert.sucess('Excluido com sucesso!');
                    this.dataSource.data = [];
                    this.reloadTableProduct();
                }

            });
    }
}

