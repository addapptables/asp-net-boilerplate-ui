import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedModalModule } from 'src/app/shared/shared-modal-module.module';
import { SharedFormsModule } from 'src/app/shared/shared-forms-module.module';
import { SharedTablesModule } from 'src/app/shared/shared-tables-module.module';
import { ContactLayoutComponent } from './components/contact-layout/contact-layout.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ContactFormModalComponent } from './components/contact-form-modal/contact-form-modal.component';
import { ContactRoutingModule } from './contact-routing.module';
import { ContactActionService } from './services/contact-action.service';
import { ReduxRegisterModule } from '@addapptables/ngrx-actions';
import { EffectsModule } from '@ngrx/effects';
import { ContactStore } from '@redux/contact/stores/contact.store';
import { ContactEffects } from '@redux/contact/effects/contact.effects';
import { MatCheckboxModule, MatSelectModule, MatTooltipModule } from '@angular/material';
import { IdentificationTypeSelectModule } from 'src/app/controls/selects/identification-type-select/identification-type-select.module';
import { ContactListSearchComponent } from './components/contact-list/components/contact-list-search/contact-list-search.component';

@NgModule({
  declarations: [ContactLayoutComponent, ContactListComponent, ContactFormComponent, ContactFormModalComponent, ContactListSearchComponent],
  imports: [
    SharedModule,
    SharedModalModule,
    SharedFormsModule,
    SharedTablesModule,
    ContactRoutingModule,
    MatCheckboxModule,
    IdentificationTypeSelectModule,
    MatSelectModule,
    MatTooltipModule,
    ReduxRegisterModule.forFeature('contact', { store: ContactStore }),
    EffectsModule.forFeature([ContactEffects])
  ],
  entryComponents: [
    ContactFormModalComponent
  ],
  providers: [
    ContactActionService
  ]
})
export class ContactModule { }
