import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Solicitation } from '../../core/models/solicitation.model';
import { FilterSolicitation } from '../../core/models/filter/filter-solicitation.models';

import { environment } from './../../../environments/environment';
import { RequestService } from './request.service';

@Injectable({
    providedIn: 'root'
})
export class SolicitationService {

    private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    constructor(private requestService: RequestService) { }

    findAllSolicitation(): Observable<any> {
        return this.requestService.Get(`${environment.apiEndpoint.api}/solicitation/findAllSolicitation`);
    }

    findSolicitationById(id: number): Observable<any> {
        return this.requestService.Get(`${environment.apiEndpoint.api}/solicitation/findSolicitationById/${id}`);
    }

    findSolicitationByEmail(email: string): Observable<any> {
        return this.requestService.Get(`${environment.apiEndpoint.api}/solicitation/findSolicitationByEmail/${email}`);
    }

    createSolicitation(solicitation: Solicitation) {
        return this.requestService.Post(`${environment.apiEndpoint.api}/solicitation/createSolicitation`, solicitation);
    }
    
    filterSolicitation(solicitation: FilterSolicitation) {
        return this.requestService.Post(`${environment.apiEndpoint.api}/solicitation/filterSolicitation`, solicitation);
    }

    updateSolicitation(solicitation: Solicitation, id: string) {
        return this.requestService.Post(`${environment.apiEndpoint.api}/solicitation/updateSolicitation/${id}`, solicitation);
    }

    deleteSolicitation(id: string): Observable<any> {
        return this.requestService.Delete(`${environment.apiEndpoint.api}/solicitation/deleteSolicitation/${id}`);
    }
}
