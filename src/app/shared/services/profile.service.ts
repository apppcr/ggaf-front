import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from './../../../environments/environment';
import { Profile } from '../../core/models/profile.model';
import { RequestService } from './request.service';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    constructor(private requestService: RequestService) { }

    findAllProfile(): Observable<any> {
        return this.requestService.Get(`${environment.apiEndpoint.api}/profile/findAllProfile`);
    }

    createProfile(profile: Profile) {
        return this.requestService.Post(`${environment.apiEndpoint.api}/profile/createProfile`, profile);
    }

    updateProfile(profile: Profile, id: string) {
        return this.requestService.Post(`${environment.apiEndpoint.api}/profile/updateProfile/${id}`, profile);
    }

    deleteProfile(id: string): Observable<any> {
        return this.requestService.Delete(`${environment.apiEndpoint.api}/profile/deleteProfile/${id}`);
    }

}
