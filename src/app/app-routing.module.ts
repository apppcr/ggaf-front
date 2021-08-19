import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
        path: 'administrador',
        loadChildren: () => import('./authenticated/administrator/administrator.module').then(m => m.AdministratorModule)
    },
    {
        path: 'analista',
        loadChildren: () => import('./authenticated/analyst/analyst.module').then(m => m.AnalystModule)
    },
    {
        path: 'operador',
        loadChildren: () => import('./authenticated/operator/operator.module').then(m => m.OperatorModule)
    },
    {
        path: 'gestor',
        loadChildren: () => import('./authenticated/manager/manager.module').then(m => m.ManagerModule)
    }

];

@NgModule({
    imports: [
        RouterModule.forRoot(
            routes,
            {
                preloadingStrategy: PreloadAllModules,
                useHash: true
            }
        )
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
