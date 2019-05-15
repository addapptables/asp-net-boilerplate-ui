import { Component, ChangeDetectionStrategy, Input, OnInit, Injector } from '@angular/core';
import { AssociationUserOrganizationUnitSelect } from 'src/app/admin/organization-unit/models/association-user-organization-unit-select.model';
import { FormGroup, Validators } from '@angular/forms';
import { UtilValidation } from 'src/app/shared/utils/util-validation';
import { FormBase } from 'src/app/shared/forms/form-base';
import { selectUserOrganizationUnitLoadingAction, selectUserOrganizationUnitActionState } from '@redux/organization-unit/selectors/user-organization-unit.selector';
import { UserOrganizationUnitActionComplete, AddUsersToOrganizationUnit } from '@redux/organization-unit/actions/user-organization-unit.actions';

@Component({
  selector: 'app-user-organization-unit-form',
  templateUrl: './user-organization-unit-form.component.html',
  styleUrls: ['./user-organization-unit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserOrganizationUnitFormComponent extends FormBase implements OnInit {

  @Input()
  organizationUnitId: number;

  usersSelected: number[] = [];

  formGroup: FormGroup;

  constructor(
    injector: Injector
  ) {
    super(injector, selectUserOrganizationUnitLoadingAction, selectUserOrganizationUnitActionState, new UserOrganizationUnitActionComplete());
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.formGroup = this._fb.group({
      organizationUnitId: [this.organizationUnitId, [Validators.required]],
      userIds: [null, [UtilValidation.minLengthArray(1)]]
    });
  }

  onUsersSelected($event: AssociationUserOrganizationUnitSelect[]) {
    this.usersSelected = $event.map(x => x.id);
    this.formGroup.get('userIds').patchValue(this.usersSelected);
  }

  submit() {
    if (this.formGroup.invalid) { return; }
    this._store.dispatch(new AddUsersToOrganizationUnit({ input: this.formGroup.value }));
  }

}
