import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Purchase } from '../models/car.interface';
import { Bike } from '../models/bike.interface';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http$: HttpClient) { }

  addPurchase(purchase: Purchase){
    let direction = environment.urlCarService + 'addPurchase';
    return this.http$.post(direction,purchase);
  }

  updateBikeInventary(bike:Bike){
    let direction = environment.urlCarService + 'updateBikeInventary'
    return this.http$.put<Bike>(direction,bike);

  }
}
