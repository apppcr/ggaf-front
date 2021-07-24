import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RequestService {

    constructor(
        private readonly http: HttpClient
    ) { }

    Post(path: string, obj: any, options: any = null): Observable<any> {
        if (options) {
            return this.http.post(`${path}`, obj, options);
        } else {
            return this.http.post(`${path}`, obj);
        }
    }

    Get(path: string, obj: any = ''): Observable<any> {
        return this.http.get(`${path}`, {
            params: obj
        });
    }

    GetBlob(path: string, obj: any = ''): Observable<any> {
        return this.http.get(`${path}`, {
            params: obj,
            responseType: 'blob' as 'json'
        });
    }

    GetBlobForPost(path: string, obj: any): Observable<any> {
        return this.http.post(`${path}`, obj, {
            responseType: 'blob' as 'json'
        });
    }

    Put(path: string, obj: any): Observable<any> {
        return this.http.put(`${path}`, obj);
    }

    Delete(path: string, obj: any = ''): Observable<any> {
        return this.http.delete(`${path}`, {
            params: obj
        });
    }
}
