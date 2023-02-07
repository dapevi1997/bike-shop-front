import { Component, OnInit } from '@angular/core';
import { InventaryService } from '../services/inventary.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit{

  page: number = 0;
  bikes: any[] | undefined;

  constructor(private inventary$: InventaryService) { }

  ngOnInit(): void {
      this.getBikes();
  }

  getBikes(): void {
    this.inventary$.getPage(this.page).subscribe(
      {
        next: (data) => {
          console.log(data)
          this.bikes = data;

        },
        error: (e) => {
          console.log(e)
        },
        complete: () => console.info('complete'),
      }
    );
  }
}
