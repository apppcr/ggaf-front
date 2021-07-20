import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Secretary } from '../../../../../core/models/secretary.model';

@Component({
    selector: 'app-new-secretary',
    templateUrl: './new-secretary.component.html',
    styleUrls: ['./new-secretary.component.scss']
})
export class NewSecretaryComponent implements OnInit {


    secretariaFormGroup: FormGroup;

    constructor(private formBuilder: FormBuilder) {
        this.secretariaFormGroup = this.formBuilder.group({
            nome: ['', Validators.required],
            responsavel: ['', Validators.required],
            fundo: ['', Validators.required],
        });
    }

    ngOnInit(): void {
    }

    salvarSecretaria(): void {
        const objSecretaria: Secretary = {
            name: this.secretariaFormGroup.get('nome').value,
            responsible: this.secretariaFormGroup.get('responsavel').value,
            background: this.secretariaFormGroup.get('fundo').value,
            email: "String",
            operator: "String",
        }

        console.log(objSecretaria);
    }

}
