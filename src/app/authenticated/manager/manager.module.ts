import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    ManagerRequestsComponent
} from './manager-requests/manager-requests.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManagerRoutingModule } from './manager-routing.module';
import { DialogManagerRequestComponent } from './dialog/dialog-manager-request/dialog-manager-request.component';


@NgModule({
    declarations: [
        ManagerRequestsComponent,
        DialogManagerRequestComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        ManagerRoutingModule
    ]
})
export class ManagerModule { }
