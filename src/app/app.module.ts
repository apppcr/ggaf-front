import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AnalystModule } from './authenticated/analyst/analyst.module';
import { OperatorModule } from './authenticated/operator/operator.module';
import { NotAuthenticatedModule } from './not-authenticated/not-authenticated.module';
import { AdministratorModule } from './authenticated/administrator/administrator.module';
import { MyRequestsComponent } from './authenticated/my-requests/view-requests/my-requests.component';
import { DialogTypeUserComponent } from './authenticated/my-requests/dialog/dialog-type-user/dialog-type-user.component';
import { DialogNewRequestComponent } from './authenticated/my-requests/dialog/dialog-new-request/dialog-new-request.component';
import { NewRequestComponent } from './authenticated/my-requests/new-request/new-request.component';
import { RequestModule } from './authenticated/my-requests/request.module';

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

        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
