import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Purchase, Purchases } from '../models/car.interface';
import { Bike } from '../models/bike.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http$: HttpClient) { }

  addPurchase(purchase: Purchase){
    let direction = environment.urlCarService + 'addPurchase';
    return this.http$.post(direction,purchase);
  }

  getAllPurchases(): Observable<Purchases>{
    let direction = environment.urlCarService + "getAllPurchases";
    return this.http$.get<Purchases>(direction);
  }


}
