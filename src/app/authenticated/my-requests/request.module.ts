import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxViacepModule } from '@brunoc/ngx-viacep';

import { RequestRoutingModule } from './request-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { NewRequestComponent } from './new-request/new-request.component';
import { MyRequestsComponent } from './view-requests/my-requests.component';
import { DialogViewSolicitationComponent } from './dialog/dialog-view-solicitation/dialog-view-solicitation.component';


@NgModule({
    declarations: [
        NewRequestComponent,
        MyRequestsComponent,
        DialogViewSolicitationComponent
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
