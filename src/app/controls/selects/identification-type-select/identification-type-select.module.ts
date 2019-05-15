import { NgModule } from '@angular/core';
import { IdentificationTypeSelectComponent } from './identification-type-select.component';
import { MatSelectModule } from '@angular/material';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [IdentificationTypeSelectComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  exports: [IdentificationTypeSelectComponent]
})
export class IdentificationTypeSelectModule { }
