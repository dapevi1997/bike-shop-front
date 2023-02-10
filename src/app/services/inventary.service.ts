import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Bike } from '../models/bike.interface';

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

  getById(id:string): Observable<Bike>{
    let direction = environment.urlInventaryService + 'getBike/' + id;
    return this.http$.get<Bike>(direction);
    
  }

}
