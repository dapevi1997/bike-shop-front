import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Products } from '../models/products.interface';
import { Purchase, ProductsPost } from '../models/car.interface';
import { CarService } from '../services/car.service';
import { Bike, BikeInCar } from '../models/bike.interface';
import { InventaryService } from '../services/inventary.service';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment.prod';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.sass']
})
export class CarComponent implements OnInit {
  products: Array<Products>;
  productToBuy: Array<ProductsPost>;
  bikesInCar: Array<BikeInCar>;
  formulario: FormGroup;
  totalPrice: number;
  numberOfProducts: Subject<number>;
  eliminateProduct: Subject<number>;


  constructor(private cookie$: CookieService, private car$: CarService, private inventary$: InventaryService, private toast$: ToastrService) {
    this.products = new Array();
    this.bikesInCar = new Array();
    this.productToBuy = new Array();
    this.numberOfProducts = new Subject();
    this.eliminateProduct = new Subject();
    
    this.totalPrice = 0;


    this.formulario = new FormGroup({
      idType: new FormControl(null, [Validators.required]),
      idClient: new FormControl(null, [Validators.required]),
      nameClient: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.getProducts();

  }



  getProducts() {
    let lenght = parseInt(this.cookie$.get("index")) + 1;

    for (let i = 0; i < lenght; i++) {
      let product: Products = {
        id: this.cookie$.get(`productsId[${i}]`),
        amount: this.cookie$.get(`productsAmount[${i}]`)
      }


      this.inventary$.getById(product.id)
        .subscribe(
          {
            next: (data) => {

              let dataForCar: BikeInCar = {
                id: data.id,
                name: data.name,
                precio: data.precio,
                amount: Number.parseInt(product.amount)
              }
              this.bikesInCar.push(dataForCar);

              this.totalPrice += dataForCar.precio;

            },
            error: (e) => {
              console.log(e)
            },
            complete: () => { },
          }
        );


      this.products.push(product)

    }



  }

  getTotalPrice() {
    for (let i = 0; i < this.bikesInCar.length; i++)
      this.totalPrice += this.bikesInCar[i].precio
  }


  deleteProductOfCarTable(bike: BikeInCar, index: number) {




    this.bikesInCar.splice(index, 1)

    this.cookie$.deleteAll()

    for (let i = 0; i < this.bikesInCar.length; i++) {
      let aux = this.bikesInCar.length - 1
      this.cookie$.set("index", aux.toString())
      this.cookie$.set(`productsId[${i}]`, this.bikesInCar[i].id);
      this.cookie$.set(`productsAmount[${i}]`, this.bikesInCar[i].amount.toString());

    }

    this.totalPrice = 0;

    this.getTotalPrice()

    this.numberOfProducts.next(-1);
    this.numberOfProducts.asObservable();
    window.location.href = "http://localhost:4200/car"



  }




  createPurchase() {

    for (let i = 0; i < this.bikesInCar.length; i++) {
      let product: ProductsPost = {
        id: this.bikesInCar[i].id,
        amount: this.bikesInCar[i].amount
      }
      this.productToBuy.push(product)
    }



    let body: Purchase = {
      idType: this.formulario.value.idType,
      idClient: this.formulario.value.idClient,
      nameClient: this.formulario.value.nameClient,
      products: this.productToBuy

    }



    this.car$.addPurchase(body).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (e) => console.log(e)
      ,
      complete: () => {
        this.cookie$.deleteAll();
        this.toast$.success("Compra realizada con éxito");
        this.numberOfProducts.next(-1);
        this.numberOfProducts.asObservable();
        window.location.href = "http://localhost:4200/"
      }
    });



  }

}
