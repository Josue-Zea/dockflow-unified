import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilterMatchMode } from 'primeng/api';
import { Log } from 'src/app/interfaces/log.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-results-logs',
  templateUrl: './results-logs.component.html',
  styleUrls: ['./results-logs.component.css']
})
export class ResultsLogsComponent implements OnInit {
  documents: Log[] = [];

  matchModeOptions = [
    {
      label: 'Empieza con',
      value: FilterMatchMode.STARTS_WITH
    },
    {
      label: 'Contiene',
      value: FilterMatchMode.CONTAINS
    },
    {
      label: 'No contiene',
      value: FilterMatchMode.NOT_CONTAINS
    },
    {
      label: 'Termina con',
      value: FilterMatchMode.ENDS_WITH
    },
    {
      label: 'Igual a',
      value: FilterMatchMode.EQUALS
    }
  ];

  dateOptions = [
    {
      label: 'Fecha exacta',
      value: FilterMatchMode.DATE_IS
    },
    {
      label: 'Fecha diferente de',
      value: FilterMatchMode.DATE_IS_NOT
    },
    {
      label: 'Antes de',
      value: FilterMatchMode.DATE_BEFORE
    },
    {
      label: 'Después de',
      value: FilterMatchMode.DATE_AFTER
    },
  ];

  constructor(private router: Router,
              private dataService: DataService) { }
  
  ngOnInit(): void {
    this.documents = this.dataService.logs
  }

  getBack(){
    this.router.navigate(["/admin/filtros"]);
  }
}
