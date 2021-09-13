import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { AuthService } from './../../services/auth.service';
import { ProfileService } from '../../services/profile.service';

import { Profile } from '../../../core/models/profile.model';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, AfterViewInit {

    isLogged = false;
    idAdmin = false;
    menuAdministration = [];

    allProfile: Profile[];
    urlHome = '/operador';
    idPerfil = 0;

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
        private profileService: ProfileService,
        private userService: UserService,
        private authService: AuthService,
        private router: Router
    ) { }

    ngAfterViewInit(): void {
        this.getLoggedInUserAndProfile();
        this.loadMenuAdm();
    }

    ngOnInit(): void {

        this.profileService.findAllProfile()
            .subscribe((result: any) => {
                if (result.length > 0) {
                    this.allProfile = result;

                    this.userService.getLoggedInUserAndProfile().subscribe(user => {

                        if (!!user) {
                            this.isLogged = user.isLogged;
                            this.idAdmin = this.isUserAdmin(user.idPerfil);
                            this.idPerfil = user.idPerfil;

                            this.linkHomeByProfile(this.idPerfil);
                            this.loadMenuAdm();
                        }
                    });

                }
            });
    }

    isUserAdmin(idProfile: number): boolean {
        if (this.allProfile.length > 0 && idProfile > 0) {
            const nameProfile = this.allProfile?.find(x => x.id === idProfile).name;
            return nameProfile === 'Administrador';
        }
    }

    loadMenuAdm(): void {
        this.menuAdministration = [
            { label: 'Localização', link: 'administrador/location' },
            { label: 'Produtos', link: 'administrador/product' },
            { label: 'Usuários', link: 'administrador/user' },
            { label: 'Almoxarifado', link: 'administrador/warehouses' }
        ];
    }

    getLoggedInUserAndProfile(): void {
        this.userService.getLoggedInUserAndProfile().subscribe(user => {
            if (!!user) {
                this.isLogged = user.isLogged;
                this.idAdmin = user.idPerfil === 1;
            }
        });
    }

    logOff(): void {
        localStorage.setItem('currentUser', null);
        this.router.navigate(['/']);
        this.userService.setLoggedInUserAndProfile(
            { isLogged: null, idPerfil: null }
        )
    }

    linkHomeByProfile(currentIdProfile: number): void {

        const nameProfile = this.allProfile.find(x => x.id === currentIdProfile).name;

        if (!!nameProfile) {
            this.urlHome = this.routeByProfile.find(x => x.name === nameProfile).link
        }
    }

}
