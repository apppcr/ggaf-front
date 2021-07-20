import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { ForgotThePasswordComponent } from './forgot-the-password/forgot-the-password.component';
import { NotAuthenticatedRoutingModule } from './not-authenticated-routing.module';

@NgModule({
    declarations: [
        LoginComponent,
        ForgotThePasswordComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        NotAuthenticatedRoutingModule
    ],
    exports: [
        LoginComponent,
        ForgotThePasswordComponent
    ]
})
export class NotAuthenticatedModule { }
