import { NgModule } from '@angular/core';
import { EditionSelectComponent } from './edition-select.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSelectModule, MatFormFieldModule } from '@angular/material';
import { ReduxRegisterModule } from '@addapptables/ngrx-actions';
import { EditionMinimalStore } from '@redux/edition/stores/edition-minimal.store';
import { EditionMinimalEffects } from '@redux/edition/effects/edition-minimal.effects';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [EditionSelectComponent],
  imports: [
    SharedModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    ReduxRegisterModule.forFeature('editionMinimal', { store: EditionMinimalStore }),
    EffectsModule.forFeature([EditionMinimalEffects])
  ],
  exports: [EditionSelectComponent]
})
export class EditionSelectModule { }
