import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { EMPTY, Observable } from 'rxjs';
import { Router } from '@angular/router';

import {
    NgxViacepService,
    Endereco,
    CEPError,
} from "@brunoc/ngx-viacep";
import { catchError } from 'rxjs/operators';

import { User } from '../../../core/models/user.model';
import { Email } from '../../../core/models/email.model';
import { Product } from '../../../core/models/product.model';
import { Wharehouse } from '../../../core/models/wharehouse.model';
import { Solicitation } from '../../../core/models/solicitation.model';
import { ProductSolicitation } from '../../../core/models/product-solicitation.model';

import { AlertService } from './../../../shared/alert.service';
import { UserService } from './../../../shared/services/user.service';
import { EmailService } from './../../../shared/services/email.service';
import { ProfileService } from './../../../shared/services/profile.service';
import { ProductService } from './../../../shared/services/product.service';
import { SolicitationService } from './../../../shared/services/solicitation.service';
import { ProductSolicitationService } from './../../../shared/services/product-solicitation.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-new-request',
    templateUrl: './new-request.component.html',
    styleUrls: ['./new-request.component.scss']
})
export class NewRequestComponent implements OnInit, AfterViewInit {

    displayedColumns: string[] = ['cadum', 'nomeProduto', 'descricaoProduto', 'qtdProdutos', 'excluir', 'editar'];
    dataSource = new MatTableDataSource<ProductSolicitation>();
    @ViewChild(MatPaginator) paginator: MatPaginator;

    formRequestGroup: FormGroup;
    formAddProductGroup: FormGroup;

    allWharehouse: Wharehouse[] = [];
    allproducts: Product[] = [];
    currentUser: User;
    currentEmail = '';
    isHideForm: boolean;

    productSolicitationSelected: ProductSolicitation[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private viacep: NgxViacepService,
        private router: Router,

        private userService: UserService,
        private profileService: ProfileService,
        private productService: ProductService,
        private solicitationService: SolicitationService,
        private productSolicitationService: ProductSolicitationService,
        private alert: AlertService,
        private emailService: EmailService
    ) { }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    ngOnInit(): void {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

        this.formRequestGroup = this.formBuilder.group({
            registration: ['', Validators.required],
            requester: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            requestDate: [Validators.required],
            zipCode: ['', [Validators.required, Validators.maxLength(9)]],
            address: ['', Validators.required],
            number: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            complement: [''],
            district: ['', Validators.required],
            wharehouse: ['', Validators.required],
            solicitationCurrenteUser: [2, Validators.required],
        });

        this.formAddProductGroup = this.formBuilder.group({
            cadum: ['', Validators.required],
            amount: ['', Validators.required],
            product: ['', Validators.required],
        });

        Observable.forkJoin([
            this.productService.getAllProduct(),
            this.profileService.findAllProfile(),
            this.userService.findUserByEmail(this.currentUser.email)
        ]).subscribe((result) => {
            if (result[0].length > 0) {
                this.allproducts = result[0];
            }

            if (result[2].length > 0) {
                this.currentUser = result[2][0];
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

    ruleToSaveRequest(): void {
        this.removeRequeridValidator();

        if (this.formAddProductGroup.valid && this.productSolicitationSelected.length > 0) {
            this.saveRequest();
        } else if (this.formAddProductGroup.valid && this.productSolicitationSelected.length === 0) {
            this.alert.sucess('Favor adicionar pelo menos um produto.');
        }
    }

    saveRequest(): void {
        const solicitation: Solicitation = {
            requester: this.formRequestGroup.get('requester').value,
            registration: this.formRequestGroup.get('registration').value,
            date_request: new Date(),
            email: this.formRequestGroup.get('email').value,

            address: this.formRequestGroup.get('address').value,
            number: parseInt(this.formRequestGroup.get('number').value, 10),
            city: this.formRequestGroup.get('city').value,
            state: this.formRequestGroup.get('state').value,
            zip_code: this.formRequestGroup.get('zipCode').value,
            district: this.formRequestGroup.get('district').value,
            complement: this.formRequestGroup.get('complement').value,
            createdBy: this.currentUser.name,

            status: 'Aberto',

            id_secretary: this.currentUser.id_secretary,
            operator: this.currentUser.email
        }

        this.solicitationService.createSolicitation(solicitation)
            .subscribe(result => {
                this.productSolicitationSelected.map(pss => {
                    pss.id_solicitation = result.id
                    return pss;
                });

                this.productSolicitationService
                    .createProductSolicitation(this.productSolicitationSelected)
                    .subscribe(resultProductSolicitation => {

                        this.solicitationService.findSolicitationById(result.id)
                            .subscribe(resultSolicitation => {
                                const solicitation: Solicitation = resultSolicitation[0];

                                this.productSolicitationService.findProductSolicitationById(solicitation.id)
                                    .subscribe(resultProductSolicitation => {
                                        const currentProductSolicitation: ProductSolicitation[] = resultProductSolicitation;

                                        const email: Email = {
                                            from: solicitation.email,
                                            to: [solicitation.email],
                                            subject: `GGAF - Requisição número ${solicitation.request_number}`,
                                            text: this.createTextEmail(solicitation, currentProductSolicitation)
                                        }

                                        this.emailService.send(email)
                                            .subscribe(result => {
                                                this.alert.sucess('Salvo com sucesso!');
                                                this.router.navigate(['/operador']);
                                            });

                                    });
                            });
                    });
            });
    }

    createTextEmail(solicitation: Solicitation, productSolicitation: ProductSolicitation[]): string {
        const products = [];
        let msg = `Sua requisição de número ${solicitation.request_number} foi criada com sucesso! \n\n`;

        if (productSolicitation.length > 0) {
            productSolicitation.forEach((x: ProductSolicitation) => {
                const msgProduct = `\n CADUM: ${x.cadum} | Nome do Produtor: ${this.getProductById(x.id_product).name} | Descrição: ${this.getProductById(x.id_product).description} | Quantidade: ${x.amount}`
                products.push(msgProduct);
            });
        }

        msg += products.join().replace(/,/g, ' ');
        msg += `\n\n Para mais detalhes acesse ${environment.linkSystem}.`;

        return msg;
    }

    removeRequeridValidator(): void {
        const inputs = ['cadum', 'amount', 'product'];
        inputs.forEach(item => {
            this.formAddProductGroup.get(item).setValidators([]);
            this.formAddProductGroup.get(item).updateValueAndValidity();
        });
    }

    searchCep(): void {
        const cep = this.formRequestGroup.get('zipCode').value;

        this.viacep
            .buscarPorCep(cep.replace('-', ''))
            .pipe(
                catchError((error: CEPError) => {
                    // Ocorreu algum erro :/
                    console.log(error.message);
                    return EMPTY;
                })
            )
            .subscribe((endereco: Endereco) => {
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

    onClickCheck(event: any): void {
        if (event.value === "1") {
            const currentUser: User = JSON.parse(localStorage.getItem('currentUser'));

            this.formRequestGroup.get('requester').setValue(currentUser.name);
            this.formRequestGroup.get('registration').setValue(currentUser.registration);
            this.formRequestGroup.get('email').setValue(currentUser.email);
        } else {
            this.formRequestGroup.get('requester').setValue('');
            this.formRequestGroup.get('registration').setValue('');
            this.formRequestGroup.get('email').setValue('');
        }
    }
}
