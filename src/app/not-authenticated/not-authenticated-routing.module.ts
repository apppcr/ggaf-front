import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ForgotThePasswordComponent } from './forgot-the-password/forgot-the-password.component';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'forgot-password',
        component: ForgotThePasswordComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NotAuthenticatedRoutingModule { }
