import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.sass']
})
export class NavBarComponent implements OnInit{

  @Input() numberOfProducts: Observable<number>;
  @Input() numberOfProductsFromCar: Observable<number>;
  @Input() eliminateProduct: Observable<number>;
  numberOfProductAux: number;
  
  constructor(private cookie$: CookieService){
    
    this.numberOfProductsFromCar = new Observable();
    this.numberOfProducts = new Observable();
    this.eliminateProduct = new Observable();

    if(this.cookie$.get("index")!== ""){
      this.numberOfProductAux = parseInt (this.cookie$.get("index"))
    }else{
      this.numberOfProductAux = -1;
    }

    console.log("constructor called", this.numberOfProductAux)
    
  }

  ngOnInit(): void {
    
    this.numberOfProducts.subscribe(data => {
      this.numberOfProductAux = data;
      this.ngOnInit();
    });

    this.numberOfProductsFromCar.subscribe(data => {
     
      this.numberOfProductAux = data;
      this.ngOnInit();
    });

    this.eliminateProduct.subscribe(data => {
     
      this.numberOfProductAux = this.numberOfProductAux + data;
      this.ngOnInit();
    });



    
  }



  

}
