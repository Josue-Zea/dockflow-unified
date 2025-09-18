import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { ENVIRONMENT } from 'src/environments/environments';
import { ExpedienteApi } from '../interfaces/expediente.interface';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Tramite } from '../interfaces/tramite.interface';
@Injectable({
  providedIn: 'root'
})
export class TramitesService {
  private _tramites: Tramite[] = [];
  get tramites() {
    return [...this._tramites];
  }

  constructor(private router: Router,
              private authService: AuthService) { }

  async verifyExpedienteHasTramites(numero_expediente: number, anio_expediente: number): Promise<any> {
    const response = await fetch(`${ENVIRONMENT.API}/dockflow/getExpedienteType/${numero_expediente}/${anio_expediente}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.token}`
      },
    });
    if (!response?.ok) { //Algun error
      if(response.status === 401){
        this.authService.logout();
        this.router.navigate(["/auth/login"]);
      }
    } else {
      const data = await response.json();
      return data;
    }
  }

  async getTramites(iddocumento: string): Promise<Tramite[]> {
    const response = await fetch(`${ENVIRONMENT.API}/dockflow/getTramitesDocumentosExpediente/${iddocumento}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.token}`
      },
    });
    if (!response?.ok) { //Algun error
      if(response.status === 401){
        this.authService.logout();
        this.router.navigate(["/auth/login"]);
      }
      return [];
    } else {
      const tramites = await response.json();
      this._tramites = tramites;
      return tramites;
    }
  }
}
