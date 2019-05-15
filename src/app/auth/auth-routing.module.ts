import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginRouteGuard } from '../shared/services/login-route-guard.service';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AccountResolverService } from './services/account-resolver.service';

const routes: Routes = [
  {
    path: 'login',
    component: AuthComponent,
    canActivate: [LoginRouteGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [LoginRouteGuard]
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [LoginRouteGuard]
  },
  {
    path: 'reset-password/:userId/:resetCode',
    component: ResetPasswordComponent,
    resolve: {
      account: AccountResolverService
    },
    canActivate: [LoginRouteGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
