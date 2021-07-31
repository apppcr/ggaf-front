import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    ManagerRequestsComponent
} from './manager-requests/manager-requests.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManagerRoutingModule } from './manager-routing.module';


@NgModule({
    declarations: [
        ManagerRequestsComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        ManagerRoutingModule
    ]
})
export class ManagerModule { }
