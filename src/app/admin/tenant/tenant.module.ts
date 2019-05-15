import { NgModule } from '@angular/core';
import { TenantRoutingModule } from './tenant-routing.module';
import { TenantListComponent } from './components/tenant-list/tenant-list.component';
import { TenantLayoutComponent } from './components/tenant-layout/tenant-layout.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedTablesModule } from 'src/app/shared/shared-tables-module.module';
import { SharedModalModule } from 'src/app/shared/shared-modal-module.module';
import { SharedFormsModule } from 'src/app/shared/shared-forms-module.module';
import { ReduxRegisterModule } from '@addapptables/ngrx-actions';
import { TenantStore } from '@redux/tenant/stores/tenant.store';
import { TenantEffects } from '@redux/tenant/effects/tenant.effects';
import { EffectsModule } from '@ngrx/effects';
import { TenantListSearchComponent } from './components/tenant-list/tenant-list-search/tenant-list-search.component';
import { MatTooltipModule, MatCheckboxModule } from '@angular/material';
import { EditionSelectModule } from 'src/app/controls/selects/edition-select/edition-select.module';
import { TenantFormComponent } from './components/tenant-form/tenant-form.component';
import { TenantFormModalComponent } from './components/tenant-form-modal/tenant-form-modal.component';
import { TenantActionService } from './services/tenant-action.service';
import { UserListImpersonationComponent } from './components/tenant-list/user-list-impersonation/user-list-impersonation.component';
import { UserModule } from '../user/user.module';

@NgModule({
  declarations: [
    TenantListComponent,
    TenantLayoutComponent,
    TenantListSearchComponent,
    TenantFormComponent,
    TenantFormModalComponent,
    UserListImpersonationComponent
  ],
  imports: [
    SharedModule,
    SharedTablesModule,
    SharedModalModule,
    SharedFormsModule,
    TenantRoutingModule,
    MatTooltipModule,
    EditionSelectModule,
    MatCheckboxModule,
    MatTooltipModule,
    UserModule,
    ReduxRegisterModule.forFeature('tenant', { store: TenantStore }),
    EffectsModule.forFeature([TenantEffects])
  ],
  entryComponents: [
    TenantFormModalComponent,
    UserListImpersonationComponent
  ],
  providers: [TenantActionService]
})
export class TenantModule { }
