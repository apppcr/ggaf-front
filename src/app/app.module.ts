import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { DialogTypeUserComponent } from './authenticated/my-requests/dialog/dialog-type-user/dialog-type-user.component';
import { DialogNewRequestComponent } from './authenticated/my-requests/dialog/dialog-new-request/dialog-new-request.component';

import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AnalystModule } from './authenticated/analyst/analyst.module';
import { OperatorModule } from './authenticated/operator/operator.module';
import { RequestModule } from './authenticated/my-requests/request.module';
import { NotAuthenticatedModule } from './not-authenticated/not-authenticated.module';
import { AdministratorModule } from './authenticated/administrator/administrator.module';


@NgModule({
    declarations: [
        AppComponent,
        DialogTypeUserComponent,
        DialogNewRequestComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        SharedModule,
        AdministratorModule,
        NotAuthenticatedModule,
        AnalystModule,
        OperatorModule,
        RequestModule,

        HttpClientModule,
        RouterModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
