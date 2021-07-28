import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { Warehouse } from '../../../../../core/models/warehouse.model';
import { Solicitation } from '../../../../../core/models/solicitation.model';
import { User } from '../../../../../core/models/user.model';

import { SolicitationService } from '../../../../../shared/services/solicitation.service';

@Component({
    selector: 'app-dialog-manager-request',
    templateUrl: './dialog-manager-request.component.html',
    styleUrls: ['./dialog-manager-request.component.scss']
})
export class DialogManagerRequestComponent implements OnInit {

    formManager: FormGroup;

    allWharehouse: Warehouse[];
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
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA)
        private data: any,
        private solicitationService: SolicitationService,
        private dialogRef: MatDialogRef<any>,
    ) {

    }

    ngOnInit(): void {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

        this.allWharehouse = this.data.allWharehouse;

        this.formManager = this.formBuilder.group({
            wharehouse: ['', Validators.required]
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

    forwardRequest(): void {
        if (this.formManager.get('wharehouse').valid) {

            this.currentSolicitation.id_warehouse = this.formManager.get('wharehouse').value;
            this.currentSolicitation.status = 'Em Atendimento';
            this.currentSolicitation.operator = this.currentUser.email;

            this.solicitationService.updateSolicitation(this.currentSolicitation, this.data.idSolicitation)
                .subscribe(result => {
                    alert('Solicitação encaminhada com sucesso!');
                    this.dialogRef.close();
                });
        }

    }

}
