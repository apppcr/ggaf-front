import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../../shared/services/user.service';

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
        private router: Router,
        private userService: UserService
    ) { }

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

            this.userService.findUserByEmail(emailInput)
                .subscribe((result) => {
                    if (result.length > 0) {
                        localStorage.setItem('currentUser', JSON.stringify(result[0]));
                        this.redirectByProfile(result[0].id_profile)
                        // this.router.navigate(['/request/view']);
                    }
                });
        }
    }

    redirectByProfile(currentIdProfile: number): void {
        const routeByProfile = [
            { idProfile: 1, link: '/request/view' },
            { idProfile: 2, link: '/analyst/manage-all-requests' },
        ];

        const link = routeByProfile.find(x => x.idProfile === currentIdProfile).link
        this.router.navigate([link]);

    }

    forgotThePassword(): void {
        this.router.navigate(['/forgot-password']);
    }

}
