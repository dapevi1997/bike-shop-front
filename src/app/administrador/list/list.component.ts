import { Component, OnInit } from '@angular/core';
import { InventaryService } from '../../services/inventary.service';
import { Bike } from '../../models/bike.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {


  Bikes: Bike[];
  form: FormGroup;

  constructor(private inventary$: InventaryService) {
    this.Bikes = new Array<Bike>();
    this.form = new FormGroup(
      {
        name: new FormControl("", [Validators.required]),
        inInventory: new FormControl(null, [Validators.required]),
        enabled: new FormControl(null, [Validators.required]),
        min: new FormControl(null, [Validators.required]),
        max: new FormControl(null, [Validators.required]),
        urlImage: new FormControl(null, [Validators.required]),
        precio: new FormControl(null, [Validators.required]),

      }
    );
  }

  ngOnInit(): void {
    this.getAllBikes()
  }

  fillForm(bike: Bike) {
    this.form.get('name')?.setValue(bike.name);
    this.form.get('inInventory')?.setValue(bike.inInventory);
    this.form.get('enabled')?.setValue(bike.enabled);
    this.form.get('min')?.setValue(bike.min);
    this.form.get('max')?.setValue(bike.max);
    this.form.get('urlImage')?.setValue(bike.urlImage);
    this.form.get('precio')?.setValue(bike.precio);
  }

  updateBike(bike: Bike) {



    let bikePut: Bike = {
      id: bike.id,
      name: this.form.value.name,
      inInventory: this.form.value.inInventory,
      enabled: this.form.value.enabled,
      min: this.form.value.min,
      max: this.form.value.max,
      urlImage: this.form.value.urlImage,
      state: this.form.value.min < this.form.value.inInventory ? true : false ,  // comprobarlo
      precio: this.form.value.precio
    }

    this.inventary$.updateBike(bikePut)
    .subscribe(
      {

        next: (data) => {
          console.log(data)

        },
        error: (e) => {
          console.log(e)
          window.location.href = "http://localhost:4200/admin"
        },
        complete: () => { window.location.href = "http://localhost:4200/admin" },
      }
    );
  }

  deleteBike(id: string) {

    this.inventary$.deleteBike(id).subscribe(
      {

        next: (data) => {
          console.log(data)

        },
        error: (e) => {
          console.log(e)
          
        },
        complete: () => { window.location.href = "http://localhost:4200/admin" },
      }
    );
  }

  getAllBikes() {
    this.inventary$.getAllBikes()
      .subscribe(
        {

          next: (data) => {
          
            this.Bikes = data
          

          },
          error: (e) => {
            console.log(e)
          },
          complete: () => { },
        }
      );
  }
}
