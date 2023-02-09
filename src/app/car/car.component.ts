import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Products} from '../models/products.interface';
import { Purchase, ProductsPost } from '../models/car.interface';
import { CarService } from '../services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.sass']
})
export class CarComponent implements OnInit {
  products: Array<Products>;
  formulario: FormGroup;

  constructor(private cookie$: CookieService, private car$: CarService) {
    this.products = new Array();
    this.formulario = new FormGroup({
      idType: new FormControl(null, [Validators.required]),
      idClient: new FormControl(null, [Validators.required]),
      nameClient: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts() {
    let lenght = parseInt(this.cookie$.get("index")) + 1;

    for (let i = 0; i < lenght; i++) {
      let product: Products = {
        id: this.cookie$.get(`productsId[${i}]`),
        amount: this.cookie$.get(`productsAmount[${i}]`)
      }

      this.products.push(product)

    }

  }

  deleteProductOfCar(product: Products, index: number) {
    console.log(product.id)
    console.log(product.amount)
    //console.log(this.products.find(p=>p.id == product.id))
    console.log(index)

    console.log(this.cookie$.get(`productsId[${index}]`))
    this.products.splice(index, 1)
    this.cookie$.deleteAll()

    for (let i = 0; i < this.products.length; i++) {
      let aux = this.products.length - 1
      this.cookie$.set("index", aux.toString())
      this.cookie$.set(`productsId[${i}]`, this.products[i].id);
      this.cookie$.set(`productsAmount[${i}]`, this.products[i].amount);

    }

  }

  createPurchase() {
    let product: ProductsPost = {
      id: "idProduct",
      amount: 2
    }

    let body: Purchase = {
      idType: "cc",
      idClient: "1103119753",
      nameClient: "Daniel Pérez",
      products: [product]

    }

    this.car$.addPurchase(body).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (e) => console.log(e)
        ,
      complete: () => {}
    });


  }

}
