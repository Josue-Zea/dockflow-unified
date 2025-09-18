import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from '../primeng/primeng.module';
import { ErrorPageComponent } from './error-page/error-page.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ErrorPageComponent,
    SidebarComponent,
    ToolbarComponent
  ],
  exports: [
    SidebarComponent,
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    PrimengModule,
    FormsModule
  ]
})
export class SharedModule { }
