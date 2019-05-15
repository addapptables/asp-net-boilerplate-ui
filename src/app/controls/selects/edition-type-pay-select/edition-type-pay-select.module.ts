import { NgModule } from '@angular/core';
import { EditionTypePaySelectComponent } from './edition-type-pay-select.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSelectModule, MatFormFieldModule } from '@angular/material';

@NgModule({
  declarations: [EditionTypePaySelectComponent],
  imports: [
    SharedModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  exports: [EditionTypePaySelectComponent]
})
export class EditionTypePaySelectModule { }
