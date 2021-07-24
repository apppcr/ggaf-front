import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../../environments/environment';
import { Email } from '../../core/models/email.model';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

    private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    constructor(private requestService: RequestService) { }

    send(wharehouse: Email) {
        return this.requestService.Post(`${environment.apiEndpoint.api}/email/send`, wharehouse);
    }
}
