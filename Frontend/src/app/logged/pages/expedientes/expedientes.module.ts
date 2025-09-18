import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableComponent } from './table/table.component';
import { ExpedienteComponent } from './expediente/expediente.component';
import { FiltersComponent } from './filters/filters.component';
import { AdvancedFilterComponent } from './filters/advanced-filter/advanced-filter.component';
import { SimpleFilterComponent } from './filters/simple-filter/simple-filter.component';
import { PrimengModule } from 'src/app/primeng/primeng.module';
import { FormsModule } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ExpedientesRoutingModule } from './expedientes-routing.module';
import { SharedModule } from 'primeng/api';

@NgModule({
  declarations: [
    TableComponent,
    ExpedienteComponent,
    FiltersComponent,
    AdvancedFilterComponent,
    SimpleFilterComponent,
  ],
  imports: [
    CommonModule,
    PrimengModule,
    FormsModule,
    PdfViewerModule,
    ExpedientesRoutingModule,
    SharedModule
  ]
})
export class ExpedientesModule { }
