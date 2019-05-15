import { Component, ChangeDetectionStrategy, OnDestroy, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddapptableState } from 'src/app/reducres';
import { AssociateUserOrganizationUnitClearStore } from '@redux/organization-unit/actions/associate-user-organization-unit.actions';

@Component({
  selector: 'app-role-organization-unit-form-modal',
  templateUrl: './role-organization-unit-form-modal.component.html',
  styleUrls: ['./role-organization-unit-form-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoleOrganizationUnitFormModalComponent implements OnDestroy {

  constructor(
    private _store: Store<AddapptableState>,
    private _dialogRef: MatDialogRef<RoleOrganizationUnitFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public organizationUnitId: number
  ) { }

  close() {
    this._dialogRef.close();
  }

  ngOnDestroy(): void {
    this._store.dispatch(new AssociateUserOrganizationUnitClearStore());
  }

}
