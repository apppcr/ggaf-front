import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Secretary } from '../../core/models/secretary.model';
import { environment } from './../../../environments/environment';
import { RequestService } from './request.service';

@Injectable({
    providedIn: 'root'
})
export class SecretaryService {

    private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    constructor(private requestService: RequestService) { }

    findAllSecretary(): Observable<any> {
        return this.requestService.Get(`${environment.apiEndpoint.api}/secretary/findAllSecretary`);
    }

    createSecretary(secretary: Secretary) {
        return this.requestService.Post(`${environment.apiEndpoint.api}/secretary/createSecretary`, secretary);
    }

    updateSecretary(secretary: Secretary, id: string) {
        return this.requestService.Post(`${environment.apiEndpoint.api}/secretary/updateSecretary/${id}`, secretary);
    }

    deleteSecretary(id: string): Observable<any> {
        return this.requestService.Delete(`${environment.apiEndpoint.api}/secretary/deleteSecretary/${id}`);
    }

}
