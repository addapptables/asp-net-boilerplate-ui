import { Component, ChangeDetectionStrategy, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngrx/store';
import { AddapptableState } from 'src/app/reducres';
import { AssociateUserOrganizationUnitClearStore } from '@redux/organization-unit/actions/associate-user-organization-unit.actions';

@Component({
  selector: 'app-user-organization-unit-form-modal',
  templateUrl: './user-organization-unit-form-modal.component.html',
  styleUrls: ['./user-organization-unit-form-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserOrganizationUnitFormModalComponent implements OnDestroy {

  constructor(
    private _store: Store<AddapptableState>,
    private _dialogRef: MatDialogRef<UserOrganizationUnitFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public organizationUnitId: number
  ) { }

  close() {
    this._dialogRef.close();
  }

  ngOnDestroy(): void {
    this._store.dispatch(new AssociateUserOrganizationUnitClearStore());
  }

}
