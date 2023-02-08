import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { InventaryService } from '../services/inventary.service';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  page: number = 0;
  bikes: any[] | undefined;
  pages: Array<number> | undefined;
  products!: Object[];
  numberOfProducts: Subject<number>;
 

  constructor(private inventary$: InventaryService, private cookie$: CookieService) {
    this.numberOfProducts = new Subject();
   }

  ngOnInit(): void {
    this.getBikes();
    
  }

  getBikes(): void {
    this.inventary$.getPage(this.page)
      .subscribe(
        {
          next: (data) => {
            //console.log(data)
            this.bikes = data;

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

  addToCar(id: string, amount: any) {
    
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
    
     this.cookie$.set(`productsId[${index}]`, id);
     this.cookie$.set(`productsAmount[${index}]`, amount.toString());

    
  }

  // getNumberOfProducts(){
  //   this.cookie$.get("index") === "" ? this.numberOfProducts = -1 : this.numberOfProducts = this.numberOfProducts = parseInt(this.cookie$.get("index"));
    
  // }




}
