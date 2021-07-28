import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '../../core/models/user.model';
import { environment } from './../../../environments/environment';
import { RequestService } from './request.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    private userLoggedInUserAndProfile = new BehaviorSubject<any>(undefined);

    constructor(private requestService: RequestService) { }

    findAllUser(): Observable<any> {
        return this.requestService.Get(`${environment.apiEndpoint.api}/user/findAllUser`);
    }

    findUserByEmail(currentEmail: string) {
        return this.requestService.Get(`${environment.apiEndpoint.api}/user/findUserByEmail/${currentEmail}`);
    }

    createUser(user: User) {
        return this.requestService.Post(`${environment.apiEndpoint.api}/user/createUser`, user);
    }

    updateUser(user: User, id: string) {
        return this.requestService.Post(`${environment.apiEndpoint.api}/user/updateUser/${id}`, user);
    }

    deleteUser(id: string): Observable<any> {
        return this.requestService.Delete(`${environment.apiEndpoint.api}/user/deleteUser/${id}`);
    }

    setLoggedInUserAndProfile(user: any): void {
        this.userLoggedInUserAndProfile.next(user);
    }

    getLoggedInUserAndProfile(): Observable<any> {
        return this.userLoggedInUserAndProfile.asObservable();
    }
}
