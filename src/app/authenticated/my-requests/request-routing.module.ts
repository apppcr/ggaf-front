import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewRequestComponent } from './new-request/new-request.component';
import { MyRequestsComponent } from './view-requests/my-requests.component';

const routes: Routes = [
    {
        path: 'view',
        component: MyRequestsComponent
    },
    {
        path: 'new',
        component: NewRequestComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RequestRoutingModule { }
