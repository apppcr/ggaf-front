import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-dialog-manager-request',
    templateUrl: './dialog-manager-request.component.html',
    styleUrls: ['./dialog-manager-request.component.scss']
})
export class DialogManagerRequestComponent implements OnInit {

    almoxarifados: FormGroup;

    constructor(fb: FormBuilder) {
        this.almoxarifados = fb.group({
            expediente: false,
            alimentacao: false,
            higieneLimpeza: false,
            patrimonio: false,
            informatica: false
        });
    }

    ngOnInit(): void {
    }

}
