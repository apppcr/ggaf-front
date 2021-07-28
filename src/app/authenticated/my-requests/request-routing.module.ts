import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewRequestComponent } from './new-request/new-request.component';
import { MyRequestsComponent } from './view-requests/my-requests.component';

import { AccessPermissionGuard } from '../../core/guards/acess-permission.guard';
import { AuthGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
    {
        path: 'view',
        component: MyRequestsComponent,
        canActivate: [AccessPermissionGuard, AuthGuard]
    },
    {
        path: 'new',
        component: NewRequestComponent,
        canActivate: [AccessPermissionGuard, AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RequestRoutingModule { }
