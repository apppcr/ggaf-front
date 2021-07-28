import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';

import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, AfterViewInit {

    isLogged = false;
    idAdmin = false;
    menuAdministration = [];
    constructor(
        private userService: UserService,
        private router: Router
    ) { }

    ngAfterViewInit(): void {
        this.getLoggedInUserAndProfile();
        this.loadMenuAdm();
    }

    ngOnInit(): void {
        this.loadMenuAdm();
        this.getLoggedInUserAndProfile();
    }

    loadMenuAdm(): void {
        this.menuAdministration = [
            { label: 'Centro de Custo', link: 'administrator/cost-center' },
            { label: 'Localização', link: 'administrator/location' },
            { label: 'Produtos', link: 'administrator/product' },
            { label: 'Usuários', link: 'administrator/user' },
            { label: 'Almoxarifado', link: 'administrator/warehouses' }
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

}
