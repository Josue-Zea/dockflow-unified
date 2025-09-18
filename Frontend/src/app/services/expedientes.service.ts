import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { ENVIRONMENT } from 'src/environments/environments';
import { ExpedienteApi } from '../interfaces/expediente.interface';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ExpedientesService {
  private _expediente: ExpedienteApi = {
    esolicitud: 0,
    numero_tramite: 0,
    numero_expediente: 0,
    anio_expediente: 0,
  }
  get expediente() {
    return { ...this._expediente };
  }

  private _pdf: Uint8Array = new Uint8Array;
  get pdf() {
    return this._pdf;
  }

  constructor(private http: HttpClient,
              private router: Router,
              private authService: AuthService) { }

  async getExpediente(numero_expediente: number, anio_expediente: number, watermark: boolean): Promise<boolean> {
    const parametros = {
      numero_expediente,
      anio_expediente,
      watermark
    };
    ;
    // this.http.post(
    //   `${ENVIRONMENT.API}/expedientes/getExpediente`,
    //   parametros,
    //   {
    //     // headers: {
    //     //   'Content-Type': 'application/json',
    //     //   Accept: "application/pdf",
    //     //   'Respuesta-Info': "application/json"
    //     // },
    //     observe: "response",
    //     responseType: "blob"
    //   }
    // ).subscribe(
    //   (res) => {
    //     console.log(res.headers.keys());
    //     console.log(res.headers);
    //     // console.log(res);
    //   });
    // return false;

    const response = await fetch(`${ENVIRONMENT.API}/expedientes/getExpediente`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.token}`
      },
      body: JSON.stringify(parametros),
    });
    if (!response?.ok) { //Algun error
      if(response.status === 401){
        this.authService.logout();
        this.router.navigate(["/auth/login"]);
      }
      return false;
    } else {
      this._expediente.numero_expediente = numero_expediente;
      this._expediente.anio_expediente = anio_expediente;
      // const headers = response.headers.get("Respuesta-Info") || "";
      // const data: ExpedienteApi = JSON.parse(headers);
      // console.log(data);
      // this._expediente = data;
      this._pdf = new Uint8Array(await response.arrayBuffer());
      return true;
    }
  }
}
