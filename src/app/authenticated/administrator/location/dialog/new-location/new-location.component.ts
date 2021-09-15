import { AlertService } from './../../../../../shared/alert.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Location } from '../../../../../core/models/location.model';
import { LocationService } from '../../../../../shared/services/location.service';

import { CEPError, Endereco, NgxViacepService } from '@brunoc/ngx-viacep';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-new-location',
  templateUrl: './new-location.component.html',
  styleUrls: ['./new-location.component.scss']
})
export class NewLocationComponent implements OnInit {

  formNewLocation: FormGroup;
  hide: any;

  allLocations: Location[] = [];
  currentLocation: Location;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    private data: any,
    private locationService: LocationService,
    public dialogRef: MatDialogRef<NewLocationComponent>,
    private alert: AlertService,
    private viacep: NgxViacepService,
  ) { }

  ngOnInit(): void {

    this.formNewLocation = this.formBuilder.group({
      local: ['', Validators.required],
      address: ['', Validators.required],
      number: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip_code: ['', Validators.required],
      district: ['', Validators.required],
      complement: [''],
    });

    if (!!this.data) {
      this.allLocations = this.data.allLocations;

      if (!!this.data.currentLocation) {
        this.currentLocation = this.data.currentLocation;
        this.setLocationEdit(this.currentLocation);
      }

    }

  }

  setLocationEdit(currentLocation: Location): void {
    this.formNewLocation.get('local').setValue(currentLocation.local);
    this.formNewLocation.get('address').setValue(currentLocation.address);
    this.formNewLocation.get('city').setValue(currentLocation.city);
    this.formNewLocation.get('state').setValue(currentLocation.state);
    this.formNewLocation.get('zip_code').setValue(currentLocation.zip_code);
    this.formNewLocation.get('district').setValue(currentLocation.district);
    this.formNewLocation.get('complement').setValue(currentLocation.complement);
    this.formNewLocation.get('number').setValue(currentLocation.number);
  }

  validateIfLocationExists(): boolean {

    const currentLocal = this.formNewLocation.get('local').value;
    return !!this.allLocations.find(x => x.local.toUpperCase() === currentLocal.toUpperCase()
      && x.id !== this.currentLocation.id);
  }

  saveOrUpdate(): void {

    if (this.validateIfLocationExists()) {
      this.alert.sucess(`Localização informada, já encontra-se cadastrado.`);
    } else if (this.formNewLocation.valid) {
      const location: Location = {
        local: this.formNewLocation.get('local').value,
        address: this.formNewLocation.get('address').value,
        city: this.formNewLocation.get('city').value,
        state: this.formNewLocation.get('state').value,
        zip_code: this.formNewLocation.get('zip_code').value,
        district: this.formNewLocation.get('district').value,
        complement: this.formNewLocation.get('complement').value,
        number: this.formNewLocation.get('number').value,
        operator: JSON.parse(localStorage.getItem('currentUser')).email
      };

      if (!!this.currentLocation) {
        this.locationService.updateLocal(location, this.currentLocation.id.toString())
          .subscribe(result => {
            this.alert.sucess('Localização editada com sucesso!');
            this.dialogRef.close(true);
          });
      } else {

        const locationCurrent: Location = {
          local: this.formNewLocation.get('local').value,
          address: this.formNewLocation.get('address').value,
          city: this.formNewLocation.get('city').value,
          state: this.formNewLocation.get('state').value,
          zip_code: this.formNewLocation.get('zip_code').value,
          district: this.formNewLocation.get('district').value,
          complement: this.formNewLocation.get('complement').value,
          number: this.formNewLocation.get('number').value,
          operator: JSON.parse(localStorage.getItem('currentUser')).email
        };

        this.locationService.createLocal(locationCurrent)
          .subscribe(result => {
            this.alert.sucess('Localização salva com sucesso!');
            this.dialogRef.close(true);
          });
      }

    }

  }

  close(): void {
    this.dialogRef.close(false);
  }

  searchCep(): void {
    const cep = this.formNewLocation.get('zip_code').value;

    this.viacep
      .buscarPorCep(cep.replace('-', ''))
      .pipe(
        catchError((error: CEPError) => {
          // Ocorreu algum erro :/
          console.log(error.message);
          return EMPTY;
        })
      )
      .subscribe((endereco: Endereco) => {
        this.formNewLocation.get('address').disable();
        this.formNewLocation.get('district').disable();
        this.formNewLocation.get('city').disable();
        this.formNewLocation.get('state').disable();

        this.formNewLocation.get('address').setValue(endereco.logradouro);
        this.formNewLocation.get('district').setValue(endereco.bairro);
        this.formNewLocation.get('city').setValue(endereco.localidade);
        this.formNewLocation.get('state').setValue(endereco.uf);
      });

  }

}
