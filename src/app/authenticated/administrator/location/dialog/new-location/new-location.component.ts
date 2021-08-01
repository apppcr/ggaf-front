import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-location',
  templateUrl: './new-location.component.html',
  styleUrls: ['./new-location.component.scss']
})
export class NewLocationComponent implements OnInit {

  formNewLocation: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.formNewLocation = this.formBuilder.group({
      cadum: ['', Validators.required],     
      local: ['', Validators.required],
      address: ['', Validators.required],
      number: ['', Validators.required],     
      city: ['', Validators.required],
      state: ['', Validators.required],     
      zip_code: ['', Validators.required],     
      district: ['', Validators.required],
      complement: ['', Validators.required],        
  });

  }

}
