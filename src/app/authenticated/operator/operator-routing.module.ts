import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessPermissionGuard } from 'src/app/core/guards/acess-permission.guard';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

import { NewRequestComponent } from './new-request/new-request.component';
import { MyRequestsComponent } from './view-requests/my-requests.component';

const routes: Routes = [
    {
        path: 'new-request',
        component: NewRequestComponent,
        canActivate: [AccessPermissionGuard, AuthGuard]
    },
    {
        path: '',
        component: MyRequestsComponent,
        canActivate: [AccessPermissionGuard, AuthGuard]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OperatorRoutingModule { }
