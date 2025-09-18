import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PermissionsComponent } from './pages/permissions/permissions.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FilterLogsComponent } from './pages/filter-logs/filter-logs.component';
import { ResultsLogsComponent } from './pages/results-logs/results-logs.component';
import { PrimengModule } from '../primeng/primeng.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    PermissionsComponent,
    FilterLogsComponent,
    ResultsLogsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    PrimengModule,
    FormsModule
  ]
})
export class AdminModule { }
