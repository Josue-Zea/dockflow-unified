import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-advanced-filter',
  templateUrl: './advanced-filter.component.html',
  styleUrls: ['./advanced-filter.component.css']
})
export class AdvancedFilterComponent {
  // LIBRO
  book: boolean = false;
  filterSelectedBook: string = "numero";
  specificBook: string = "";
  minimumBook: string = "";
  maximumBook: string = "";

  // FOLIO
  invoice: boolean = false;
  filterSelectedInvoice: string = "numero";
  specificInvoice: string = "";
  minimumInvoice: string = "";
  maximumInvoice: string = "";

  // USUARIO QUE REGISTRO EL LIBRO
  userSelect: boolean = false;
  userSelectOptions: string[] = ["Operador 1", "Operador 2", "Operador 3", "Operador 4"];
  userSelectSelected: string = "Operador 1";

  // TIPO
  kind: boolean = false;
  kindsOptions: string[] = ["Auxiliar", "Mandatos", "Sociedad"];
  kindSelected: string = "Auxiliar";

  // FECHA DE REGISTRO DEL LIBRO
  dateRegister: boolean = false;
  filterSelectedDateRegister: string = "especificaRegistro";
  specificDateRegister: string = "";
  rangeDatesRegister: string = "";
  monthDateRegister: string = "";

  // ESTADO DEL LIBRO
  statusSelect: boolean = false;
  statusSelectOptions: string[] = ["En proceso", "Finalizado"];
  statusSelectSelected: string = "En proceso";

  limitOptions: string[] = ["Todos", "1", "10", "100", "Específico"];
  limitSelected: string = "Todos";
  specificLimit: number = 0;
  constructor(private router: Router) { }

  filtrar() {
    this.router.navigate(["/logged/libros/resultados"]);
  }
}
