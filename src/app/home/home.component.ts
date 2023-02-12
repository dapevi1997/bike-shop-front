import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { InventaryService } from '../services/inventary.service';
import { Observable, Subject } from 'rxjs';
import { Bike } from '../models/bike.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  page: number = 0;
  bikes: Bike[] | undefined;
  pages: Array<number> | undefined;
  products!: Object[];
  numberOfProducts: Subject<number>;
  totalBikes: number;



  constructor(private inventary$: InventaryService, private cookie$: CookieService, private toast$: ToastrService) {
    this.numberOfProducts = new Subject();
    this.totalBikes = 0;

  }

  ngOnInit(): void {
    this.getBikes();

  }

  getBikes(): void {
    this.inventary$.getPage(this.page)
      .subscribe(
        {
          next: (data) => {
            const auxData = data.filter(bike => bike.enabled == true)
            this.bikes = auxData;


          },
          error: (e) => {
            console.log(e)
          },
          complete: () => { },
        }
      );

    this.inventary$.getTotalPages()
      .subscribe(
        {
          next: (data) => {

            this.pages = new Array(data);
          },
          error: (e) => {
            console.log(e)
          },
          complete: () => { },
        }
      );

      this.inventary$.getTotalBikes()
      .subscribe(
        {
          next: (data) => {

            this.totalBikes = data;
          },
          error: (e) => {
            console.log(e)
          },
          complete: () => { },
        }
      );


  }

  isFirst(): boolean {
    return this.page == 0;
  }

  isLast(): boolean {
    let totalPages: any = this.pages?.length;
    return this.page == totalPages - 1;
  }

  previousPage(): void {
    !this.isFirst() ? (this.page--, this.getBikes()) : false;
  }

  nextPage(): void {
    !this.isLast() ? (this.page++, this.getBikes()) : false;
  }

  getPage(page: number): void {
    this.page = page;
    this.getBikes();
  }

  addToCar(bike: Bike, amount: any) {
    let amountAvailable = bike.max <= (bike.inInventory - bike.min) ? bike.max : bike.inInventory - bike.min

    if (amount > amountAvailable) {
      this.toast$.warning("La cantidad excede las unidades disponibles")
    }else{
    //this.cookie$.deleteAll();

    let index = "0";
    if (!this.cookie$.check("index")) {
      this.cookie$.set("index", index)
    }
    else {
      index = this.cookie$.get("index")
      let indexAux = parseInt(index) + 1
      index = indexAux.toString()
      this.cookie$.set("index", index)

    }

    this.numberOfProducts.next(parseInt(index));
    this.numberOfProducts.asObservable();

    this.cookie$.set(`productsId[${index}]`, bike.id);
    this.cookie$.set(`productsAmount[${index}]`, amount.toString());

    this.toast$.success("Bicicleta agregada al carrito");
    }




  }

  // getNumberOfProducts(){
  //   this.cookie$.get("index") === "" ? this.numberOfProducts = -1 : this.numberOfProducts = this.numberOfProducts = parseInt(this.cookie$.get("index"));

  // }




}
