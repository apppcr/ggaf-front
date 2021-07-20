import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CostCenterComponent } from './cost-center/cost-center.component';
import { LocationComponent } from './location/location.component';
import { ProductComponent } from './product/product.component';
import { UserComponent } from './user/user.component';
import { WarehousesComponent } from './warehouses/warehouses.component';

const routes: Routes = [
    {
        path: 'cost-center',
        component: CostCenterComponent
    },
    {
        path: 'location',
        component: LocationComponent
    },
    {
        path: 'product',
        component: ProductComponent
    },
    {
        path: 'user',
        component: UserComponent
    },
    {
        path: 'warehouses',
        component: WarehousesComponent
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdministradorRoutingModule { }
