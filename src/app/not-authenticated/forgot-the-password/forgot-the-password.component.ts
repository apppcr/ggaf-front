import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-forgot-the-password',
    templateUrl: './forgot-the-password.component.html',
    styleUrls: ['./forgot-the-password.component.scss']
})
export class ForgotThePasswordComponent implements OnInit {

    forgotPasswordFormGroup: FormGroup;

    constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {
        this.forgotPasswordFormGroup = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    buttonSendEmail(): void {

    }
}
