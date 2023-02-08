import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Products } from '../models/products.interface';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.sass']
})
export class CarComponent implements OnInit {
  products: Array<Products>;

  constructor(private cookie$: CookieService) {
    this.products = new Array();
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

}
