import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../../../../core/models/user.model';
import { Email } from '../../../../core/models/email.model';
import { Product } from '../../../../core/models/product.model';
import { Warehouse } from '../../../../core/models/warehouse.model';
import { Solicitation } from '../../../../core/models/solicitation.model';
import { ProductSolicitation } from '../../../../core/models/product-solicitation.model';

import { ProductSolicitationService } from '../../../../shared/services/product-solicitation.service';
import { SolicitationService } from '../../../../shared/services/solicitation.service';
import { EmailService } from '../../../../shared/services/email.service';
import { AlertService } from '../../../../shared/alert.service';

import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-dialog-manager-request',
    templateUrl: './dialog-manager-request.component.html',
    styleUrls: ['./dialog-manager-request.component.scss']
})
export class DialogManagerRequestComponent implements OnInit {

    formManager: FormGroup;

    allWharehouse: Warehouse[];
    allproducts: Product[] = [];

    currentSolicitation: Solicitation;

    currentUser: User;

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

    constructor(
        private dialogRef: MatDialogRef<any>,
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA)
        private data: any,

        private productSolicitationService: ProductSolicitationService,
        private solicitationService: SolicitationService,
        private emailService: EmailService,
        private alert: AlertService,
    ) { }

    ngOnInit(): void {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.allWharehouse = this.data.allWharehouse;
        this.allproducts = this.data.allproducts;

        this.formManager = this.formBuilder.group({
            approve: ['', Validators.required],
            observation: [''],
        });

        Observable.forkJoin([
            this.solicitationService.findSolicitationById(this.data.idSolicitation)
        ]).subscribe((result) => {
            this.currentSolicitation = result[0][0];
            this.request_number = this.currentSolicitation.request_number;

            this.date_request = this.currentSolicitation.date_request;
            this.email = this.currentSolicitation.email;
            this.registration = this.currentSolicitation.registration;
            this.requester = this.currentSolicitation.requester;
            this.status = this.currentSolicitation.status;
        });
    }

    toApprove(): void {
        const oldOperador = this.currentSolicitation.operator
        if (this.formManager.valid) {
            const status = this.formManager.get('approve').value === 'Sim' ? 'Aprovado' : 'Reprovado';

            this.currentSolicitation.status = status;
            this.currentSolicitation.operator = this.currentUser.email;

            this.solicitationService.updateSolicitation(this.currentSolicitation, this.data.idSolicitation)
                .subscribe(result => {
                    const status = this.formManager.get('approve').value === 'Sim' ? 'aprovada' : 'reprovada';
                    const solicitation = this.currentSolicitation;

                    this.productSolicitationService.findProductSolicitationById(solicitation.id)
                        .subscribe(resultProductSolicitation => {
                            const currentProductSolicitation: ProductSolicitation[] = resultProductSolicitation;
                            const emailOperatorAndManager = this.ruleCreateEmailOperatorAndManager(currentProductSolicitation, oldOperador);
                            const emailmailRequester = this.ruleCreateEmailRequester(currentProductSolicitation);

                            this.emailService.send(emailOperatorAndManager)
                                .subscribe(result => {
                                    this.emailService.send(emailmailRequester)
                                        .subscribe(result => {
                                            this.alert.sucess(`Solicitação ${status} com sucesso!`);
                                            this.dialogRef.close();
                                        });
                                });
                        });
                });
        }
    }

    ruleCreateEmailRequester(currentProductSolicitation: ProductSolicitation[]): Email {

        const email: Email = {
            from: this.currentSolicitation.email,
            to: [],
            subject: `GGAF - Requisição número ${this.currentSolicitation.request_number}`,
        }

        if (this.formManager.get('approve').value === 'Sim') {
            email.html = this.createTextEmail(this.currentSolicitation, currentProductSolicitation, false);
            email.to = [this.currentSolicitation.email];
        } else {
            email.html = `Sua requisição de número ${this.currentSolicitation.request_number} foi reprovada.
            <br><br>
            Para mais informações entre em contato atráves do telefone (81) 0000-0000`;
            email.to = [this.currentSolicitation.email];
        }

        return email;

    }

    ruleCreateEmailOperatorAndManager(currentProductSolicitation: ProductSolicitation[], oldOperador: string): Email {

        const email: Email = {
            from: this.currentSolicitation.email,
            to: [],
            subject: `GGAF - Requisição número ${this.currentSolicitation.request_number}`,
        }

        if (this.formManager.get('approve').value === 'Sim') {
            email.html = this.createTextEmail(this.currentSolicitation, currentProductSolicitation, true);

            const emailTo = [this.currentUser.email, oldOperador];
            email.to = emailTo.filter((v, i, a) => a.indexOf(v) === i);

        } else {
            let msg = '';

            msg += `Sua requisição de número ${this.currentSolicitation.request_number} foi reprovada.
            <br>`;

            msg += '<h4>Observações</h4>';
            msg += `${this.formManager.get('observation').value} <br><br>`;

            msg += `Para mais informações entre em contato atráves do telefone (81) 0000-0000`;

            email.html = msg;

            email.to = [this.currentSolicitation.email];
        }

        return email;

    }

    createTextEmail(solicitation: Solicitation, productSolicitation: ProductSolicitation[], isEmailOperatorAndManager: boolean): string {
        let msg = `Sua requisição de número ${solicitation.request_number} foi aprovada com sucesso! <br><br>`;
        msg += 'Segue os detalhes do seu pedido: <br>';

        msg += '<h4>PRODUTOS</h4>';

        if (productSolicitation.length > 0) {
            msg += this.createTableProducts(productSolicitation);
        }

        if (isEmailOperatorAndManager) {
            msg += '<h4>OBSERVAÇÒES</h4>';
            msg += `${this.formManager.get('observation').value} <br>`;
        }

        msg += '<h4>ENDEREÇO DE ENTREGA</h4>';

        msg += `<p> ${this.currentSolicitation.address}, ${this.currentSolicitation.number} - ${this.currentSolicitation.district} <br> ${this.currentSolicitation.city} - ${this.currentSolicitation.state}, ${this.currentSolicitation.zip_code} </p> `

        msg += '<h4>DADOS DO REQUERENTE </h4>';
        msg += `Nome: ${this.currentSolicitation.requester}<br>`;
        msg += `E-mail: ${this.currentSolicitation.email}<br>`;

        msg += `<br> Para mais detalhes acesse ${environment.linkSystem}.`;

        return msg;
    }

    createTableProducts(productSolicitation: ProductSolicitation[]): string {

        const products = [];

        productSolicitation.forEach((x: ProductSolicitation) => {
            const msgProduct = `
            <tr>
                <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${x.cadum}</td>
                <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${this.getProductById(x.id_product).name}</td>
                <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${x.amount}</td>
            </tr>
            `;
            products.push(msgProduct);
        });

        let table = `<table style="border-collapse: collapse; width: 60%;">
                        <tr>
                            <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">CADUM</th>
                            <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Nome do Produto</th>
                            <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Quantidade</th>
                        </tr>
                        ${products.join().replace(/,/g, ' ')}
                    </table>`;
        return table;
    }

    getProductById(id: number): Product {
        return this.allproducts.find(ap => ap.id === id);
    }

}
