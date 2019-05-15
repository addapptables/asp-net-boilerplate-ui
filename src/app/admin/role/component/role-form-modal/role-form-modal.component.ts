import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RoleEditDto } from '@redux/role/models/role-edit-dto';

@Component({
  selector: 'app-role-form-modal',
  templateUrl: './role-form-modal.component.html',
  styleUrls: ['./role-form-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoleFormModalComponent {

  constructor(
    private _dialogRef: MatDialogRef<RoleFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public roleDto: RoleEditDto
  ) { }

  close() {
    this._dialogRef.close();
  }

}
