import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

import { RequestService } from './request.service';
import { Product } from '../../core/models/product.model';
import { environment } from './../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    constructor(private requestService: RequestService) { }

    getAllProduct(): Observable<any> {
        return this.requestService.Get(`${environment.apiEndpoint.api}/product/findAllProduct`);
    }

    createProduct(product: Product) {
        return this.requestService.Post(`${environment.apiEndpoint.api}/product/createProduct`, product);
    }

    updateProduct(product: Product, id: string) {
        return this.requestService.Post(`${environment.apiEndpoint.api}/product/updateProduct/${id}`, product);
    }

    deleteProduct(id: string): Observable<any> {
        return this.requestService.Delete(`${environment.apiEndpoint.api}/product/deleteProduct/${id}`);
    }
}
