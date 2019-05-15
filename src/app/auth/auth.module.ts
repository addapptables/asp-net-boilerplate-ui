import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import {
    MatCardModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatCheckboxModule
} from '@angular/material';
import { AuthComponent } from './components/auth/auth.component';
import { SharedModule } from '../shared/shared.module';
import { CardModule } from '@addapptables/card';
import { TranslateModule } from '@addapptable/components/translate/translate.module';
import { RegisterComponent } from './components/register/register.component';
import { RegisterFormComponent } from './components/register/components/register-form/register-form.component';
import { ProgressBarModule } from '@addapptable/components/progress-bar/progress-bar.module';
import { SharedFormsModule } from '../shared/shared-forms-module.module';
import { SharedModalModule } from '../shared/shared-modal-module.module';
import { TenantFormComponent } from './components/tenant/tenant-form/tenant-form.component';
import { TenantFormModalComponent } from './components/tenant/tenant-form-modal/tenant-form-modal.component';
import { NotifierModule } from '@addapptables/notifier';
import { TenantActionService } from './components/tenant/services/tenant-action.service';
import { LoginRouteGuard } from '../shared/services/login-route-guard.service';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AccountResolverService } from './services/account-resolver.service';

@NgModule({
    imports: [
        SharedModule,
        AuthRoutingModule,
        CardModule,
        MatCardModule,
        MatToolbarModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule,
        TranslateModule,
        MatCheckboxModule,
        ProgressBarModule,
        SharedFormsModule,
        SharedModalModule,
        NotifierModule
    ],
    declarations: [
        LoginFormComponent,
        AuthComponent,
        RegisterComponent,
        RegisterFormComponent,
        TenantFormComponent,
        TenantFormModalComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent
    ],
    entryComponents: [TenantFormModalComponent],
    providers: [
        TenantActionService,
        LoginRouteGuard,
        AccountResolverService
    ]
})
export class AuthModule { }
