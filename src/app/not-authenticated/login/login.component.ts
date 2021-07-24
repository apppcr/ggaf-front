import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    hide: any;
    loginFormGroup: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router) { }

    ngOnInit(): void {
        this.loginFormGroup = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
        });
    }

    buttonLogin(): void {
        if (this.loginFormGroup.status === 'VALID') {

            const emailInput = this.loginFormGroup.get('email').value;
            const passwordInput = this.loginFormGroup.get('password').value;

            this.router.navigate(['/request/view']);
        }
    }

    forgotThePassword(): void {
        this.router.navigate(['/forgot-password']);
    }

}
