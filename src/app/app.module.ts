import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AnalystModule } from './authenticated/analyst/analyst.module';
import { OperatorModule } from './authenticated/operator/operator.module';
import { NotAuthenticatedModule } from './not-authenticated/not-authenticated.module';
import { AdministratorModule } from './authenticated/administrator/administrator.module';
import { MyRequestsComponent } from './authenticated/my-requests/my-requests.component';
import { DialogTypeUserComponent } from './authenticated/my-requests/dialog/dialog-type-user/dialog-type-user.component';
import { DialogNewRequestComponent } from './authenticated/my-requests/dialog/dialog-new-request/dialog-new-request.component';

@NgModule({
    declarations: [
        AppComponent,
        MyRequestsComponent,
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
        OperatorModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
