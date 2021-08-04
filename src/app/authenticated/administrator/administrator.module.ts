import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMaskModule, IConfig } from 'ngx-mask'

import { WarehousesComponent } from './warehouses/warehouses.component';
import { UserComponent } from './user/user.component';
import { SecretaryComponent } from './secretary/secretary.component';
import { ProductComponent } from './product/product.component';
import { LocationComponent } from './location/location.component';
import { CostCenterComponent } from './cost-center/cost-center.component';
import { AdministradorRoutingModule } from './administrador-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { NewCostCenterComponent } from './cost-center/dialog/new-cost-center/new-cost-center.component';
import { NewProductComponent } from './product/dialog/new-product/new-product.component';
import { NewSecretaryComponent } from './secretary/dialog/new-secretary/new-secretary.component';
import { NewUserComponent } from './user/dialog/new-user/new-user.component';
import { NewWarehouseComponent } from './warehouses/dialog/new-warehouse/new-warehouse.component';
import { NewLocationComponent } from './location/dialog/new-location/new-location.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
    declarations: [
        CostCenterComponent,
        LocationComponent,
        ProductComponent,
        SecretaryComponent,
        UserComponent,
        WarehousesComponent,
        NewCostCenterComponent,
        NewProductComponent,
        NewSecretaryComponent,
        NewUserComponent,
        NewWarehouseComponent,
        NewLocationComponent,
    ],
    exports: [
        CostCenterComponent,
        LocationComponent,
        ProductComponent,
        SecretaryComponent,
        UserComponent,
        WarehousesComponent,

    ],
    imports: [
        CommonModule,
        AdministradorRoutingModule,
        SharedModule,
        NgxMaskModule.forRoot(),
    ]
})
export class AdministratorModule { }
