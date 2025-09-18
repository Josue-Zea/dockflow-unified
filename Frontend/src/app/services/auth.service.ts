import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { ENVIRONMENT } from 'src/environments/environments';
import { ExpedienteApi } from '../interfaces/expediente.interface';
import { AuthCorrectResponse } from '../interfaces/auth.interface';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _usuario: User = {
    id: "",
    nombre: "",
    idTipoUsuario: "",
    tipoUsuario: "",
    permisoExpedientes: 0,
    permisoLibros: 0,
    verExpedientesProceso: false,
    verLibrosProceso: false,
  }
  get usuario() {
    return { ...this._usuario };
  }

  private _token: string = "";
  get token() {
    return this._token;
  }

  constructor() { }

  async login(username: string, password: string): Promise<boolean> {
    const parametros = {
      username,
      password
    };

    const response = await fetch(`${ENVIRONMENT.API}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parametros),
    });
    if (!response.ok) { //Algun error
      return false;
    } else {
      const authCorrect: AuthCorrectResponse = await response.json();
      const token = authCorrect.token;
      this._token = token
      const user: User = jwtDecode(authCorrect.token);
      this._usuario = user;
      this.saveInLocal(token, user);
      return true;
    }
  }

  saveInLocal(token: string, user: User){
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("user", JSON.stringify(user));
  }

  getFromLocal(){
    const token = localStorage.getItem("token");
    if(token){
      this._token = JSON.parse(token);
    }
    const user = localStorage.getItem("user");
    if(user){
      this._usuario = JSON.parse(user);
    }
  }

  logout() {
    this._usuario = {
      id: "",
      nombre: "",
      idTipoUsuario: "",
      tipoUsuario: "",
      permisoExpedientes: 0,
      permisoLibros: 0,
      verExpedientesProceso: false,
      verLibrosProceso: false,
    }
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
}
