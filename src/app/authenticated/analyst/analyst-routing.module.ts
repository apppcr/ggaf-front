import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ManageAllRequestsComponent } from './manage-all-requests/manage-all-requests.component';

const routes: Routes = [
    {
        path: 'manage-all-requests',
        component: ManageAllRequestsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AnalystRoutingModule { }
