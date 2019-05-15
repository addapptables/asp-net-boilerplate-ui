import { Component, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-single-upload',
  templateUrl: './single-upload.component.html',
  styleUrls: ['./single-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleUploadComponent {

  name: string;

  file: File;

  @Output()
  selectFile = new EventEmitter<File>();

  constructor() { }

  changeFile($event) {
    if ($event.target.files[0] !== undefined) {
      const file = <File>$event.target.files[0];
      if (file.type.includes('image')) {
        this.file = file;
        this.name = this.file.name;
        this.selectFile.emit(file);
      }
    }
  }
}
