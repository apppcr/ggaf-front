import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestRoutingModule } from './request-routing.module';
import { NewRequestComponent } from './new-request/new-request.component';
import { MyRequestsComponent } from './view-requests/my-requests.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxViacepModule } from '@brunoc/ngx-viacep';


@NgModule({
    declarations: [
        NewRequestComponent,
        MyRequestsComponent,
    ],
    exports: [
        NewRequestComponent,
        MyRequestsComponent,
    ],
    imports: [
        CommonModule,
        RequestRoutingModule,
        SharedModule,
        NgxViacepModule
    ]
})
export class RequestModule { }
