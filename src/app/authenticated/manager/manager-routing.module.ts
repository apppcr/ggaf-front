import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccessPermissionGuard } from '../../core/guards/acess-permission.guard';
import { AuthGuard } from '../../core/guards/auth.guard';
import { ManagerRequestsComponent } from './manager-requests/manager-requests.component';

const routes: Routes = [
    {
        path: '',
        component: ManagerRequestsComponent,
        canActivate: [AccessPermissionGuard, AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagerRoutingModule { }
