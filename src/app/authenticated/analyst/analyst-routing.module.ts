import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccessPermissionGuard }  from '../../core/guards/acess-permission.guard';
import { AuthGuard } from '../../core/guards/auth.guard';

import { ManageAllRequestsComponent } from './manage-all-requests/manage-all-requests.component';

const routes: Routes = [
    {
        path: 'manage-all-requests',
        component: ManageAllRequestsComponent,
         canActivate: [AccessPermissionGuard, AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AnalystRoutingModule { }
