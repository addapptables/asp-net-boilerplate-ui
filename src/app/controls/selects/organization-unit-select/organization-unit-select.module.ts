import { NgModule } from '@angular/core';
import { OrganizationUnitSelectComponent } from './organization-unit-select.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSelectModule, MatFormFieldModule } from '@angular/material';
import { ReduxRegisterModule } from '@addapptables/ngrx-actions';
import { OrganizationUnitMinimalStore } from '@redux/organization-unit/stores/organization-unit-minimal.store';
import { EffectsModule } from '@ngrx/effects';
import { OrganizationUnitMinimalEffects } from '@redux/organization-unit/effects/organization-unit-minimal.effects';

@NgModule({
  declarations: [
    OrganizationUnitSelectComponent
  ],
  imports: [
    SharedModule,
    MatSelectModule,
    MatFormFieldModule,
    ReduxRegisterModule.forFeature('organizationUnitMinimal', { store: OrganizationUnitMinimalStore }),
    EffectsModule.forFeature([OrganizationUnitMinimalEffects])
  ],
  exports: [
    OrganizationUnitSelectComponent
  ]
})
export class OrganizationUnitSelectModule { }
