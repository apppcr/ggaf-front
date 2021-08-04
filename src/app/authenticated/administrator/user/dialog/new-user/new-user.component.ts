import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Profile } from 'src/app/core/models/profile.model';
import { Secretary } from 'src/app/core/models/secretary.model';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
    selector: 'app-new-user',
    templateUrl: './new-user.component.html',
    styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

    formNewUser: FormGroup;
    hide: any;

    allSecretarys: Secretary[] = [];
    currentUser: User;
    allLocations: Location[] = [];
    allProfiles: Profile[] = [];

    isShowPassword = true;

    constructor(
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA)
        private data: any,
        private userService: UserService,
        public dialogRef: MatDialogRef<NewUserComponent>
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

            if (!!this.data.currentUser) {
                this.currentUser = this.data.currentUser;
                this.setUserEdit(this.currentUser);
                this.isShowPassword = false;
                this.formNewUser.get('password').setValidators([]);
            }
        }

    }

    setUserEdit(currentUser: User): void {
        this.formNewUser.get('name').setValue(currentUser.name);
        this.formNewUser.get('email').setValue(currentUser.email);
        this.formNewUser.get('phone').setValue(currentUser.phone);
        this.formNewUser.get('registration').setValue(currentUser.registration);
        this.formNewUser.get('cpf').setValue(currentUser.cpf);
        this.formNewUser.get('secretary').setValue(currentUser.id_secretary);
        this.formNewUser.get('profile').setValue(currentUser.id_profile);
        this.formNewUser.get('location').setValue(currentUser.id_location);
    }

    saveOrUpdate(): void {

        if (this.formNewUser.valid) {
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
                        alert('Usuário editado com sucesso!');
                        this.dialogRef.close(true);
                    });
            } else {
                this.userService.createUser(user)
                    .subscribe(result => {
                        alert('Usuário salvo com sucesso!');
                        this.dialogRef.close(true);
                    });
            }



        }

    }

    close(): void {
        this.dialogRef.close(false);
    }

}
