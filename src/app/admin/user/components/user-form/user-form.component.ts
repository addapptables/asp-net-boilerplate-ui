import { Component, OnInit, ChangeDetectionStrategy, Input, Injector } from '@angular/core';
import { UserDto } from '@redux/user/models/user-dto.model';
import { FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UtilValidation } from 'src/app/shared/utils/util-validation';
import { FormBase } from 'src/app/shared/forms/form-base';
import { selectUserLoadingAction, selectUserActionState } from '@redux/user/selectors/user.selector';
import { UserActionComplete, CreateUser, UpdateUser } from '@redux/user/actions/user.actions';
import { CreateUserDto } from '@redux/user/models/create-user-dto.model';
import { UpdateUserDto } from '@redux/user/models/update-user-dto.model';
import { PasswordErrorStateMatcher } from 'src/app/shared/utils/error-state.util';
import { maxLengthLargeSize, maxLengthSmallSize, maxLengthPassword } from '@redux/user/user.const';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormComponent extends FormBase implements OnInit {

  maxLengthLargeSize = maxLengthLargeSize;

  maxLengthSmallSize = maxLengthSmallSize;

  maxLengthPassword = maxLengthPassword;

  formGroup: FormGroup;

  passwordMatcher = new PasswordErrorStateMatcher();

  @Input()
  userDto: UserDto;

  constructor(
    injector: Injector
  ) {
    super(injector, selectUserLoadingAction, selectUserActionState, new UserActionComplete());
  }

  ngOnInit() {
    super.ngOnInit();
    if (!this.userDto) { this.userDto = <UserDto>{}; }
    this.formGroup = this._fb.group({
      userName: [this.userDto.userName, [UtilValidation.required, Validators.maxLength(this.maxLengthLargeSize)]],
      name: [this.userDto.name, [UtilValidation.required, Validators.maxLength(this.maxLengthSmallSize)]],
      surname: [this.userDto.surname, [UtilValidation.required, Validators.maxLength(this.maxLengthSmallSize)]],
      emailAddress: [this.userDto.emailAddress, [UtilValidation.required, Validators.email, Validators.maxLength(this.maxLengthLargeSize)]],
      groupPassword: this._fb.group({
        password: [null, Validators.maxLength(this.maxLengthPassword)],
        repeatPassword: [null, Validators.maxLength(this.maxLengthPassword)],
      }, { validators: this.checkPasswords }),
      roleNames: [this.userDto.roleNames],
      isActive: [true],
      id: [this.userDto.id]
    });
  }

  checkPasswords(group: AbstractControl) {
    const password = group.get('password').value;
    const repeatPassword = group.get('repeatPassword').value;
    return password === repeatPassword ? null : { notSame: true };
  }

  submit() {
    if (this.formGroup.invalid) { return; }
    let userDto = { ...this.formGroup.value };
    userDto = { ...userDto, password: userDto.groupPassword.password };
    delete userDto.groupPassword;
    if (userDto.id) {
      this._update(userDto);
    } else {
      this._create(userDto);
    }
  }

  private _create(user: CreateUserDto) {
    this._store.dispatch(new CreateUser({ user }));
  }

  private _update(user: UpdateUserDto) {
    this._store.dispatch(new UpdateUser({ user }));
  }

}
