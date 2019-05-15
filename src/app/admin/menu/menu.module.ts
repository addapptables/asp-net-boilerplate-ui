import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { MenuComponent } from './menu.component';
import { EffectsModule } from '@ngrx/effects';
import { ReduxRegisterModule } from '@addapptables/ngrx-actions';
import { MenuModule as AddapptableMenuModule } from '@addapptables/menu';
import { MenuStore } from '@redux/menu/stores/menu.store';
import { MenuEffects } from '@redux/menu/effects/menu.effects';

@NgModule({
  imports: [
    SharedModule,
    ReduxRegisterModule.forFeature('menu', { sidebar: MenuStore }),
    EffectsModule.forFeature([MenuEffects]),
    AddapptableMenuModule
  ],
  declarations: [MenuComponent],
  exports: [MenuComponent]
})
export class MenuModule { }
