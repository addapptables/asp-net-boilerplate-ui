import { NgModule } from '@angular/core';
import { OrganizationUnitRoutingModule } from './organization-unit-routing.module';
import { OrganizationUnitLayoutComponent } from './components/organization-unit-layout/organization-unit-layout.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedModalModule } from 'src/app/shared/shared-modal-module.module';
import { SharedFormsModule } from 'src/app/shared/shared-forms-module.module';
import { ReduxRegisterModule } from '@addapptables/ngrx-actions';
import { EffectsModule } from '@ngrx/effects';
import { OrganizationUnitStore } from '@redux/organization-unit/stores/organization-unit.store';
import { OrganizationUnitEffects } from '@redux/organization-unit/effects/organization-unit.effects';
import { OrganizationUnitTreeComponent } from './components/organization-unit-tree/organization-unit-tree.component';
import {
  MatTreeModule,
  MatProgressSpinnerModule,
  MatMenuModule,
  MatDividerModule,
  MatTabsModule,
  MatCheckboxModule
} from '@angular/material';
import { OrganizationUnitFormComponent } from './components/organization-unit-form/organization-unit-form.component';
import { OrganizationUnitFormModalComponent } from './components/organization-unit-form-modal/organization-unit-form-modal.component';
import { OrganizationUnitActionService } from './services/organization-unit-action.service';
import {
  OrganizationUnitAssociationLayoutComponent
} from './components/associations/organization-unit-association-layout/organization-unit-association-layout.component';
import {
  UserOrganizationUnitListComponent
} from './components/associations/users/user-organization-unit-list/user-organization-unit-list.component';
import { UserOrganizationUnitStore } from '@redux/organization-unit/stores/user-organization-unit.store';
import { UserOrganizationUnitEffects } from '@redux/organization-unit/effects/user-organization-unit.effects';
import { SharedTablesModule } from 'src/app/shared/shared-tables-module.module';
import {
  UserOrganizationUnitFormComponent
} from './components/associations/users/user-organization-unit-form/user-organization-unit-form.component';
import { AssociateUserOrganizationUnitStore } from '@redux/organization-unit/stores/associate-user-organization-unit.store';
import { AssociateUserOrganizationUnitEffects } from '@redux/organization-unit/effects/associate-user-organization-unit.effects';
import {
  AssociateUserOrganizationUnitListComponent
} from './components/associations/users/associate-user-organization-unit-list/associate-user-organization-unit-list.component';
import {
  UserOrganizationUnitFormModalComponent
} from './components/associations/users/user-organization-unit-form-modal/user-organization-unit-form-modal.component';
import { AssociateRoleOrganizationUnitStore } from '@redux/organization-unit/stores/associate-role-to-organization-unit.store';
import { AssociateRoleOrganizationUnitEffects } from '@redux/organization-unit/effects/associate-role-organization-unit.effects';
import { RoleOrganizationUnitFormComponent } from './components/associations/roles/role-organization-unit-form/role-organization-unit-form.component';
import { RoleOrganizationUnitFormModalComponent } from './components/associations/roles/role-organization-unit-form-modal/role-organization-unit-form-modal.component';
import { RoleOrganizationUnitListComponent } from './components/associations/roles/role-organization-unit-list/role-organization-unit-list.component';
import { AssociateRoleOrganizationUnitListComponent } from './components/associations/roles/associate-role-organization-unit-list/associate-role-organization-unit-list.component';
import { RoleOrganizationUnitStore } from '@redux/organization-unit/stores/role-organization-unit.store';
import { RoleOrganizationUnitEffects } from '@redux/organization-unit/effects/role-organization-unit.effects';

@NgModule({
  declarations: [
    OrganizationUnitLayoutComponent,
    OrganizationUnitTreeComponent,
    OrganizationUnitFormComponent,
    OrganizationUnitFormModalComponent,
    OrganizationUnitAssociationLayoutComponent,
    UserOrganizationUnitListComponent,
    UserOrganizationUnitFormComponent,
    AssociateUserOrganizationUnitListComponent,
    UserOrganizationUnitFormModalComponent,
    RoleOrganizationUnitFormComponent,
    RoleOrganizationUnitFormModalComponent,
    RoleOrganizationUnitListComponent,
    AssociateRoleOrganizationUnitListComponent
  ],
  imports: [
    SharedModule,
    SharedModalModule,
    SharedFormsModule,
    SharedTablesModule,
    OrganizationUnitRoutingModule,
    MatTreeModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatDividerModule,
    MatTabsModule,
    MatCheckboxModule,
    ReduxRegisterModule.forFeature('organizationUnit', { store: OrganizationUnitStore }),
    ReduxRegisterModule.forFeature('userOrganizationUnit', { store: UserOrganizationUnitStore }),
    ReduxRegisterModule.forFeature('roleOrganizationUnit', { store: RoleOrganizationUnitStore }),
    ReduxRegisterModule.forFeature('associateUserOrganizationUnit', { store: AssociateUserOrganizationUnitStore }),
    ReduxRegisterModule.forFeature('associateRoleOrganizationUnit', { store: AssociateRoleOrganizationUnitStore }),
    EffectsModule.forFeature([
      OrganizationUnitEffects,
      UserOrganizationUnitEffects,
      RoleOrganizationUnitEffects,
      AssociateUserOrganizationUnitEffects,
      AssociateRoleOrganizationUnitEffects
    ])
  ],
  entryComponents: [
    OrganizationUnitFormModalComponent,
    UserOrganizationUnitFormModalComponent,
    RoleOrganizationUnitFormModalComponent
  ],
  providers: [OrganizationUnitActionService]
})
export class OrganizationUnitModule { }
