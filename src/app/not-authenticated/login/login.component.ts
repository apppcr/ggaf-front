import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../../shared/services/user.service';
import { AuthService } from '../../shared/services/auth.service';

import { ProfileService } from './../../shared/services/profile.service';
import { Profile } from '../../core/models/profile.model';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    hide: any;
    loginFormGroup: FormGroup;
    allProfile: Profile[];

    constructor(
        private router: Router,
        private auth: AuthService,
        private formBuilder: FormBuilder,
        private userService: UserService,
        private profileService: ProfileService
    ) { }

    ngOnInit(): void {
        this.loginFormGroup = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
        });

        this.profileService.findAllProfile()
            .subscribe((result: any) => {
                if (result.length > 0) {
                    console.log(result);
                    this.allProfile = result;
                }
            });
    }

    buttonLogin(): void {
        if (this.loginFormGroup.status === 'VALID') {

            const emailInput = this.loginFormGroup.get('email').value;
            const passwordInput = this.loginFormGroup.get('password').value;

            this.auth.signIn(emailInput, passwordInput).then((resultFirebase) => {
                console.log(resultFirebase.user);
                this.userService.findUserByEmail(emailInput)
                    .subscribe((result) => {
                        if (result.length > 0) {
                            localStorage.setItem('currentUser', JSON.stringify(result[0]));
                            localStorage.setItem('userFirebase', JSON.stringify(resultFirebase.user));

                            this.redirectByProfile(result[0].id_profile)
                        };
                    });
            });
        }
    }

    redirectByProfile(currentIdProfile: number): void {

        const nameProfile = this.allProfile.find(x => x.id === currentIdProfile).name;

        if (!!nameProfile) {
            const routeByProfile = [
                { nameProfile: 'Administrador', link: '/request/view' },
                { nameProfile: 'Analista', link: '/analyst/manage-all-requests' },
                { nameProfile: 'Operador', link: '/operator/view' },
            ];

            const link = routeByProfile.find(x => x.nameProfile === nameProfile).link
            this.router.navigate([link]);
        } else {
            this.router.navigate(['/operator/view']);
        }

    }

    forgotThePassword(): void {
        this.router.navigate(['/forgot-password']);
    }

}
