import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/interfaces/book.interface';
import { dateOptions, numberOptions, matchModeOptions } from 'src/app/primeng/modeOptions/options';
interface Document {
  numero: string;
  fecha: string;
  usuario: string;
  tipo: string;
  subtipo: string;
};

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  documents: Book[] = [
    {
      libro: 30,
      folio: 4764,
      fecha: '01/01/2023',
      usuario: 'Usuario7',
      tipo: 'Tipo1',
      estado: 'Estado1'
    },
    {
      libro: 3,
      folio: 5097,
      fecha: '01/01/2023',
      usuario: 'Usuario10',
      tipo: 'Tipo1',
      estado: 'Estado2'
    },
    {
      libro: 90,
      folio: 4003,
      fecha: '01/01/2023',
      usuario: 'Usuario4',
      tipo: 'Tipo4',
      estado: 'Estado1'
    },
    {
      libro: 47,
      folio: 2522,
      fecha: '01/01/2023',
      usuario: 'Usuario6',
      tipo: 'Tipo2',
      estado: 'Estado1'
    },
    {
      libro: 16,
      folio: 4294,
      fecha: '01/01/2023',
      usuario: 'Usuario10',
      tipo: 'Tipo5',
      estado: 'Estado1'
    },
    {
      libro: 49,
      folio: 7117,
      fecha: '01/01/2023',
      usuario: 'Usuario10',
      tipo: 'Tipo3',
      estado: 'Estado1'
    },
    {
      libro: 73,
      folio: 2730,
      fecha: '01/01/2023',
      usuario: 'Usuario6',
      tipo: 'Tipo3',
      estado: 'Estado1'
    },
    {
      libro: 6,
      folio: 9855,
      fecha: '01/01/2023',
      usuario: 'Usuario4',
      tipo: 'Tipo5',
      estado: 'Estado2'
    },
    {
      libro: 59,
      folio: 4406,
      fecha: '01/01/2023',
      usuario: 'Usuario7',
      tipo: 'Tipo2',
      estado: 'Estado3'
    },
    {
      libro: 25,
      folio: 7548,
      fecha: '01/01/2023',
      usuario: 'Usuario10',
      tipo: 'Tipo5',
      estado: 'Estado2'
    },
    {
      libro: 90,
      folio: 9036,
      fecha: '01/01/2023',
      usuario: 'Usuario3',
      tipo: 'Tipo5',
      estado: 'Estado1'
    },
    {
      libro: 89,
      folio: 8719,
      fecha: '01/01/2023',
      usuario: 'Usuario9',
      tipo: 'Tipo4',estado: 'Estado3'
    },
    {
      libro: 17,
      folio: 6845,
      fecha: '01/01/2023',
      usuario: 'Usuario10',
      tipo: 'Tipo5',
      estado: 'Estado3'
    },
    {
      libro: 92,
      folio: 5589,
      fecha: '01/01/2023',
      usuario: 'Usuario8',
      tipo: 'Tipo3',
      estado: 'Estado2'
    },
    {
      libro: 49,
      folio: 2439,
      fecha: '01/01/2023',
      usuario: 'Usuario8',
      tipo: 'Tipo3',
      estado: 'Estado3'
    },
    {
      libro: 44,
      folio: 2208,
      fecha: '01/01/2023',
      usuario: 'Usuario6',
      tipo: 'Tipo4',
      estado: 'Estado3'
    },
    {
      libro: 77,
      folio: 5698,
      fecha: '01/01/2023',
      usuario: 'Usuario1',
      tipo: 'Tipo2',
      estado: 'Estado2'
    },
    {
      libro: 17,
      folio: 5522,
      fecha: '01/01/2023',
      usuario: 'Usuario3',
      tipo: 'Tipo1',
      estado: 'Estado3'
    },
    {
      libro: 93,
      folio: 8540,
      fecha: '01/01/2023',
      usuario: 'Usuario2',
      tipo: 'Tipo4',
      estado: 'Estado1'
    },
    {
      libro: 97,
      folio: 7668,
      fecha: '01/01/2023',
      usuario: 'Usuario8',
      tipo: 'Tipo3',
      estado: 'Estado1'
    },
    {
      libro: 17,
      folio: 9273,
      fecha: '01/01/2023',
      usuario: 'Usuario1',
      tipo: 'Tipo4',
      estado: 'Estado1'
    },
    {
      libro: 5,
      folio: 3049,
      fecha: '01/01/2023',
      usuario: 'Usuario7',
      tipo: 'Tipo1',
      estado: 'Estado1'
    },
    {
      libro: 60,
      folio: 1549,
      fecha: '01/01/2023',
      usuario: 'Usuario5',
      tipo: 'Tipo3',
      estado: 'Estado1'
    },
    {
      libro: 56,
      folio: 9717,
      fecha: '01/01/2023',
      usuario: 'Usuario1',
      tipo: 'Tipo4',
      estado: 'Estado3'
    },
    {
      libro: 35,
      folio: 4771,
      fecha: '01/01/2023',
      usuario: 'Usuario6',
      tipo: 'Tipo4',
      estado: 'Estado2'
    },
    {
      libro: 84,
      folio: 7943,
      fecha: '01/01/2023',
      usuario: 'Usuario10',
      tipo: 'Tipo3',
      estado: 'Estado2'
    },
    {
      libro: 20,
      folio: 7147,
      fecha: '01/01/2023',
      usuario: 'Usuario5',
      tipo: 'Tipo4',
      estado: 'Estado3'
    },
    {
      libro: 82,
      folio: 1527,
      fecha: '01/01/2023',
      usuario: 'Usuario8',
      tipo: 'Tipo1',
      estado: 'Estado3'
    },
    {
      libro: 20,
      folio: 3655,
      fecha: '01/01/2023',
      usuario: 'Usuario6',
      tipo: 'Tipo5',
      estado: 'Estado3'
    },
    {
      libro: 44,
      folio: 6283,
      fecha: '01/01/2023',
      usuario: 'Usuario10',
      tipo: 'Tipo5',
      estado: 'Estado1'
    }
  ];

  matchModeOptions = matchModeOptions;
  dateOptions = dateOptions;
  numberOptions = numberOptions;

  constructor(private router: Router) { }

  selectDocument(document: Document) {
    this.router.navigate(["/logged/libros/libro"]);
  }

  getBack(){
    this.router.navigate(["/logged/libros/filtros"]);
  }
}
