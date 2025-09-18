import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Expediente } from 'src/app/interfaces/expediente.interface';
import { dateOptions, matchModeOptions } from 'src/app/primeng/modeOptions/options';
import { numberOptions } from '../../../../primeng/modeOptions/options';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  documents: Expediente[] = [
    {
      numero: 1152,
      anio: 2022,
      numeroTramite: 17,
      fecha: '01/01/2023',
      usuario: 'Usuario8',
      tipo: 'Tipo3',
      subtipo: 'Subtipo1',
      estado: 'Estado3'
    },
    {
      numero: 4568,
      anio: 2022,
      numeroTramite: 62,
      fecha: '01/01/2023',
      usuario: 'Usuario5',
      tipo: 'Tipo2',
      subtipo: 'Subtipo2',
      estado: 'Estado1'
    },
    {
      numero: 3403,
      anio: 2021,
      numeroTramite: 49,
      fecha: '01/01/2023',
      usuario: 'Usuario8',
      tipo: 'Tipo4',
      subtipo: 'Subtipo3',
      estado: 'Estado3'
    },
    {
      numero: 3970,
      anio: 2020,
      numeroTramite: 21,
      fecha: '01/01/2023',
      usuario: 'Usuario1',
      tipo: 'Tipo2',
      subtipo: 'Subtipo2',
      estado: 'Estado1'
    },
    {
      numero: 3369,
      anio: 2020,
      numeroTramite: 72,
      fecha: '01/01/2023',
      usuario: 'Usuario2',
      tipo: 'Tipo5',
      subtipo: 'Subtipo1',
      estado: 'Estado2'
    },
    {
      numero: 7849,
      anio: 2023,
      numeroTramite: 27,
      fecha: '01/01/2023',
      usuario: 'Usuario8',
      tipo: 'Tipo2',
      subtipo: 'Subtipo1',
      estado: 'Estado3'
    },
    {
      numero: 6346,
      anio: 2021,
      numeroTramite: 78,
      fecha: '01/01/2023',
      usuario: 'Usuario4',
      tipo: 'Tipo1',
      subtipo: 'Subtipo2',
      estado: 'Estado1'
    },
    {
      numero: 3839,
      anio: 2020,
      numeroTramite: 44,
      fecha: '01/01/2023',
      usuario: 'Usuario5',
      tipo: 'Tipo1',
      subtipo: 'Subtipo2',
      estado: 'Estado2'
    },
    {
      numero: 6573,
      anio: 2020,
      numeroTramite: 84,
      fecha: '01/01/2023',
      usuario: 'Usuario3',
      tipo: 'Tipo2',
      subtipo: 'Subtipo3',
      estado: 'Estado2'
    },
    {
      numero: 2051,
      anio: 2022,
      numeroTramite: 72,
      fecha: '01/01/2023',
      usuario: 'Usuario5',
      tipo: 'Tipo2',
      subtipo: 'Subtipo1',
      estado: 'Estado3'
    },
    {
      numero: 8760,
      anio: 2022,
      numeroTramite: 33,
      fecha: '01/01/2023',
      usuario: 'Usuario3',
      tipo: 'Tipo4',
      subtipo: 'Subtipo2',
      estado: 'Estado2'
    },
    {
      numero: 7869,
      anio: 2022,
      numeroTramite: 74,
      fecha: '01/01/2023',
      usuario: 'Usuario4',
      tipo: 'Tipo1',
      subtipo: 'Subtipo2',
      estado: 'Estado2'
    },
    {
      numero: 9038,
      anio: 2020,
      numeroTramite: 29,
      fecha: '01/01/2023',
      usuario: 'Usuario5',
      tipo: 'Tipo1',
      subtipo: 'Subtipo1',
      estado: 'Estado1'
    },
    {
      numero: 6678,
      anio: 2020,
      numeroTramite: 73,
      fecha: '01/01/2023',
      usuario: 'Usuario5',
      tipo: 'Tipo2',
      subtipo: 'Subtipo2',
      estado: 'Estado2'
    },
    {
      numero: 8536,
      anio: 2022,
      numeroTramite: 44,
      fecha: '01/01/2023',
      usuario: 'Usuario5',
      tipo: 'Tipo4',
      subtipo: 'Subtipo1',
      estado: 'Estado3'
    },
    {
      numero: 3543,
      anio: 2021,
      numeroTramite: 55,
      fecha: '01/01/2023',
      usuario: 'Usuario9',
      tipo: 'Tipo5',
      subtipo: 'Subtipo2',
      estado: 'Estado2'
    },
    {
      numero: 6231,
      anio: 2023,
      numeroTramite: 28,
      fecha: '01/01/2023',
      usuario: 'Usuario10',
      tipo: 'Tipo2',
      subtipo: 'Subtipo1',
      estado: 'Estado2'
    },
    {
      numero: 3246,
      anio: 2023,
      numeroTramite: 98,
      fecha: '01/01/2023',
      usuario: 'Usuario1',
      tipo: 'Tipo3',
      subtipo: 'Subtipo3',
      estado: 'Estado3'
    },
    {
      numero: 6350,
      anio: 2020,
      numeroTramite: 64,
  fecha: '01/01/2023',
      usuario: 'Usuario1',
      tipo: 'Tipo2',
      subtipo: 'Subtipo2',
      estado: 'Estado3'
    },
    {
      numero: 8421,
      anio: 2020,
      numeroTramite: 14,
      fecha: '01/01/2023',
      usuario: 'Usuario3',
      tipo: 'Tipo3',
      subtipo: 'Subtipo3',
      estado: 'Estado2'
    },
    {
      numero: 3500,
      anio: 2022,
      numeroTramite: 82,
      fecha: '01/01/2023',
      usuario: 'Usuario6',
      tipo: 'Tipo3',
      subtipo: 'Subtipo1',
      estado: 'Estado2'
    },
    {
      numero: 5383,
      anio: 2021,
      numeroTramite: 36,
      fecha: '01/01/2023',
      usuario: 'Usuario9',
      tipo: 'Tipo1',
      subtipo: 'Subtipo2',
      estado: 'Estado1'
    },
    {
      numero: 2908,
      anio: 2020,
      numeroTramite: 18,
      fecha: '01/01/2023',
      usuario: 'Usuario1',
      tipo: 'Tipo2',
      subtipo: 'Subtipo2',
      estado: 'Estado2'
    },
    {
      numero: 5116,
      anio: 2022,
      numeroTramite: 97,
      fecha: '01/01/2023',
      usuario: 'Usuario3',
      tipo: 'Tipo2',
      subtipo: 'Subtipo2',
      estado: 'Estado1'
    },
    {
      numero: 1197,
      anio: 2020,
      numeroTramite: 29,
      fecha: '01/01/2023',
      usuario: 'Usuario5',
      tipo: 'Tipo2',
      subtipo: 'Subtipo3',
      estado: 'Estado1'
    },
    {
      numero: 2217,
      anio: 2021,
      numeroTramite: 28,
      fecha: '01/01/2023',
      usuario: 'Usuario4',
      tipo: 'Tipo5',
      subtipo: 'Subtipo1',
      estado: 'Estado3'
    },
    {
      numero: 1113,
      anio: 2020,
      numeroTramite: 32,
      fecha: '01/01/2023',
      usuario: 'Usuario5',
      tipo: 'Tipo5',
      subtipo: 'Subtipo1',
      estado: 'Estado1'
    },
    {
      numero: 2973,
      anio: 2020,
      numeroTramite: 3,
      fecha: '01/01/2023',
      usuario: 'Usuario8',
      tipo: 'Tipo1',
      subtipo: 'Subtipo3',
      estado: 'Estado2'
    },
    {
      numero: 2888,
      anio: 2020,
      numeroTramite: 65,
      fecha: '01/01/2023',
      usuario: 'Usuario9',
      tipo: 'Tipo5',
      subtipo: 'Subtipo2',
      estado: 'Estado3'
    },
    {
      numero: 4404,
      anio: 2021,
      numeroTramite: 28,
      fecha: '01/01/2023',
      usuario: 'Usuario7',
      tipo: 'Tipo2',
      subtipo: 'Subtipo3',
      estado: 'Estado1'
    }
  ];
  matchModeOptions = matchModeOptions;
  dateOptions = dateOptions;
  numberOptions = numberOptions;

  constructor(private router: Router) { }

  selectDocument(product: Expediente) {
    // this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: product.numero });
    this.router.navigate(["/logged/expedientes/expediente"]);
  }

  getBack(){
    this.router.navigate(["/logged/expedientes/filtros"]);
  }
}
