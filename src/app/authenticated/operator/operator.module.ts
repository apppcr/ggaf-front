import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperatorRoutingModule } from './operator-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { MyRequestsComponent } from './view-requests/my-requests.component';
import { NewRequestComponent } from './new-request/new-request.component';

@NgModule({
    declarations: [
        MyRequestsComponent,
        NewRequestComponent
    ],
    imports: [
        CommonModule,
        OperatorRoutingModule,

        SharedModule
    ]
})
export class OperatorModule { }
