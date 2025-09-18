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
    { name: "Expedientes", prefix: "expedientes", ruta: "/logged/expedientes/filtros" },
    { name: "Libros", prefix: "libros", ruta: "/logged/libros/filtros" },
  ];

  constructor(private router: Router,
              private authService: AuthService) { }

  logout() {
    this.authService.logout();
    this.router.navigate(["/auth/login"]);
  }
}
