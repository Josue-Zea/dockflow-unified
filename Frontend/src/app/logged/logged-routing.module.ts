import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorPageComponent } from '../shared/error-page/error-page.component';
import { HomeComponent } from './home/home.component';
import { ExpedientesModule } from './pages/expedientes/expedientes.module';
import { LibrosModule } from './pages/libros/libros.module';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [
      {
        path: "expedientes",
        loadChildren:
          () => ExpedientesModule
      },
      {
        path: "libros",
        loadChildren:
          () => LibrosModule
      },
      {
        path: '404',
        component: ErrorPageComponent
      },
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
export class LoggedRoutingModule { }

/*
{
        path: "expedientes/filtros",
        component: FiltersComponent
      },
      {
        path: "expedientes/resultados",
        component: TableComponent
      },
      {
        path: "expedientes/expediente",
        component: ExpedienteComponent
      },
      {
        path: "libros/filtros",
        component: LibrosFiltersComponent
      },
      {
        path: "libros/resultados",
        component: LibrosTableComponent
      },
      {
        path: "libros/expediente",
        component: LibrosBookComponent
      },
      {
        path: "**",
        redirectTo: "/expedientes/filtros"
      }
 */