import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../shared/services/auth.service';
import { AlertService } from './../../shared/alert.service';

@Component({
    selector: 'app-forgot-the-password',
    templateUrl: './forgot-the-password.component.html',
    styleUrls: ['./forgot-the-password.component.scss']
})
export class ForgotThePasswordComponent implements OnInit {

    forgotPasswordFormGroup: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private auth: AuthService,
        private alert: AlertService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.forgotPasswordFormGroup = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    buttonSendEmail(): void {
        if (this.forgotPasswordFormGroup.valid) {
            const email = this.forgotPasswordFormGroup.get('email').value;
            this.auth.sendPasswordResetEmail(email)
                .then(arg => {
                    this.router.navigate(['/']);
                    this.alert.sucess('E-mail com redefinição de senha enviado com sucesso!');
                });
        }
    }
}
