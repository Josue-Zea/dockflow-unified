import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { PrimengModule } from '../primeng/primeng.module';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    PrimengModule,
    AuthRoutingModule,
    FormsModule
  ]
})
export class AuthModule { }
