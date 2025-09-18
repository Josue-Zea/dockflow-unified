import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-advanced-filter',
  templateUrl: './advanced-filter.component.html',
  styleUrls: ['./advanced-filter.component.css']
})
export class AdvancedFilterComponent {
  // AÑO
  year: boolean = false;
  specificYear: Date[] | undefined;

  // NÚMERO DE EXPEDIENTE
  number: boolean = false;
  filterSelectedNumber: string = "numero";
  specificNumber: string = "";
  minimumNumber: string = "";
  maximumNumber: string = "";

  // NÚMERO DE TRÁMITE
  process: boolean = false;
  filterSelectedProcess: string = "numeroProceso";
  specificProcess: string = "";
  minimumProcess: string = "";
  maximumProcess: string = "";

  // FECHA DE REGISTRO DEL EXPEDIENTE
  dateRegister: boolean = false;
  filterSelectedDateRegister: string = "especificaRegistro";
  specificDateRegister: string = "";
  rangeDatesRegister: string = "";
  monthDateRegister: string = "";

  // USUARIO QUE REGISTRO EL EXPEDIENTE
  userSelect: boolean = false;
  userSelectOptions: string[] = ["Operador 1", "Operador 2", "Operador 3", "Operador 4"];
  userSelectSelected: string = "Operador 1";

  // TIPO
  kind: boolean = false;
  kindsOptions: string[] = ["Auxiliar", "Mandatos", "Sociedad"];
  kindSelected: string = "Auxiliar";

  // SUBTIPO
  subKind: boolean = false;
  subKindOptions: string[] = ["Modificaciones", "Inscripciones"];
  subKindSelected: string = "Modificaciones";

  // ESTADO DEL EXPEDIENTE
  statusSelect: boolean = false;
  statusSelectOptions: string[] = ["En proceso", "Finalizado"];
  statusSelectSelected: string = "En proceso";

  limitOptions: string[] = ["Todos", "1", "10", "100", "Específico"];
  limitSelected: string = "Todos";
  specificLimit: number = 0;
  constructor(private router: Router) { }

  filtrar() {
    this.router.navigate(["/logged/expedientes/resultados"]);
  }
}
