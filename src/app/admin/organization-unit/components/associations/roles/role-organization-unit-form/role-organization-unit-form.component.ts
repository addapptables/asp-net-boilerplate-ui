import { Component, OnInit, ChangeDetectionStrategy, Input, Injector } from '@angular/core';
import { FormBase } from 'src/app/shared/forms/form-base';
import { FormGroup, Validators } from '@angular/forms';
import { selectRoleOrganizationUnitLoadingAction, selectRoleOrganizationUnitActionState } from '@redux/organization-unit/selectors/role-organization-unit.selector';
import { RoleOrganizationUnitActionComplete, AddRolesToOrganizationUnit } from '@redux/organization-unit/actions/role-organization-unit.actions';
import { UtilValidation } from 'src/app/shared/utils/util-validation';
import { AssociationRoleToOrganizationUnitSelect } from 'src/app/admin/organization-unit/models/association-role-to-organization-unit-select.model';

@Component({
  selector: 'app-role-organization-unit-form',
  templateUrl: './role-organization-unit-form.component.html',
  styleUrls: ['./role-organization-unit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoleOrganizationUnitFormComponent extends FormBase implements OnInit {

  @Input()
  organizationUnitId: number;

  rolesSelected: number[] = [];

  formGroup: FormGroup;

  constructor(
    injector: Injector
  ) {
    super(injector, selectRoleOrganizationUnitLoadingAction, selectRoleOrganizationUnitActionState, new RoleOrganizationUnitActionComplete());
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.formGroup = this._fb.group({
      organizationUnitId: [this.organizationUnitId, [Validators.required]],
      roleIds: [null, [UtilValidation.minLengthArray(1)]]
    });
  }

  onRolesSelected($event: AssociationRoleToOrganizationUnitSelect[]) {
    this.rolesSelected = $event.map(x => x.id);
    this.formGroup.get('roleIds').patchValue(this.rolesSelected);
  }

  submit() {
    if (this.formGroup.invalid) { return; }
    this._store.dispatch(new AddRolesToOrganizationUnit({ input: this.formGroup.value }));
  }
}
