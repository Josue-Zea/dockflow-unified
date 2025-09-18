import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionsComponent } from './pages/permissions/permissions.component';
import { HomeComponent } from './home/home.component';
import { FilterLogsComponent } from './pages/filter-logs/filter-logs.component';
import { ResultsLogsComponent } from './pages/results-logs/results-logs.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [
      {
        path: "permisos",
        component: PermissionsComponent
      },
      {
        path: "filtros",
        component: FilterLogsComponent
      },
      {
        path: "resultados",
        component: ResultsLogsComponent
      },
      {
        path: "**",
        redirectTo: "permisos"
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
export class AdminRoutingModule { }
