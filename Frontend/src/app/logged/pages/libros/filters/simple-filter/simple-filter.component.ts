import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-simple-filter',
  templateUrl: './simple-filter.component.html',
  styleUrls: ['./simple-filter.component.css']
})
export class SimpleFilterComponent {
  folio: number = 0;
  libro: number = 0;

  constructor(private router: Router){}

  filtrar(){
    this.router.navigate(["/logged/libros/resultados"]);
  }
}
