import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BikeDTO } from '../../models/bike.interface';
import { InventaryService } from '../../services/inventary.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.sass']
})
export class CreateComponent implements OnInit{
  form: FormGroup;
  constructor(private invetary$: InventaryService, private toast$: ToastrService){
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
      this.fillForm();
  }

  fillForm() {

    this.form.get('enabled')?.setValue(true);

  }


  createBike(){

   

    let bikeDTO: BikeDTO = {
      name: this.form.value.name,
      inInventory: this.form.value.inInventory,
      enabled: this.form.value.enabled,
      min: this.form.value.min,
      max: this.form.value.max,
      urlImage: this.form.value.urlImage,
      precio: this.form.value.precio
    }

    this.invetary$.createBike(bikeDTO)
    .subscribe(
      {

        next: (data) => {
          console.log(data)

        },
        error: (e) => {
          console.log(e)
         
        },
        complete: () => { 
          this.toast$.success("Biscleta creada");
          window.location.href = "http://localhost:4200/admin" },
      }
    );
    
  
  }
  


}

