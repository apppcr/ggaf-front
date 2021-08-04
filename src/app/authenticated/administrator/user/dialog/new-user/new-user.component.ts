import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Secretary {
  value: string;
  viewValue: string;
}

interface Profile {
  value: string;
  viewValue: string;
}

interface Local {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  formNewUser: FormGroup;
  selectProfile: string;
  selectSecretary: string;
  selectLocal: string;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.formNewUser = this.formBuilder.group({
      registration: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],     
      name: ['', Validators.required],
      phone: ['', Validators.required],
      cpf: ['', Validators.required],
      id_location: ['', Validators.required],
      id_secretary: ['', Validators.required],
      operator: ['', Validators.required],
      senha: ['', Validators.required],
  });

  }

  secretarys: Secretary[] = [
    {value: 'Secretaria 1', viewValue: 'Secretaria 1'},
    {value: 'Secretaria 2', viewValue: 'Secretaria 2'},
    {value: 'Secretaria 3', viewValue: 'Secretaria 3'}
  ];

  profiles: Profile[] = [
    {value: 'administrador', viewValue: 'Administrador'},
    {value: 'analista', viewValue: 'Analista'},
    {value: 'gestor', viewValue: 'Gestor'},
    {value: 'operador', viewValue: 'Operador'}
  ];  

  locals: Local[] = [
    {value: 'local1', viewValue: 'Local 1'},
    {value: 'local2', viewValue: 'Local 2'},
    {value: 'local3', viewValue: 'Local 3'}  
  ]; 

}
