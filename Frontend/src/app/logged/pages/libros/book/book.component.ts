import { Component, Input } from '@angular/core';
import { ViewChild } from '@angular/core'
import { Router } from '@angular/router';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { Book } from 'src/app/interfaces/book.interface';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {
  @ViewChild(PdfViewerComponent) private pdfComponent!: PdfViewerComponent;
  @Input() currentPage: number = 1;
  libro: Book = {
    libro: 122,
    folio: 41,
    fecha: "03/05/2023",
    usuario: "Operador 1",
    tipo: "Tipo 1",
    estado: "Finalizado",
  };

  totalPages: number = 0;
  pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  zoom: number = 1;
  textSeach: string = "";

  constructor(private router: Router){}

  getBack(){
    this.router.navigate(["/logged/libros/resultados"]);
  }

  substractZoom() {
    if (this.zoom > 0) {
      this.zoom -= 0.1;
    }
  }

  addZoom() {
    this.zoom += 0.1;
  }

  pageInitialized(e: any) {
    this.totalPages = e.source?._pages.length || 0;
  }

  search() {
    this.pdfComponent.eventBus.dispatch('find', {
      query: this.textSeach, type: 'again', caseSensitive: false, findPrevious: undefined, highlightAll: true, phraseSearch: true
    });
  }
}
