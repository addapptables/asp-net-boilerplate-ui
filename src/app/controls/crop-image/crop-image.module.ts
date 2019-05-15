import { NgModule } from '@angular/core';
import { CropImageComponent } from './components/crop-image/crop-image.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ImageCropperModule } from 'ngx-img-cropper';
import { SingleUploadModule } from '../upload/single-upload/single-upload.module';

@NgModule({
  declarations: [CropImageComponent],
  imports: [
    SharedModule,
    SingleUploadModule,
    ImageCropperModule
  ],
  exports: [
    CropImageComponent
  ]
})
export class CropImageModule { }
