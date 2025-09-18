import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from '../primeng/primeng.module';
import { FormsModule } from '@angular/forms';
import { LoggedRoutingModule } from './logged-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LibrosModule } from './pages/libros/libros.module';
import { ExpedientesModule } from './pages/expedientes/expedientes.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    PrimengModule,
    LoggedRoutingModule,
    SharedModule,
    ExpedientesModule,
    LibrosModule
  ]
})
export class LoggedModule { }
