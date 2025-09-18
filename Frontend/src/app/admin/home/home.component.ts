import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Option } from 'src/app/interfaces/options.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  sidebarVisible: boolean = false;
  items: MenuItem[] = [
    {
      label: ' Cerrar sesión',
      icon: 'pi pi-fw pi-sign-out',
      command: () => {
        this.logout();
      }
    }
  ];
  optionsSidebar: Option[] = [
    { name: "Permisos", prefix: "permisos", ruta: "/admin/permisos" },
    { name: "Bitácora", prefix: "bitacora", ruta: "/admin/filtros" },
  ];

  constructor(private router: Router,
              private authService: AuthService) { }

  logout() {
    this.authService.logout();
    this.router.navigate(["/auth/login"]);
  }
}
