import { NgModule } from '@angular/core';
import { RoleRoutingModule } from './role-routing.module';
import { RoleLayoutComponent } from './component/role-layout/role-layout.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedModalModule } from 'src/app/shared/shared-modal-module.module';
import { SharedFormsModule } from 'src/app/shared/shared-forms-module.module';
import { SharedTablesModule } from 'src/app/shared/shared-tables-module.module';
import { RoleListComponent } from './component/role-list/role-list.component';
import { ReduxRegisterModule } from '@addapptables/ngrx-actions';
import { EffectsModule } from '@ngrx/effects';
import { RoleStore } from '@redux/role/stores/role.store';
import { RoleEffects } from '@redux/role/effects/role.effects';
import { RoleFormComponent } from './component/role-form/role-form.component';
import { PermissionTreeModule } from 'src/app/controls/tree/permission-tree/permission-tree.module';
import { RoleFormModalComponent } from './component/role-form-modal/role-form-modal.component';
import { MatStepperModule } from '@angular/material';

@NgModule({
  declarations: [
    RoleLayoutComponent,
    RoleListComponent,
    RoleFormComponent,
    RoleFormModalComponent
  ],
  imports: [
    SharedModule,
    RoleRoutingModule,
    SharedModalModule,
    SharedFormsModule,
    SharedTablesModule,
    PermissionTreeModule,
    MatStepperModule,
    ReduxRegisterModule.forFeature('role', { store: RoleStore }),
    EffectsModule.forFeature([RoleEffects])
  ],
  entryComponents: [
    RoleFormModalComponent
  ]
})
export class RoleModule { }
