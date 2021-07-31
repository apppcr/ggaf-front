import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { Solicitation } from '../../../core/models/solicitation.model';
import { Wharehouse } from '../../../core/models/wharehouse.model';
import { Secretary } from '../../../core/models/secretary.model';
import { User } from '../../../core/models/user.model';

import { LocationService } from '../../../shared/services/location.service';
import { SecretaryService } from '../../../shared/services/secretary.service';
import { WharehouseService } from '../../../shared/services/wharehouse.service';
import { SolicitationService } from '../../../shared/services/solicitation.service';
import { FilterSolicitation } from '../../../core/models/filter/filter-solicitation.models';

@Component({
    selector: 'app-manager-requests',
    templateUrl: './manager-requests.component.html',
    styleUrls: ['./manager-requests.component.scss']
})
export class ManagerRequestsComponent implements OnInit, AfterViewInit {

    displayedColumns: string[] = ['numeroSolicitacao', 'solicitante', 'secretaria', 'almoxarifado', 'dataSolicitacao', 'status', 'pedidoPor', 'gerenciarPedido'];
    // displayedColumns: string[] = ['numeroSolicitacao', 'solicitante', 'secretaria', 'almoxarifado', 'dataSolicitacao', 'status', 'pedidoPor', 'verPedido', 'gerenciarPedido'];
    dataSource = new MatTableDataSource<Solicitation>();
    @ViewChild(MatPaginator) paginator: MatPaginator;

    formFilterSolitation: FormGroup;

    allLocation: Location[];
    allSecretary: Secretary[];
    allWharehouseByUser: Wharehouse[];
    allSocitation: Solicitation[];
    allSocitationByUser: Solicitation[];

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
        private secretaryService: SecretaryService,
        private wharehouseService: WharehouseService,
        private solicitationService: SolicitationService,
        private locationService: LocationService,
        private formBuilder: FormBuilder
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
            this.wharehouseService.findWarehouseByEmail(this.currentUser.email),
            this.locationService.getAllLocation()
        ]).subscribe((result) => {

            if (result[0].length > 0) {
                this.allSocitation = result[0];
            }

            if (result[1].length > 0) {
                this.allSecretary = result[1];
            }

            if (result[2].length > 0) {
                this.allWharehouseByUser = result[2];

                const currentWharehouse = this.allWharehouseByUser.map(aw => aw.id);
                this.allSocitationByUser = this.allSocitation.filter(as => currentWharehouse.includes(as.id_warehouse));

                this.dataSource.data = [];
                this.dataSource.data = this.allSocitationByUser;
                this.dataSource.paginator = this.paginator;

                this.getRequesterByRequest();
            }

            if (result[3].length > 0) {
                this.allLocation = result[3];
            }

        });
    }

    getNameSecretaryById(id: number): string {
        return this.allSecretary.find(scretary => scretary.id === id).name;
    }

    getNameWharehouseById(id: number): string {
        if (!!id && id !== 0) {
            return this.allWharehouseByUser.find(wharehouse => wharehouse.id === id).name;
        } else {
            return 'N/A';
        }
    }

    filterRequests(): void {
        const secretary = this.formFilterSolitation.get('secretary').value;
        const requester = this.formFilterSolitation.get('requester').value;
        const status = this.formFilterSolitation.get('status').value;
        const data = this.formFilterSolitation.get('data').value;
        const wharehouse = this.allWharehouseByUser[0].id;

        const filter: FilterSolicitation = {
            secretary,
            requester,
            status,
            data,
            wharehouse
        }

        this.solicitationService.filterSolicitation(filter)
            .subscribe(result => {
                this.realoadTable(result);
            });
    }

    clear(): void {
        this.formFilterSolitation.reset();
        this.realoadTable(this.allSocitationByUser);
    }

    realoadTable(dataFilter: Solicitation[]): void {
        this.dataSource.data = [];
        this.dataSource.data = dataFilter;
        this.dataSource.paginator = this.paginator;
    }

    getRequesterByRequest(): void {
        this.listRequester = this.allSocitationByUser.map(item => item.requester)
            .filter((v, i, a) => a.indexOf(v) === i);
    }
}
