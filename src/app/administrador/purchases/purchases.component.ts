import { Component, OnInit } from '@angular/core';
import { Purchases } from 'src/app/models/car.interface';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-purchases-admin',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.sass']
})
export class PurchasesComponentAdmin implements OnInit{
  purchases!: Purchases;

  constructor(private car$: CarService){}

  ngOnInit(): void {
      this.getAllPurchases();
  }

  getAllPurchases() {
    this.car$.getAllPurchases()
      .subscribe(
        {
          next: (data) => {
            this.purchases = data;
            

          },
          error: (e) => {
            console.log(e)
          },
          complete: () => { },
        }
      );
  }

}
