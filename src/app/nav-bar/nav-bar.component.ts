import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.sass']
})
export class NavBarComponent implements OnInit{

  @Input() numberOfProducts!: Observable<number>;
  numberOfProductAux: number;
  
  constructor(private cookie$: CookieService){
    this.numberOfProductAux = parseInt (this.cookie$.get("index"))
  }

  ngOnInit(): void {
    this.numberOfProducts.subscribe(data => {
      this.numberOfProductAux = data;
      this.ngOnInit();
    });

    
  }



  

}
