import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    DialogManagerRequestComponent
} from './Manage-all-requests/dialog/dialog-manager-request/dialog-manager-request.component';


import { AnalystRoutingModule } from './analyst-routing.module';
import { SharedModule } from './../../shared/shared.module';
import { ManageAllRequestsComponent } from './manage-all-requests/manage-all-requests.component';

@NgModule({
    declarations: [
        DialogManagerRequestComponent,
        ManageAllRequestsComponent
    ],
    exports: [
        DialogManagerRequestComponent,
        ManageAllRequestsComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        AnalystRoutingModule,
    ]
})
export class AnalystModule { }
