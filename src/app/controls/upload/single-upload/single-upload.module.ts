import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatButtonModule, MatFormFieldModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { SingleUploadComponent } from './single-upload.component';

@NgModule({
  declarations: [SingleUploadComponent],
  imports: [
    SharedModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule
  ],
  exports: [
    SingleUploadComponent
  ]
})
export class SingleUploadModule { }
