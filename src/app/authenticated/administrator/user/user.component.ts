import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';

import { ProfileService } from './../../../shared/services/profile.service';
import { LocationService } from './../../../shared/services/location.service';
import { SecretaryService } from './../../../shared/services/secretary.service';
import { NewUserComponent } from './dialog/new-user/new-user.component';
import { UserService } from './../../../shared/services/user.service';
import { Secretary } from '../../../core/models/secretary.model';
import { User } from '../../../core/models/user.model';
import { Profile } from '../../../core/models/profile.model';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

    displayedColumns: string[] = ['id', 'name', 'email', 'operator', 'id_secretary', 'excluir', 'editar'];
    dataSource = new MatTableDataSource<User>();
    @ViewChild(MatPaginator) paginator: MatPaginator;

    allSecretarys: Secretary[] = [];
    allUsers: User[] = [];
    allLocations: Location[] = [];
    allProfiles: Profile[] = [];

    constructor(
        public dialog: MatDialog,
        private userService: UserService,
        private secretaryService: SecretaryService,
        private locationService: LocationService,
        private profileService: ProfileService
    ) { }

    ngOnInit(): void {
        Observable.forkJoin([
            this.userService.findAllUser(),
            this.secretaryService.findAllSecretary(),
            this.locationService.getAllLocation(),
            this.profileService.findAllProfile()
        ]).subscribe((result) => {

            console.log(result);

            if (result[0].length > 0) {
                this.allUsers = result[0];
                this.dataSource.data = this.allUsers;
            }

            if (result[1].length > 0) {
                this.allSecretarys = result[1];
            }

            if (result[2].length > 0) {
                this.allLocations = result[2];
            }

            if (result[3].length > 0) {
                this.allProfiles = result[3];
            }
        });

    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
    }

    getLabelSecreatary(id: number): string {
        return this.allSecretarys.find(x => x.id === id).name;
    }

    openDialogNewOrEditUser(id?: number): void {
        let user = null;

        if (!!id) {
            user = this.allUsers.find(user => user.id === id);
        }

        const dialogRef = this.dialog.open(NewUserComponent, {
            width: '600px',
            data: {
                allSecretarys: this.allSecretarys,
                allLocations: this.allLocations,
                allProfiles: this.allProfiles,
                currentUser: user
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.dataSource.data = [];
                this.reloadTableUser();
            }
        });
    }

    reloadTableUser(): void {
        this.userService.findAllUser()
            .subscribe((result) => {
                if (result.length > 0) {
                    this.allUsers = result;
                    this.dataSource.data = [];
                    this.dataSource.data = this.allUsers;
                }
            });
    }

    editSecretary(id: number): void {
        this.openDialogNewOrEditUser(id);
    }

    deleteSecretary(id: number): void {
        this.userService.deleteUser(id)
            .subscribe((result) => {
                this.dataSource.data = [];
                alert('Excluido com sucesso!')
                this.reloadTableUser();
            });
    }

}
