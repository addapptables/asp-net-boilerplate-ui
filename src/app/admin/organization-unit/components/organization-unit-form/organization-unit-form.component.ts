import { Component, OnInit, ChangeDetectionStrategy, Injector, Input } from '@angular/core';
import { FormBase } from 'src/app/shared/forms/form-base';
import {
  selectOrganizationUnitLoadingAction,
  selectOrganizationUnitActionState
} from '@redux/organization-unit/selectors/organization-unit.selector';
import {
  OrganizationUnitActionComplete,
  UpdateOrganizationUnit,
  CreateOrganizationUnit
} from '@redux/organization-unit/actions/organization-unit.actions';
import { FormGroup, Validators } from '@angular/forms';
import { OrganizationUnitDto } from '@redux/organization-unit/models/organization-unit-dto.model';
import { UtilValidation } from 'src/app/shared/utils/util-validation';

@Component({
  selector: 'app-organization-unit-form',
  templateUrl: './organization-unit-form.component.html',
  styleUrls: ['./organization-unit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganizationUnitFormComponent extends FormBase implements OnInit {

  readonly maxDisplayNameLength = 128;

  formGroup: FormGroup;

  @Input()
  organizationUnitDto: OrganizationUnitDto;

  constructor(
    injector: Injector
  ) {
    super(injector, selectOrganizationUnitLoadingAction, selectOrganizationUnitActionState, new OrganizationUnitActionComplete());
  }

  ngOnInit() {
    super.ngOnInit();
    this.formGroup = this._fb.group({
      id: [this.organizationUnitDto.id],
      displayName: [this.organizationUnitDto.displayName, [UtilValidation.required, Validators.maxLength(this.maxDisplayNameLength)]],
      parentId: [this.organizationUnitDto.parentId]
    });
  }

  submit() {
    if (this.formGroup.invalid) { return; }
    const organizationUnitDto = this.formGroup.value;
    if (organizationUnitDto.id) {
      this._store.dispatch(new UpdateOrganizationUnit({ organizationUnit: organizationUnitDto }));
    } else {
      this._store.dispatch(new CreateOrganizationUnit({ organizationUnit: organizationUnitDto }));
    }
  }
}
