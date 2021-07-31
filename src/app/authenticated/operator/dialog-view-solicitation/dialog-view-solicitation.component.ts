import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';

import { ProductSolicitationService } from '../../../shared/services/product-solicitation.service';
import { SolicitationService } from '../../../shared/services/solicitation.service';
import { ProductService } from '../../../shared/services/product.service';

import { Product } from '../../../core/models/product.model';
import { Solicitation } from '../../../core/models/solicitation.model';
import { ProductSolicitation } from '../../../core/models/product-solicitation.model';

@Component({
    selector: 'app-dialog-view-solicitation',
    templateUrl: './dialog-view-solicitation.component.html',
    styleUrls: ['./dialog-view-solicitation.component.scss']
})
export class DialogViewSolicitationComponent implements OnInit {

    currentSolicitation: Solicitation;
    currentProductSolicitation: ProductSolicitation;

    address = '';
    city = '';
    complement = '';
    date_request: Date;
    district = '';
    email = '';
    number = 0;
    registration = '';
    request_number = '';
    requester = '';
    state = '';
    status = '';
    cep = '';

    displayedColumns: string[] = ['cadum', 'nomeProduto', 'descricaoProduto', 'qtdProdutos'];
    dataSource = new MatTableDataSource<ProductSolicitation>();

    @ViewChild(MatPaginator) paginator: MatPaginator;

    allproducts: Product[] = [];

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    constructor(
        @Inject(MAT_DIALOG_DATA)
        private data: any,
        private productSolicitationService: ProductSolicitationService,
        private solicitationService: SolicitationService,
        private productService: ProductService,
    ) { }

    ngOnInit(): void {

        Observable.forkJoin([
            this.solicitationService.findSolicitationById(this.data.idSolicitation),
            this.productSolicitationService.findProductSolicitationById(this.data.idSolicitation),
            this.productService.getAllProduct(),
        ]).subscribe((result) => {

            if (result[0].length > 0) {
                this.currentSolicitation = result[0][0];
                this.address = this.currentSolicitation.address;
                this.city = this.currentSolicitation.city;
                this.complement = this.currentSolicitation.complement;
                this.date_request = this.currentSolicitation.date_request;
                this.district = this.currentSolicitation.district;
                this.email = this.currentSolicitation.email;
                this.number = this.currentSolicitation.number;
                this.registration = this.currentSolicitation.registration;
                this.request_number = this.currentSolicitation.request_number;
                this.requester = this.currentSolicitation.requester;
                this.state = this.currentSolicitation.state;
                this.status = this.currentSolicitation.status;
                this.cep = this.currentSolicitation.zip_code;
            }

            if (result[1].length > 0) {
                this.dataSource.data = result[1];
            }

            if (result[2].length > 0) {
                this.allproducts = result[2];
            }
        });
    }

    getProductById(id: number): Product {
        return this.allproducts.find(ap => ap.id === id);
    }

}
