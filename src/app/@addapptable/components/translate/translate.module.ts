import { NgModule } from '@angular/core';
import { TranslateComponent } from './translate.component';
import { MatButtonModule, MatMenuModule } from '@angular/material';
import { EffectsModule } from '@ngrx/effects';
import { TranslateEffect } from './effects/translate.effects';
import { TranslateStore } from './stores/translate.store';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReduxRegisterModule } from '@addapptables/ngrx-actions';

@NgModule({
  imports: [
    SharedModule,
    MatButtonModule,
    MatMenuModule,
    ReduxRegisterModule.forFeature('translate', { 'languages': TranslateStore }),
    EffectsModule.forFeature([TranslateEffect]),
  ],
  declarations: [TranslateComponent],
  exports: [TranslateComponent]
})
export class TranslateModule { }
