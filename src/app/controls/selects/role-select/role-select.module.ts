import { NgModule } from '@angular/core';
import { RoleSelectComponent } from './role-select.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReduxRegisterModule } from '@addapptables/ngrx-actions';
import { RoleMinimalStore } from '@redux/role/stores/role-minimal.store';
import { EffectsModule } from '@ngrx/effects';
import { RoleMinimalEffects } from '@redux/role/effects/role-minimal.effects';
import { MatSelectModule, MatFormFieldModule } from '@angular/material';

@NgModule({
  declarations: [
    RoleSelectComponent
  ],
  imports: [
    SharedModule,
    MatSelectModule,
    MatFormFieldModule,
    ReduxRegisterModule.forFeature('roleMinimal', { store: RoleMinimalStore }),
    EffectsModule.forFeature([RoleMinimalEffects])
  ],
  exports: [RoleSelectComponent]
})
export class RoleSelectModule { }
