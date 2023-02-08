import { Component, OnInit } from '@angular/core';
import { InventaryService } from '../services/inventary.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  page: number = 0;
  bikes: any[] | undefined;
  pages: Array<number> | undefined;

  constructor(private inventary$: InventaryService) { }

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
          complete: () => {},
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
          complete: () => {},
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




}
