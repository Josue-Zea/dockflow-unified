import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SmallIconAllert } from 'src/app/alerts/alerts.functions';
import { AuthService } from 'src/app/services/auth.service';
import { ExpedientesService } from 'src/app/services/expedientes.service';
import { TramitesService } from 'src/app/services/tramites.service';
import { validarTexto } from 'src/app/utils/validateNumber';

@Component({
  selector: 'app-simple-filter',
  templateUrl: './simple-filter.component.html',
  styleUrls: ['./simple-filter.component.css']
})
export class SimpleFilterComponent {
  number: string = "";
  isLoading: boolean = false;
  isError: boolean = false;

  constructor(private router: Router,
    private tramitesService: TramitesService,
    private expedientesService: ExpedientesService,
    private authService: AuthService) {
      this.authService.getFromLocal();
      if(this.authService.token === ""){
        this.router.navigate(["/auth/login"]);
      }
    }

  async filtrar() {
    if(!validarTexto(this.number)){
      this.isError = true;
      SmallIconAllert('warning', 'Número invalido');
      return;
    }
    this.isError = false;
    this.isLoading = true;
    const chunk = this.number.split("-");
    const num = parseInt(chunk[0], 10);
    const anio = parseInt(chunk[1], 10);
    const result = await this.expedientesService.getExpediente(
      num,
      anio,
      this.authService.usuario.tipoUsuario === "F"
    );
    if (result) {
      SmallIconAllert('success', 'Expediente encontrado');
      this.router.navigate(["/logged/expedientes/expediente"]);
    } else {
      SmallIconAllert('error', 'No se encontro el expediente');
    }
    this.isLoading = false;
  }
}
