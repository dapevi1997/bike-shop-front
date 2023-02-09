import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Purchase } from '../models/car.interface';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http$: HttpClient) { }

  addPurchase(purchase: Purchase){
    let direction = environment.urlInventaryService + 'addPurchase';
    return this.http$.post(direction,purchase);
  }
}
