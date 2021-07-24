import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

import { environment } from './../../../environments/environment';
import { Location } from '../../core/models/location.model';
import { RequestService } from './request.service';

@Injectable({
    providedIn: 'root'
})
export class LocationService {

    private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    constructor(private requestService: RequestService) { }

    getAllLocation(): Observable<any> {
        return this.requestService.Get(`${environment.apiEndpoint.api}/location/findAllLocal`);
    }

    createLocal(location: Location) {
        return this.requestService.Post(`${environment.apiEndpoint.api}/location/createLocal`, location);
    }

    updateLocal(location: Location, id: string) {
        return this.requestService.Post(`${environment.apiEndpoint.api}/location/updateLocal/${id}`, location);
    }

    deleteLocal(id: string): Observable<any> {
        return this.requestService.Delete(`${environment.apiEndpoint.api}/location/deleteLocal/${id}`);
    }
}
