import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../../shared/services/user.service';
import { AuthService } from '../../shared/services/auth.service';

import { ProfileService } from './../../shared/services/profile.service';
import { AlertService } from './../../shared/alert.service';
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
    routeByProfile: any[] = [
        {
            name: 'Administrador', link: '/administrador'
        },
        {
            name: 'Analista', link: '/analista'
        },
        {
            name: 'Operador', link: '/operador'
        },
        {
            name: 'Gestor', link: '/gestor'
        }
    ];

    constructor(
        private router: Router,
        private auth: AuthService,
        private formBuilder: FormBuilder,
        private userService: UserService,
        private profileService: ProfileService,
        private alert: AlertService
    ) { }

    ngOnInit(): void {

        this.loginFormGroup = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
        });

        this.profileService.findAllProfile()
            .subscribe((result: any) => {
                if (result.length > 0) {
                    this.allProfile = result;
                }
            });
    }

    buttonLogin(): void {
        if (this.loginFormGroup.status === 'VALID') {

            const emailInput = this.loginFormGroup.get('email').value;
            const passwordInput = this.loginFormGroup.get('password').value;

            this.auth.signIn(emailInput, passwordInput)
                .then((resultFirebase) => {
                    localStorage.setItem('userFirebase', JSON.stringify(resultFirebase.user));

                    this.userService.findUserByEmail(emailInput)
                        .subscribe((result) => {

                            if (result.length > 0) {
                                localStorage.setItem('currentUser', JSON.stringify(result[0]));
                                this.redirectByProfile(result[0].id_profile)
                            } else {
                                this.alert.warning("Não há registro de usuário correspondente a este e-mail, por favor entre em contato com o administrador.");
                            };
                        });
                }).catch(e => {
                    console.log(e)
                    let msg = 'Desculpe, ocorreu um erro, tente novamente.';
                    if (e.code === 'auth/wrong-password') {
                        msg = 'Usuário e/ou senha inválido.'
                    } else if (e.code === 'auth/user-not-found') {
                        msg = 'Não há registro de usuário correspondente a este e-mail.'
                    }

                    this.alert.error(msg);
                });
        }
    }

    redirectByProfile(currentIdProfile: number): void {

        const nameProfile = this.allProfile.find(x => x.id === currentIdProfile).name;

        if (!!nameProfile) {
            const link = this.routeByProfile.find(x => x.name === nameProfile).link
            this.router.navigate([link]);
        } else {
            this.router.navigate(['/operador']);
        }

    }

    forgotThePassword(): void {
        this.router.navigate(['/forgot-password']);
    }

}
