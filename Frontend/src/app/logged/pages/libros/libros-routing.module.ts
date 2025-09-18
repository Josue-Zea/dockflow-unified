import { NgModule } from '@angular/core';
import { FiltersComponent } from './filters/filters.component';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './table/table.component';
import { BookComponent } from './book/book.component';

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
        path: "libro",
        component: BookComponent
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
export class LibrosRoutingModule { }
