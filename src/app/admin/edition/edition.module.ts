import { NgModule } from '@angular/core';
import { EditionRoutingModule } from './edition-routing.module';
import { EditionLayoutComponent } from './components/edition-layout/edition-layout.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReduxRegisterModule } from '@addapptables/ngrx-actions';
import { EditionStore } from '@redux/edition/stores/edition.store';
import { EffectsModule } from '@ngrx/effects';
import { EditionEffects } from '@redux/edition/effects/edition.effects';
import { EditionActionService } from './services/edition-action.service';
import { EditionListComponent } from './components/edition-list/edition-list.component';
import { EditionFormComponent } from './components/edition-form/edition-form.component';
import { SharedFormsModule } from 'src/app/shared/shared-forms-module.module';
import { SharedModalModule } from 'src/app/shared/shared-modal-module.module';
import { SharedTablesModule } from 'src/app/shared/shared-tables-module.module';
import { MatCheckboxModule } from '@angular/material';
import { EditionFormModalComponent } from './components/edition-form-modal/edition-form-modal.component';
import { EditionTypePaySelectModule } from 'src/app/controls/selects/edition-type-pay-select/edition-type-pay-select.module';

@NgModule({
  declarations: [
    EditionLayoutComponent,
    EditionListComponent,
    EditionFormComponent,
    EditionFormModalComponent
  ],
  imports: [
    SharedModule,
    SharedFormsModule,
    SharedModalModule,
    SharedTablesModule,
    MatCheckboxModule,
    EditionRoutingModule,
    EditionTypePaySelectModule,
    ReduxRegisterModule.forFeature('edition', { store: EditionStore }),
    EffectsModule.forFeature([EditionEffects])
  ],
  entryComponents: [
    EditionFormModalComponent
  ],
  providers: [
    EditionActionService
  ]
})
export class EditionModule { }
