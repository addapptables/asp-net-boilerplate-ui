import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ContactDto } from '@redux/contact/models/contact-dto';

@Component({
  selector: 'app-contact-form-modal',
  templateUrl: './contact-form-modal.component.html',
  styleUrls: ['./contact-form-modal.component.scss']
})
export class ContactFormModalComponent {

  constructor(
    private _dialogRef: MatDialogRef<ContactFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public contactDto: ContactDto
  ) { }

  close() {
    this._dialogRef.close();
  }

}
