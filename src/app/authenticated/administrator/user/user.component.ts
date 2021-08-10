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

    displayedColumns: string[] = ['id', 'name', 'email', 'profile', 'id_secretary', 'excluir', 'editar'];
    dataSource = new MatTableDataSource<User>();
    @ViewChild(MatPaginator) paginator: MatPaginator;

    allSecretarys: Secretary[] = [];
    allUsers: User[] = [];
    allUsersFirebase: any[] = [];
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

            if (result[0].length > 0) {
                this.allUsers = result[0];
                this.dataSource.data = this.allUsers;

                this.getAllUserFirebase();
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

    getAllUserFirebase(): void {
        const emailUsers = this.allUsers.map(x => {
            return { email: x.email }
        });

        this.userService.getUserFirebase({ users: emailUsers })
            .subscribe(result => {
                this.allUsersFirebase = result.users;
                console.log(this.allUsersFirebase);
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
                allUsers: this.allUsers,
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
                    this.getAllUserFirebase();
                }
            });
    }

    editSecretary(id: number): void {
        this.openDialogNewOrEditUser(id);
    }

    deleteSecretary(id: number, email: string): void {
        const uid = this.allUsersFirebase.find(x => x.email === email).uid;

        console.log(uid)
        this.userService.deleteUser(id)
            .subscribe((result) => {
                const uid = this.allUsersFirebase.find(x => x.email === email).uid;
                this.userService.deleteUserFirebase(uid)
                    .subscribe((result) => {
                        alert('Excluido com sucesso!')
                        this.dataSource.data = [];
                        this.reloadTableUser();
                    });
            });
    }

    getLabelProfile(id: number): string {
        return this.allProfiles.find(x => x.id === id).name;
    }

}
