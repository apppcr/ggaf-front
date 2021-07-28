import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  formRequestGroup: FormGroup;


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.formRequestGroup = this.formBuilder.group({
      registration: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],     
      name: ['', Validators.required],
      phone: ['', Validators.required],
      cpf: ['', Validators.required],
      id_location: ['', Validators.required],
      id_secretary: ['', Validators.required],
      operator: ['', Validators.required],
  });

  }

  

}
