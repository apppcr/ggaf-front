import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot
} from '@angular/router';

import { UserService } from './../../shared/services/user.service';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class AccessPermissionGuard implements CanActivate {

    constructor(
        private router: Router,
        private userService: UserService
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | boolean {
        const userInfo: User = JSON.parse(localStorage.getItem('currentUser'));
      
        this.userService.setLoggedInUserAndProfile(
            { isLogged: !!userInfo, idPerfil: userInfo.id_profile }
        );

        return !!userInfo;
    }
}
