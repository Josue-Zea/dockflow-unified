import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableComponent } from './table/table.component';
import { FiltersComponent } from './filters/filters.component';
import { AdvancedFilterComponent } from './filters/advanced-filter/advanced-filter.component';
import { SimpleFilterComponent } from './filters/simple-filter/simple-filter.component';
import { BookComponent } from './book/book.component'
import { PrimengModule } from 'src/app/primeng/primeng.module';
import { FormsModule } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { LibrosRoutingModule } from './libros-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    TableComponent,
    FiltersComponent,
    AdvancedFilterComponent,
    SimpleFilterComponent,
    BookComponent
  ],
  imports: [
    CommonModule,
    PrimengModule,
    FormsModule,
    PdfViewerModule,
    LibrosRoutingModule,
    SharedModule
  ]
})
export class LibrosModule { }
