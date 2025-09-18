import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { ENVIRONMENT } from 'src/environments/environments';
import { ExpedienteApi } from '../interfaces/expediente.interface';
import { Permission } from '../interfaces/permission.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Employee } from '../interfaces/employee';
import { Log } from '../interfaces/log.interface';

interface Parametros {
  begin?: string | undefined;
  end?: string | undefined;
  user?: string | undefined;
  limit?: string | undefined;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _logs: Log[] = []
  get logs() {
    return [ ...this._logs ];
  }

  private _empleados: Employee[] = []
  get empleados() {
    return [ ...this._empleados ];
  }
  
  constructor(private http: HttpClient,
              private authService: AuthService) { }

  loadPermissionsDB(): Observable<Permission[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.token}`
    });
    const ruta = `${ENVIRONMENT.API}/permisos/getPermisos`;
    return this.http.get<Permission[]>(ruta, { headers });
  }

  async loadUsersDB(): Promise<boolean> {
    const response = await fetch(`${ENVIRONMENT.API}/filter/getUsuarios`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.token}`
      },
    });
    if (!response.ok) { //Algun error
      return false;
    } else {
      const employes: Employee[] = await response.json();
      this._empleados = employes;
      return true;
    }
  }

  async filterLogs(begin: Date | undefined,
                  end: Date | undefined,
                  user: string | undefined,
                  limit: string | undefined ): Promise<boolean> {
    const parametros: Parametros = {};
    if (begin !== undefined) parametros.begin = this.formatDate(begin);
    if (end !== undefined) parametros.end = this.formatDate(end);
    if (user !== undefined) parametros.user = user;
    if (limit !== undefined) parametros.limit = limit;
    const response = await fetch(`${ENVIRONMENT.API}/filter/filterLogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.token}`
      },
      body: JSON.stringify(parametros),
    });
    if (!response.ok) { //Algun error
      return false;
    } else {
      const logs: Log[] = await response.json();
      const newLogs = logs.map(user => {
        const usuarioCompleto = this.empleados.find(u => `${u.id}` === `${user.idUsuario}`);
        return {
          ...user,
          operacion: user.operacion.replaceAll("\"", ""),
          descripcion: user.descripcion === "{}" ? "" : user.descripcion,
          nombre: usuarioCompleto ? usuarioCompleto.nombre : "",
        };
      });
      this._logs = newLogs;
      return true;
    }
  }

  async updatePermissionsDB(
    id: string,
    permisoExpedientes: number,
    permisoLibros: number,
    verExpedientesProceso: boolean,
    verLibrosProceso: boolean
  ): Promise<boolean> {
    const parametros = {
      id,
      permisoExpedientes,
      permisoLibros,
      verExpedientesProceso,
      verLibrosProceso
    }
    const response = await fetch(`${ENVIRONMENT.API}/permisos/updatePermiso`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.token}`
      },
      body: JSON.stringify(parametros),
    });
    if (!response.ok) {
      return false;
    } else {
      return true;
    }
  }

  formatDate(date: Date): string {
    // Obtén los componentes de la fecha
    const año: number = date.getFullYear();
    const mes: number = date.getMonth() + 1; // Nota: getMonth devuelve valores de 0 a 11
    const dia: number = date.getDate();

    // Formatea los componentes como una cadena 'YYYY-MM-DD'
    const formatedDate: string = `${año}-${mes < 10 ? '0' + mes : mes}-${dia < 10 ? '0' + dia : dia}`;

    return formatedDate;

  }
}
