import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from './../../../environments/environment';
import { Wharehouse } from '../../core/models/wharehouse.model';
import { RequestService } from './request.service';


@Injectable({
    providedIn: 'root'
})
export class WharehouseService {

    private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    constructor(private requestService: RequestService) { }

    findAllWharehouse(): Observable<any> {
        return this.requestService.Get(`${environment.apiEndpoint.api}/wharehouse/findAllWharehouse`);
    }

    createWharehouse(wharehouse: Wharehouse) {
        return this.requestService.Post(`${environment.apiEndpoint.api}/wharehouse/createWharehouse`, wharehouse);
    }

    updateWharehouse(wharehouse: Wharehouse, id: string) {
        return this.requestService.Post(`${environment.apiEndpoint.api}/wharehouse/updateWharehouse/${id}`, wharehouse);
    }

    deleteWharehouse(id: string): Observable<any> {
        return this.requestService.Delete(`${environment.apiEndpoint.api}/wharehouse/deleteWharehouse/${id}`);
    }
}
