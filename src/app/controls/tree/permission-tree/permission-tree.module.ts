import { NgModule } from '@angular/core';
import { PermissionTreeComponent } from './permission-tree.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTreeModule, MatCheckboxModule, MatButtonModule } from '@angular/material';
import { ReduxRegisterModule } from '@addapptables/ngrx-actions';
import { EffectsModule } from '@ngrx/effects';
import { PermissionStore } from '@redux/permission/stores/permission.store';
import { PermissionEffects } from '@redux/permission/effects/permission.effects';

@NgModule({
  declarations: [PermissionTreeComponent],
  imports: [
    SharedModule,
    MatTreeModule,
    MatCheckboxModule,
    MatButtonModule,
    ReduxRegisterModule.forFeature('permissions', { store: PermissionStore }),
    EffectsModule.forFeature([PermissionEffects]),
  ],
  exports: [PermissionTreeComponent]
})
export class PermissionTreeModule { }
