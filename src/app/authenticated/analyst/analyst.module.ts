import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialogManagerRequestComponent } from './Manage-all-requests/dialog/dialog-manager-request/dialog-manager-request.component';
import { DialogAddProductComponent } from './manage-all-requests/dialog/dialog-add-product/dialog-add-product.component';
import { DialogNewRequestComponent } from './manage-all-requests/dialog/dialog-new-request/dialog-new-request.component';

import { AnalystRoutingModule } from './analyst-routing.module';
import { SharedModule } from './../../shared/shared.module';
import { ManageAllRequestsComponent } from './manage-all-requests/manage-all-requests.component';

@NgModule({
    declarations: [
        DialogNewRequestComponent,
        DialogManagerRequestComponent,
        DialogAddProductComponent,
        ManageAllRequestsComponent
    ],
    exports: [
        DialogNewRequestComponent,
        DialogManagerRequestComponent,
        DialogAddProductComponent,
        ManageAllRequestsComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        AnalystRoutingModule,
    ]
})
export class AnalystModule { }
