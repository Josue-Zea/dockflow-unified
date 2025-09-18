import { Component, Input, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core'
import { Router } from '@angular/router';
import { PDFDocumentProxy, PdfViewerComponent } from 'ng2-pdf-viewer';
import { Location } from '@angular/common';
import { Expediente } from 'src/app/interfaces/expediente.interface';
import { ExpedientesService } from 'src/app/services/expedientes.service';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { TramitesService } from 'src/app/services/tramites.service';
import { Tramite } from 'src/app/interfaces/tramite.interface';

@Component({
  selector: 'app-expediente',
  templateUrl: './expediente.component.html',
  styleUrls: ['./expediente.component.css']
})
export class ExpedienteComponent implements OnInit {
  @ViewChild(PdfViewerComponent) private pdfComponent!: PdfViewerComponent;
  @Input() currentPage: number = 1;
  user: User | undefined;
  tramites: Tramite[] = [];
  tramitesConPdf: { tramite: Tramite; pdfSrc: Uint8Array }[] = [];

  constructor(
    private location: Location,
    private expedientesService: ExpedientesService,
    private authService: AuthService,
    private tramitesService: TramitesService
  ) {
    this.loadTramites();
  }
  expediente: Expediente = {
    numero: this.expedientesService.expediente.numero_expediente,
    anio: this.expedientesService.expediente.anio_expediente,
    numeroTramite: this.expedientesService.expediente.numero_tramite,
    fecha: "",
    usuario: "",
    tipo: "",
    subtipo: "",
    estado: "",
  }

  async loadTramites() {
    const result = await this.tramitesService.verifyExpedienteHasTramites(
      this.expediente.numero,
      this.expediente.anio
    );

    if (result?.manejatramites) {
      this.tramites = await this.tramitesService.getTramites(result.iddocumento);

      // Convertimos cada pdfBase64 en Uint8Array
      this.tramitesConPdf = this.tramites.map(tramite => ({
        tramite,
        pdfSrc: this.base64ToUint8Array(tramite.pdfBase64),
      }));
    }
  }

  // Función para convertir Base64 a Uint8Array
  base64ToUint8Array(base64: string): Uint8Array {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  totalPages: number = 0;
  pdfSrc = this.expedientesService.pdf;
  zoom: number = 1;
  textSeach: string = "";

  getBack() {
    this.location.back();
    // this.router.navigate(["/logged/expedientes/resultados"]);
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

  _base64ToArrayBuffer(base64: string) {
    var binary_string = base64.replace(/\\n/g, '');
    binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }

  pdf?: PDFDocumentProxy;

  onLoaded(pdf: PDFDocumentProxy) {
    this.pdf = pdf;
  }

  printPDF(): void {
    this.pdf?.getData().then((u8) => {
      let blob = new Blob([u8.buffer], {
        type: 'application/pdf'
      });

      const blobUrl = window.URL.createObjectURL((blob));
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = blobUrl;
      document.body.appendChild(iframe);
      iframe.contentWindow?.print();
    });
  }

  ngOnInit(): void {
    this.user = this.authService.usuario;
  }
}
