import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CabinetGuard } from './core/guards/cabinet.guard';
import { LoginComponent } from './auth/components/login/login.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./cabinet/cabinet.module').then((m) => m.CabinetModule),
    canActivate: [CabinetGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
