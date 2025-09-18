import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FiltersComponent } from './filters/filters.component';
import { TableComponent } from './table/table.component';
import { ExpedienteComponent } from './expediente/expediente.component';

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "filtros",
        component: FiltersComponent
      },
      {
        path: "resultados",
        component: TableComponent
      },
      {
        path: "expediente",
        component: ExpedienteComponent
      },
      {
        path: "**",
        redirectTo: "filtros"
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ExpedientesRoutingModule { }
