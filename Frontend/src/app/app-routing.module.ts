import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { AuthModule } from './auth/auth.module';
import { LoggedModule } from './logged/logged.module';
import { AdminModule } from './admin/admin.module';

const routes: Routes = [
  {
    path: "auth",
    loadChildren:
      () => AuthModule
  },
  {
    path: "logged",
    loadChildren:
      () => LoggedModule
  },
  {
    path: "admin",
    loadChildren:
      () => AdminModule
  },
  {
    path: '404',
    component: ErrorPageComponent
  },
  {
    path: "**",
    redirectTo: "auth/login"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
