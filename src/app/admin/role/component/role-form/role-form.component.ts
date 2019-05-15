import { Component, OnInit, Input, ChangeDetectionStrategy, Injector } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { UtilValidation } from 'src/app/shared/utils/util-validation';
import { CreateRoleDto } from '@redux/role/models/create-role-dto';
import { CreateRole, UpdateRole, RoleActionComplete } from '@redux/role/actions/role.actions';
import { FormBase } from 'src/app/shared/forms/form-base';
import { selectRoleLoadingAction, selectRoleActionState, } from '@redux/role/selectors/role.selector';
import { RoleEditDto } from '@redux/role/models/role-edit-dto';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoleFormComponent extends FormBase implements OnInit {

  readonly maxLength = 32;

  readonly maxLengthDescription = 5000;

  formFirstStep: FormGroup;

  formFinalStep: FormGroup;

  @Input()
  roleDto: RoleEditDto;

  constructor(injector: Injector) {
    super(injector, selectRoleLoadingAction, selectRoleActionState, new RoleActionComplete());
  }

  ngOnInit() {
    super.ngOnInit();
    this._initFirstStep();
    this._initFinalStep();
  }

  private _initFirstStep() {
    this.formFirstStep = this._fb.group({
      name: [this.roleDto.name, [UtilValidation.required, Validators.maxLength(this.maxLength)]],
      description: [this.roleDto.description, [Validators.maxLength(this.maxLengthDescription)]]
    });
  }

  private _initFinalStep() {
    this.formFinalStep = this._fb.group({
      permissions: [this.roleDto.permissions]
    });
  }

  submit() {
    const roleDto = { id: this.roleDto.id, ...this.formFirstStep.value, ...this.formFinalStep.value };
    if (roleDto.id) {
      this._update(roleDto);
    } else {
      this._create(roleDto);
    }
  }

  private _create(role: CreateRoleDto) {
    this._store.dispatch(new CreateRole({ role }));
  }

  private _update(role: RoleEditDto) {
    this._store.dispatch(new UpdateRole({ role }));
  }

}
