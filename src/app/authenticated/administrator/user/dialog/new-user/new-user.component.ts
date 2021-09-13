import { AlertService } from './../../../../../shared/alert.service';
import { UserFirebase } from './../../../../../core/models/user-firebase.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Profile } from '../../../../../core/models/profile.model';
import { Secretary } from '../../../../../core/models/secretary.model';
import { User } from '../../../../../core/models/user.model';

import { UserService } from '../../../../../shared/services/user.service';

@Component({
    selector: 'app-new-user',
    templateUrl: './new-user.component.html',
    styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

    formNewUser: FormGroup;
    hide: any;

    allUsers: User[];
    currentUser: User;
    allProfiles: Profile[] = [];
    allLocations: Location[] = [];
    allSecretarys: Secretary[] = [];

    isShowPassword = true;

    constructor(
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA)
        private data: any,
        private userService: UserService,
        public dialogRef: MatDialogRef<NewUserComponent>,
        private alert: AlertService
    ) { }

    ngOnInit(): void {

        this.formNewUser = this.formBuilder.group({
            registration: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            name: ['', Validators.required],
            phone: ['', Validators.required],
            cpf: ['', Validators.required],
            location: ['', Validators.required],
            secretary: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            profile: ['', Validators.required],
        });

        if (!!this.data) {
            this.allSecretarys = this.data.allSecretarys;
            this.allLocations = this.data.allLocations;
            this.allProfiles = this.data.allProfiles;
            this.allUsers = this.data.allUsers;

            if (!!this.data.currentUser) {
                this.currentUser = this.data.currentUser;
                this.setUserEdit(this.currentUser);
                this.isShowPassword = false;
                this.formNewUser.get('password').setValidators([]);
                this.formNewUser.get('email').disable();
            }
        }

    }

    setUserEdit(currentUser: User): void {
        this.formNewUser.get('cpf').setValue(currentUser.cpf);
        this.formNewUser.get('name').setValue(currentUser.name);
        this.formNewUser.get('email').setValue(currentUser.email);
        this.formNewUser.get('phone').setValue(currentUser.phone);
        this.formNewUser.get('profile').setValue(currentUser.id_profile);
        this.formNewUser.get('location').setValue(currentUser.id_location);
        this.formNewUser.get('secretary').setValue(currentUser.id_secretary);
        this.formNewUser.get('registration').setValue(currentUser.registration);
    }

    validateIfUserExists(): boolean {
        const currentEmail = this.formNewUser.get('email').value;
        return !!this.allUsers.find(x => x.email.toLowerCase() === currentEmail.toLowerCase() && x.id !== this.currentUser?.id);
    }

    saveOrUpdate(): void {

        if (this.validateIfUserExists()) {
            this.alert.warning(`Email informado, já encontra-se cadastrado.`);
        } else if (this.formNewUser.valid) {
            const user: User = {
                name: this.formNewUser.get('name').value,
                email: this.formNewUser.get('email').value,
                phone: this.formNewUser.get('phone').value,
                registration: this.formNewUser.get('registration').value,
                cpf: this.formNewUser.get('cpf').value,
                id_secretary: parseInt(this.formNewUser.get('secretary').value, 10),
                id_profile: parseInt(this.formNewUser.get('profile').value, 10),
                id_location: parseInt(this.formNewUser.get('location').value, 10),
                operator: JSON.parse(localStorage.getItem('currentUser')).email
            };

            if (!!this.currentUser) {
                this.userService.updateUser(user, this.currentUser.id)
                    .subscribe(result => {
                        this.alert.sucess('Usuário editado com sucesso!');
                        this.dialogRef.close(true);
                    });
            } else {
                this.userService.createUser(user)
                    .subscribe(result => {

                        const userFirebase: UserFirebase = {
                            email: user.email,
                            emailVerified: false,
                            phoneNumber: user.phone,
                            password: this.formNewUser.get('name').value,
                            displayName: user.name,
                            disabled: false
                        };

                        this.userService.createUserFirebase(userFirebase)
                            .subscribe(result => {
                                this.alert.sucess('Usuário salvo com sucesso!');
                                this.dialogRef.close(true);
                            });
                    });
            }

        }

    }

    getLabelProfile(id: number): string {
        return this.allProfiles.find(x => x.id === id).name;
    }

    close(): void {
        this.dialogRef.close(false);
    }

}
