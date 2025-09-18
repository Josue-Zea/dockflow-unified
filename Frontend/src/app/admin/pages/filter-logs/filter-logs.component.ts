import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import {  SmallIconAllert, YesNoAlert } from 'src/app/alerts/alerts.functions';
import { Employee } from 'src/app/interfaces/employee';

@Component({
  selector: 'app-filter-logs',
  templateUrl: './filter-logs.component.html',
  styleUrls: ['./filter-logs.component.css']
})
export class FilterLogsComponent implements OnInit {
  // FECHA DE REGISTRO DEL EXPEDIENTE
  dateRegister: boolean = false;
  filterSelectedDateRegister: string = "especificaRegistro";
  specificDateRegister: Date | string = "";
  rangeDatesRegister: Date[] | string[] = [];
  monthDateRegister: Date | string = "";

  // USUARIO QUE REGISTRO EL EXPEDIENTE
  userSelect: boolean = false;
  userSelectOptions: Employee[] = [];
  userSelectSelected: Employee = {
    id: "",
    nombre: ""
  };

  limitOptions: string[] = ["Todos", "1", "10", "100", "Específico"];
  limitSelected: string = "Todos";
  specificLimit: number = 0;
  constructor(private router: Router,
    private dataService: DataService) { }

  isLoading: boolean = false;
  async filtrar() {
    this.isLoading = true;
    if(this.dateRegister &&
      ( this.specificDateRegister === "" &&
        this.monthDateRegister === "" &&
        this.rangeDatesRegister.length === 0 )
      ){
        SmallIconAllert('warning', 'Debe llenar una fecha');
        return;
    }
    if(this.userSelect && this.userSelectSelected.id === ""){
        SmallIconAllert('warning', 'Debe seleccionar un usuario');
        return;
    }

    let begin: Date | undefined;
    let end: Date | undefined = new Date();

    if (this.dateRegister && this.filterSelectedDateRegister === "especificaRegistro") {
      begin = this.specificDateRegister as Date;
      end = new Date(begin);
      end.setDate(begin.getDate() + 1);
    }
    if (this.dateRegister && this.filterSelectedDateRegister === "rangoRegistro") {
      begin = this.rangeDatesRegister[0] as Date;
      end = new Date(this.rangeDatesRegister[1]);
      end.setDate(end.getDate() + 1);
    }
    if (this.dateRegister && this.filterSelectedDateRegister === "mesRegistro") {
      begin = this.monthDateRegister as Date;
      end = this.getNextMonth(this.monthDateRegister as Date);
    }

    const user: string | undefined = this.userSelectSelected.id !== "" ?
      this.userSelectSelected.id : undefined;

    let limit: string | undefined = "0";
    if (this.limitSelected === "Todos") limit = undefined;
    if (this.limitSelected !== "Todos" && this.limitSelected !== "Específico") limit = this.limitSelected;
    if (this.limitSelected === "Específico") limit = `${this.specificLimit}`;

    if(this.limitSelected === "Todos" && !this.dateRegister && !this.userSelect){
      const result = await YesNoAlert('warning',
        '¿Está seguro?',
        'No ha seleccionado ningun filtro ni un límite, el resultado de la misma puede ser muy grande y causar problemas en el sistema')
      if(!result) return;
    }
    const result = await this.dataService.filterLogs(begin, end, user, limit);
    this.isLoading = false;
    if(!result){
      SmallIconAllert('error', "No se encontraron registros");
    }else{
      this.router.navigate(["/admin/resultados"]);
    }
  }

  getNextMonth(date: Date): Date {
    // Crea una copia de la fecha de inicio para evitar modificar la original
    let nextDate: Date = new Date(date);

    // Suma un mes a la fecha siguiente
    nextDate.setMonth(nextDate.getMonth() + 1);

    // Ajusta la fecha si hay cambio de año
    if (nextDate.getMonth() !== (date.getMonth() + 1) % 12) {
      nextDate.setMonth(0);  // Establece el mes a enero del próximo año
      nextDate.setFullYear(nextDate.getFullYear() + 1);  // Aumenta el año
    }
    return nextDate;
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  async loadUsers(){
    const result = await this.dataService.loadUsersDB();
    this.isLoading = false;
    if(!result){
      SmallIconAllert('error', "Error al cargar usuarios");
    }else{
      this.userSelectOptions = this.dataService.empleados;
    }
  }
}
