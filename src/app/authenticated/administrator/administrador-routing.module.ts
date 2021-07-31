import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CostCenterComponent } from './cost-center/cost-center.component';
import { WarehousesComponent } from './warehouses/warehouses.component';
import { LocationComponent } from './location/location.component';
import { ProductComponent } from './product/product.component';
import { UserComponent } from './user/user.component';

import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { AccessPermissionGuard } from 'src/app/core/guards/acess-permission.guard';

const routes: Routes = [
    {
        path: 'cost-center',
        component: CostCenterComponent,
        canActivate: [AccessPermissionGuard, AuthGuard]
    },
    {
        path: 'location',
        component: LocationComponent,
        canActivate: [AccessPermissionGuard, AuthGuard]
    },
    {
        path: 'product',
        component: ProductComponent,
        canActivate: [AccessPermissionGuard, AuthGuard]
    },
    {
        path: 'user',
        component: UserComponent,
        canActivate: [AccessPermissionGuard, AuthGuard]
    },
    {
        path: 'warehouses',
        component: WarehousesComponent,
        canActivate: [AccessPermissionGuard, AuthGuard]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdministradorRoutingModule { }
