import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ProductSolicitation } from '../../core/models/product-solicitation.model';
import { environment } from './../../../environments/environment';
import { RequestService } from './request.service';

@Injectable({
    providedIn: 'root'
})
export class ProductSolicitationService {

    private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    constructor(private requestService: RequestService) { }

    findAllProductSolicitation(): Observable<any> {
        return this.requestService
            .Get(`${environment.apiEndpoint.api}/product-solicitation/findAllProductSolicitation`);
    }

    findProductSolicitationById(id: number): Observable<any> {
        return this.requestService
            .Get(`${environment.apiEndpoint.api}/product-solicitation/findProductSolicitationById/${id}`);
    }

    createProductSolicitation(productSolicitation: ProductSolicitation[]) {
        return this.requestService
            .Post(`${environment.apiEndpoint.api}/product-solicitation/createProductSolicitation`, productSolicitation);
    }

    updateProductSolicitation(productSolicitation: ProductSolicitation, id: string) {
        return this.requestService
            .Post(`${environment.apiEndpoint.api}/product-solicitation/updateProductSolicitation/${id}`, productSolicitation);
    }

    deleteProductSolicitation(id: string): Observable<any> {
        return this.requestService
            .Delete(`${environment.apiEndpoint.api}/product-solicitation/deleteProductSolicitation/${id}`);
    }
}
