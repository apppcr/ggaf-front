import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyRequestsComponent } from './authenticated/my-requests/view-requests/my-requests.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: '',
        loadChildren: () => import('./not-authenticated/not-authenticated.module').then(m => m.NotAuthenticatedModule)
    },
    {
        path: 'administrator',
        loadChildren: () => import('./authenticated/administrator/administrador-routing.module').then(m => m.AdministradorRoutingModule)
    },
    {
        path: 'analyst',
        loadChildren: () => import('./authenticated/analyst/analyst.module').then(m => m.AnalystModule)
    },
    {
        path: 'request',
        loadChildren: () => import('./authenticated/my-requests/request.module').then(m => m.RequestModule)

    }
    // {
    //     path: 'operator',
    //     loadChildren: () => import('./authenticated/operator/operator.module').then(m => m.OperatorModule)
    // }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
