import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user-routing.module';
import { UserLayoutComponent } from './components/user-layout/user-layout.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserListComponent } from './components/user-list/user-list.component';
import { SharedModalModule } from 'src/app/shared/shared-modal-module.module';
import { SharedFormsModule } from 'src/app/shared/shared-forms-module.module';
import { SharedTablesModule } from 'src/app/shared/shared-tables-module.module';
import { ReduxRegisterModule } from '@addapptables/ngrx-actions';
import { UserStore } from '@redux/user/stores/user.store';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from '@redux/user/effects/user.effects';
import { UserListSearchComponent } from './components/user-list/user-list-search/user-list-search.component';
import { MatTooltipModule, MatCheckboxModule } from '@angular/material';
import { RoleSelectModule } from 'src/app/controls/selects/role-select/role-select.module';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserFormModalComponent } from './components/user-form-modal/user-form-modal.component';
import { UserActionService } from './services/user-action.service';

@NgModule({
  declarations: [
    UserLayoutComponent,
    UserListComponent,
    UserListSearchComponent,
    UserFormComponent,
    UserFormModalComponent
  ],
  imports: [
    SharedModule,
    SharedModalModule,
    SharedFormsModule,
    SharedTablesModule,
    UserRoutingModule,
    MatTooltipModule,
    MatCheckboxModule,
    RoleSelectModule,
    ReduxRegisterModule.forFeature('user', { store: UserStore }),
    EffectsModule.forFeature([UserEffects])
  ],
  entryComponents: [UserFormModalComponent],
  providers: [
    UserActionService
  ],
  exports: [UserListComponent]
})
export class UserModule { }
