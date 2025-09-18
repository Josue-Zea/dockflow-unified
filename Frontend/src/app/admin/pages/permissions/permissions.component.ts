import { Component, OnInit } from '@angular/core';
import { IconAlert, SmallIconAllert } from 'src/app/alerts/alerts.functions';
import { Permission } from 'src/app/interfaces/permission.interface';
import { DataService } from 'src/app/services/data.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

interface TempProperties {
  permisoExpedientes: number;
  permisoLibros: number;
  verExpedientesProceso: boolean,
  verLibrosProceso: boolean,
}

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent implements OnInit {
  isLoading: boolean = false;
  tipoUsuarioSelected: Permission = {
    id: "",
    idTipoUsuario: "",
    permisoExpedientes: 0,
    permisoLibros: 0,
    verExpedientesProceso: false,
    verLibrosProceso: false,
    abreviatura: "--",
    nombre: "--"
  };
  permisosTipoUsuario: Permission[] = [];

  searchDocument: boolean = false;
  printDocument: boolean = false;
  inProcessDocuments: boolean = false;

  searchBook: boolean = false;
  printBook: boolean = false;
  inProcessBooks: boolean = false;
  editing: boolean = false;

  tempProperties: TempProperties = {
    permisoExpedientes: 0,
    permisoLibros: 0,
    verExpedientesProceso: false,
    verLibrosProceso: false,
  };

  edit() {
    this.tempProperties = {
      permisoExpedientes: this.tipoUsuarioSelected.permisoExpedientes,
      permisoLibros: this.tipoUsuarioSelected.permisoLibros,
      verExpedientesProceso: this.tipoUsuarioSelected.verExpedientesProceso,
      verLibrosProceso: this.tipoUsuarioSelected.verLibrosProceso,
    }
    this.editing = true;
  }

  cancel(){
    this.backToTemp();
    this.editing = false;
  }

  async save() {
    const permisoExpedientes = this.searchDocument && this.printDocument ? 3
    : this.printDocument ? 2
      : this.searchDocument ? 1
        : 0;
    const permisoLibros = this.searchBook && this.printBook ? 3
    : this.printBook ? 2
      : this.searchBook ? 1
        : 0;
    const verExpedientesProceso = this.inProcessDocuments;
    const verLibrosProceso = this.inProcessBooks;
    const result = await this.dataService.updatePermissionsDB(
      this.tipoUsuarioSelected.id,
      permisoExpedientes,
      permisoLibros,
      verExpedientesProceso,
      verLibrosProceso
    );
    if (result) {
      const objetoIndex = this.permisosTipoUsuario
        .findIndex(obj => obj.id === this.tipoUsuarioSelected.id);
      this.permisosTipoUsuario[objetoIndex] = {
        ...this.permisosTipoUsuario[objetoIndex],
        permisoExpedientes,
        permisoLibros,
        verExpedientesProceso,
        verLibrosProceso
      };
      SmallIconAllert('success', 'Permisos guardados');
    } else {
      this.backToTemp();
      SmallIconAllert('error', 'Error al actualizar');
    }
    this.editing = false;
  }

  backToTemp(){
    this.searchDocument = this.tempProperties.permisoExpedientes === 1 || this.tempProperties.permisoExpedientes === 3;
    this.printDocument = this.tempProperties.permisoExpedientes === 2 || this.tempProperties.permisoExpedientes === 3;
    this.searchBook = this.tempProperties.permisoLibros === 1 || this.tempProperties.permisoLibros === 3;
    this.printBook = this.tempProperties.permisoLibros === 2 || this.tempProperties.permisoLibros === 3;
    this.inProcessDocuments = this.tempProperties.verExpedientesProceso;
    this.inProcessBooks = this.tempProperties.verLibrosProceso;
  }

  itemSelected(event: any) {
    const { value } = event;
    if (value !== null) {
      this.tipoUsuarioSelected = value;
      this.searchDocument = value.permisoExpedientes === 1 || value.permisoExpedientes === 3;
      this.printDocument = value.permisoExpedientes === 2 || value.permisoExpedientes === 3;
      this.searchBook = value.permisoLibros === 1 || value.permisoLibros === 3;
      this.printBook = value.permisoLibros === 2 || value.permisoLibros === 3;
      this.inProcessDocuments = value.verExpedientesProceso;
      this.inProcessBooks = value.verLibrosProceso;
    }
  }

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.loadPermissions();
  }

  async loadPermissions(): Promise<void> {
    this.isLoading = true;
    this.dataService.loadPermissionsDB()
      .pipe(
        catchError(error => {
          this.isLoading = false;
          IconAlert("error", "Error al cargar los permisos");
          console.log(`${error} <- Error en loadPermissions`);
          // Devolver un observable con un valor predeterminado o vacío según tus necesidades
          return of([]); // Puedes devolver un array vacío o cualquier valor predeterminado
        })
      )
      .subscribe(permisos => {
        this.isLoading = false;
        this.permisosTipoUsuario = permisos
      });
  }
}
