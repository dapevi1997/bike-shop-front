import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Bike, BikeDTO } from '../models/bike.interface';

@Injectable({
  providedIn: 'root'
})
export class InventaryService {

  constructor(private http$: HttpClient) { }

  getPage(page: number): Observable<Bike[]> {
    let direction = environment.urlInventaryService + 'pagination/' + page;
    return this.http$.get<Bike[]>(direction);
  }

  getTotalPages(): Observable<number> {
    let direction = environment.urlInventaryService + 'totalPages';
    return this.http$.get<number>(direction);
  }

  getTotalBikes(): Observable<number> {
    let direction = environment.urlInventaryService + 'countBikes';
    return this.http$.get<number>(direction);
  }

  getById(id:string): Observable<Bike>{
    let direction = environment.urlInventaryService + 'getBike/' + id;
    return this.http$.get<Bike>(direction);
    
  }

  getAllBikes(): Observable<Bike[]>{
    let direction = environment.urlInventaryService + 'getAllBikes';
    return this.http$.get<Bike[]>(direction);
  }

  deleteBike(id: string){
    let direction = environment.urlInventaryService + 'deleteBike/' + id;
    return this.http$.delete(direction);

  }

  updateBike(bike:Bike):Observable<Bike>{
    let direction = environment.urlInventaryService + 'updateBike';
    return this.http$.put<Bike>(direction,bike);
  }

  createBike(bikeDTO: BikeDTO): Observable<BikeDTO>{
    let direction = environment.urlInventaryService + 'createBike'

    return this.http$.post<BikeDTO>(direction, bikeDTO);

  }

}
