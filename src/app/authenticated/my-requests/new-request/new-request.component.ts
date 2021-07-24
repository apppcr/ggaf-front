import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EMPTY, Observable } from 'rxjs';

import { MatPaginator } from '@angular/material/paginator';
import { Product } from 'src/app/core/models/product.model';
import { ProductService } from './../../../shared/services/product.service';
import { ProductSolicitation } from 'src/app/core/models/product-solicitation.model';

import {
    NgxViacepService,
    Endereco,
    CEPError,
} from "@brunoc/ngx-viacep";
import { catchError } from 'rxjs/operators';

@Component({
    selector: 'app-new-request',
    templateUrl: './new-request.component.html',
    styleUrls: ['./new-request.component.scss']
})
export class NewRequestComponent implements OnInit, AfterViewInit {

    displayedColumns: string[] = ['cadum', 'nomeProduto', 'descricaoProduto', 'qtdProdutos', 'excluir', 'editar'];
    dataSource = new MatTableDataSource<ProductSolicitation>();

    @ViewChild(MatPaginator) paginator: MatPaginator;

    allproducts: Product[] = [];

    productSolicitationSelected: ProductSolicitation[] = [];

    formRequestGroup: FormGroup;
    formAddProductGroup: FormGroup;

    constructor(
        public dialog: MatDialog,
        private formBuilder: FormBuilder,
        private productService: ProductService,
        private viacep: NgxViacepService
    ) { }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    ngOnInit(): void {
        this.formRequestGroup = this.formBuilder.group({
            registration: ['', Validators.required],
            requester: ['', Validators.required],
            email: ['', Validators.required, Validators.email],
            requestDate: [Validators.required],
            zipCode: ['', Validators.required],
            address: ['', Validators.required],
            number: [0, Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            complement: [''],
            district: ['', Validators.required],
        });

        this.formAddProductGroup = this.formBuilder.group({
            cadum: ['', Validators.required],
            amount: ['', Validators.required],
            product: ['', Validators.required],
        });

        Observable.forkJoin([
            this.productService.getAllProduct()
        ]).subscribe((result) => {
            if (result[0].length > 0) {
                this.allproducts = result[0];
                console.log(this.allproducts);
            }
        });
    }

    getProductById(id: number): Product {
        return this.allproducts.find(ap => ap.id === id);
    }

    addProduct(): void {

        if (this.formAddProductGroup.valid) {
            // SALVAR ESSES DADOS NO BACKEND, DEPOIS QUE SALVAR A SOLICITACAO
            const itemRequest: ProductSolicitation = {
                id_product: parseInt(this.formAddProductGroup.get('product').value, 10),
                cadum: this.formAddProductGroup.get('cadum').value,
                amount: this.formAddProductGroup.get('amount').value,
                operator: "string",
            }

            this.productSolicitationSelected.push(itemRequest);
            this.dataSource.data = [];
            this.dataSource.data = this.productSolicitationSelected;

            this.formAddProductGroup.reset();
        }

    }

    editProductSolicitation(idProduto: number): void {

        const currenteProduct: ProductSolicitation = this.productSolicitationSelected.find(pss => pss.id_product === idProduto);
        this.formAddProductGroup.get('product').setValue(currenteProduct.id_product);
        this.formAddProductGroup.get('cadum').setValue(currenteProduct.cadum);
        this.formAddProductGroup.get('amount').setValue(currenteProduct.amount);

        this.productSolicitationSelected = this.productSolicitationSelected.filter(pss => pss.id_product !== idProduto);

        this.dataSource.data = [];
        this.dataSource.data = this.productSolicitationSelected;

    }

    deleteProductSolicitation(idProduto: number): void {
        this.productSolicitationSelected = this.productSolicitationSelected.filter(pss => pss.id_product !== idProduto);

        this.dataSource.data = [];
        this.dataSource.data = this.productSolicitationSelected;
    }

    sendRequest(): void {
        if (this.formAddProductGroup.valid) {
            // const solicitation: Solicitation = {
            //     id?: number;
            //     requester: string;
            //     registration: string;
            //     date_request: Date;
            //     request_number: string;
            //     email: string;
            //     address: string;
            //     number: number;
            //     city: string;
            //     state: string;
            //     complement: string;
            //     id_secretary: number;
            //     status: string;
            //     id_warehouse: number;
            //     operator?: string;
            // }
        }
    }

    searchCep(): void {
        console.log("pegou");
        // const cep =
        const cep = '52071544';
        this.viacep
            .buscarPorCep(cep)
            .pipe(
                catchError((error: CEPError) => {
                    // Ocorreu algum erro :/
                    console.log(error.message);
                    return EMPTY;
                })
            )
            .subscribe((endereco: Endereco) => {
                // Endereço retornado :)
                console.log(endereco);

                this.formRequestGroup.get('address').disable();
                this.formRequestGroup.get('district').disable();
                this.formRequestGroup.get('city').disable();
                this.formRequestGroup.get('state').disable();

                this.formRequestGroup.get('address').setValue(endereco.logradouro);
                this.formRequestGroup.get('district').setValue(endereco.bairro);
                this.formRequestGroup.get('city').setValue(endereco.localidade);
                this.formRequestGroup.get('state').setValue(endereco.uf);
            });

    }
}
