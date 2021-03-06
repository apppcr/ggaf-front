import { AlertService } from './../../../../../shared/alert.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Secretary } from '../../../../../core/models/secretary.model';
import { SecretaryService } from '../../../../../shared/services/secretary.service';

@Component({
    selector: 'app-new-secretary',
    templateUrl: './new-secretary.component.html',
    styleUrls: ['./new-secretary.component.scss']
})
export class NewSecretaryComponent implements OnInit {

    secretariaFormGroup: FormGroup;
    hide: any;

    allSecretarys: Secretary[] = [];
    currentSecretary: Secretary;

    constructor(
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA)
        private data: any,
        private secretaryService: SecretaryService,
        public dialogRef: MatDialogRef<NewSecretaryComponent>,
        private alert: AlertService
    ) { }

    ngOnInit(): void {

        this.secretariaFormGroup = this.formBuilder.group({
            name: ['', Validators.required],
            responsible: ['', Validators.required],
        });

        if (!!this.data) {
            this.allSecretarys = this.data.allSecretarys;
            if (!!this.data.currentSecretary) {
                this.currentSecretary = this.data.currentSecretary;
                this.setSecretaryEdit(this.currentSecretary);
            }
        }
    }

    setSecretaryEdit(currentSecretary: Secretary): void {
        this.secretariaFormGroup.get('name').setValue(currentSecretary.name);
        this.secretariaFormGroup.get('responsible').setValue(currentSecretary.responsible);
    }

    validateIfSecretaryExists(): boolean {
        const currentSecretaria = this.secretariaFormGroup.get('name').value;
        return !!this.allSecretarys.find(x => x.name.toLowerCase() === currentSecretaria.toLowerCase()
            && x.id !== this.currentSecretary?.id);
    }

    saveOrUpdate(): void {
        if (this.secretariaFormGroup.valid) {

            if (this.validateIfSecretaryExists()) {
                this.alert.sucess(`Secretaria informada, j?? encontra-se cadastrado.`);
            } else {
                const secretary: Secretary = {
                    name: this.secretariaFormGroup.get('name').value,
                    responsible: this.secretariaFormGroup.get('responsible').value,
                    operator: JSON.parse(localStorage.getItem('currentUser')).email,
                };

                if (!!this.currentSecretary) {
                    this.secretaryService.updateSecretary(secretary, this.currentSecretary.id.toString())
                        .subscribe(result => {
                            this.alert.sucess('Secretaria editada com sucesso!');
                            this.dialogRef.close(true);
                        });
                } else {

                    this.secretaryService.createSecretary(secretary)
                        .subscribe(result => {
                            this.alert.sucess('Secretaria salvo com sucesso!');
                            this.dialogRef.close(true);
                        });
                }
            }

        } else {
            this.alert.warning('Favor preencher todos os campos.');
        }
    }

    close(): void {
        this.dialogRef.close(false);
    }
}
