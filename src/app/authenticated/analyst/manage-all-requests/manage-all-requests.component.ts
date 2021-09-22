import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { User } from './../../../core/models/user.model';
import { Product } from './../../../core/models/product.model';
import { Location } from './../../../core/models/location.model';
import { Secretary } from './../../../core/models/secretary.model';
import { Wharehouse } from './../../../core/models/wharehouse.model';
import { Solicitation } from './../../../core/models/solicitation.model';
import { FilterSolicitation } from './../../../core/models/filter/filter-solicitation.models';

import { DialogManagerRequestComponent } from './dialog/dialog-manager-request/dialog-manager-request.component';

import { ProductService } from '../../../shared/services/product.service';
import { LocationService } from './../../../shared/services/location.service';
import { SecretaryService } from '../../../shared/services/secretary.service';
import { WharehouseService } from '../../../shared/services/wharehouse.service';
import { SolicitationService } from '../../../shared/services/solicitation.service';
import {
    DialogViewSolicitationComponent
} from '../../operator/dialog-view-solicitation/dialog-view-solicitation.component';

@Component({
    selector: 'app-manage-all-requests',
    templateUrl: './manage-all-requests.component.html',
    styleUrls: ['./manage-all-requests.component.scss']
})
export class ManageAllRequestsComponent implements OnInit, AfterViewInit {

    displayedColumns: string[] = ['numeroSolicitacao', 'solicitante', 'secretaria', 'almoxarifado', 'dataSolicitacao', 'status', 'pedidoPor', 'verPedido', 'gerenciarPedido'];
    dataSource = new MatTableDataSource<Solicitation>();
    @ViewChild(MatPaginator) paginator: MatPaginator;

    formFilterSolitation: FormGroup;

    allLocation: Location[];
    allSecretary: Secretary[];
    allWharehouse: Wharehouse[];
    allproducts: Product[] = [];
    allSocitation: Solicitation[];

    currentUser: User;
    listRequester: string[];

    todosStatus = [
        { value: 'Aberto', viewValue: 'Aberto' },
        { value: 'Em Atendimento', viewValue: 'Em Atendimento' },
        { value: 'Aguardando Aprovaçã', viewValue: 'Aguardando Aprovação' },
        { value: 'Aprovado', viewValue: 'Aprovado' },
        { value: 'Reprovado', viewValue: 'Reprovado' }
    ];

    constructor(
        private dialog: MatDialog,
        private formBuilder: FormBuilder,

        private productService: ProductService,
        private locationService: LocationService,
        private secretaryService: SecretaryService,
        private wharehouseService: WharehouseService,
        private solicitationService: SolicitationService,
    ) { }

    ngOnInit(): void {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

        this.formFilterSolitation = this.formBuilder.group({
            secretary: [],
            location: [],
            requester: [],
            status: [],
            data: [],
        });

        this.loadView();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    loadView() {
        Observable.forkJoin([
            this.solicitationService.findAllSolicitation(),
            this.secretaryService.findAllSecretary(),
            this.wharehouseService.findAllWharehouse(),
            this.locationService.getAllLocation(),
            this.productService.getAllProduct(),
        ]).subscribe((result) => {

            if (result[0].length > 0) {
                this.allSocitation = result[0];
                this.dataSource.data = [];
                this.dataSource.data = this.allSocitation;
                this.dataSource.paginator = this.paginator;

                this.getRequesterByRequest();
            }

            if (result[1].length > 0) {
                this.allSecretary = result[1];
            }

            if (result[2].length > 0) {
                this.allWharehouse = result[2];
            }

            if (result[3].length > 0) {
                this.allLocation = result[3];
            }

            if (result[4].length > 0) {
                this.allproducts = result[4];
            }

        });
    }

    getNameSecretaryById(id: number): string {
        return this.allSecretary.find(scretary => scretary.id === id).name;
    }

    getNameWharehouseById(id: number): string {
        if (!!id && id !== 0) {
            return this.allWharehouse.find(wharehouse => wharehouse.id === id).name;
        } else {
            return 'N/A';
        }
    }

    openDialogView(id: number) {
        const dialogRef = this.dialog.open(DialogViewSolicitationComponent, {
            width: '800px',
            data: {
                idSolicitation: id,
                allproducts: this.allproducts
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

    openDialogManageRequest(id: number) {
        const dialogRef = this.dialog.open(DialogManagerRequestComponent, {
            width: '800px',
            data: {
                idSolicitation: id,
                allWharehouse: this.allWharehouse
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            this.loadView();
            console.log(`Dialog result: ${result}`);
        });
    }

    filterRequests(): void {
        const secretary = this.formFilterSolitation.get('secretary').value;
        const requester = this.formFilterSolitation.get('requester').value;
        const status = this.formFilterSolitation.get('status').value;
        const data = this.formFilterSolitation.get('data').value;

        const filter: FilterSolicitation = {
            secretary,
            requester,
            status,
            data,
        }

        this.solicitationService.filterSolicitation(filter)
            .subscribe(result => {
                this.realoadTable(result);
            });
    }

    clear(): void {
        this.formFilterSolitation.reset();
        this.realoadTable(this.allSocitation);
    }

    realoadTable(dataFilter: Solicitation[]): void {
        this.dataSource.data = [];
        this.dataSource.data = dataFilter;
        this.dataSource.paginator = this.paginator;
    }

    getRequesterByRequest(): void {
        this.listRequester = this.allSocitation.map(item => item.requester)
            .filter((v, i, a) => a.indexOf(v) === i);
    }

}
