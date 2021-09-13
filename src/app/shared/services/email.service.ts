import { Injectable } from '@angular/core';

import { environment } from './../../../environments/environment';
import { Email } from '../../core/models/email.model';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  constructor(private requestService: RequestService) { }

  send(email: Email) {
    return this.requestService.Post(`${environment.apiEndpoint.api}/email/send`, email);
  }
}
