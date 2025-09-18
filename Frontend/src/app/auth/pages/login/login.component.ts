import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SmallIconAllert } from 'src/app/alerts/alerts.functions';
import { AuthService } from 'src/app/services/auth.service';

interface FormData {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;
  formData: FormData = {
    username: '',
    password: ''
  };

  async login() {
    this.isLoading = true;
    if (this.formData.username === "" || this.formData.password === "") return;
    const result: boolean = await this.authService.login(this.formData.username, this.formData.password);
    if (result) {
      if(this.authService.usuario.id === "0b8249d4-ad14-42e6-9f33-37217a47406a"){
        this.router.navigate(["/admin/permisos"]);
      } else {
        this.router.navigate(["/logged/expedientes/filtros"]);
      }
      SmallIconAllert('success', 'Credenciales correctas');
    } else {
      SmallIconAllert('error', 'Credenciales incorrectas');
    }
    this.isLoading = false;
  }

  constructor(private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.getFromLocal();
    if(this.authService.token === "") return; //Si está vacío no hace nada
    if( this.authService.usuario.id === "0b8249d4-ad14-42e6-9f33-37217a47406a"){
      this.router.navigate(["/admin/permisos"]);
      return;
    }
    if( this.authService.usuario.id !== "") this.router.navigate(["/logged/expedientes/filtros"]);
  }
}
