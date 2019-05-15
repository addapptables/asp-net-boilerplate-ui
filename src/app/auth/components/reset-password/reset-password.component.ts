import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { UtilValidation } from 'src/app/shared/utils/util-validation';
import { ActivatedRoute, Router } from '@angular/router';
import { componentDestroyed } from 'src/app/shared/utils/component-destroyed';
import { takeUntil, tap, finalize } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { PasswordErrorStateMatcher } from 'src/app/shared/utils/error-state.util';
import { AccountService } from '@redux/account/services/account.service';
import { NotifierType, NotifierService } from '@addapptables/notifier';
import { TranslateService } from '@ngx-translate/core';
import { maxLengthPassword } from '@redux/user/user.const';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  maxLengthPassword = maxLengthPassword;

  form: FormGroup;

  savingSubject = new BehaviorSubject<boolean>(false);

  saving$ = this.savingSubject.asObservable();

  passwordMatcher = new PasswordErrorStateMatcher();

  constructor(
    _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private _accountService: AccountService,
    private _notifierService: NotifierService,
    private _translateService: TranslateService,
  ) {
    this.form = _fb.group({
      password: [undefined, [UtilValidation.required, Validators.maxLength(this.maxLengthPassword)]],
      repeatPassword: [undefined, UtilValidation.required],
      userId: [undefined, UtilValidation.required],
      resetCode: [undefined, UtilValidation.required]
    }, { validators: this.checkPasswords });
  }

  ngOnInit() {
    this._route.data.pipe(
      takeUntil(componentDestroyed(this)),
      tap((params) => {
        this.form.patchValue({ ...this.form.value, ...params.account });
      })
    ).subscribe();
  }

  checkPasswords(group: AbstractControl) {
    const password = group.get('password').value;
    const repeatPassword = group.get('repeatPassword').value;
    return password === repeatPassword ? null : { notSame: true };
  }

  resetPassword() {
    if (this.form.invalid) { return; }
    this.savingSubject.next(true);
    this._accountService.accountResetPassword(this.form.value).pipe(
      takeUntil(componentDestroyed(this)),
      finalize(() => this.savingSubject.next(false)),
    ).subscribe(() => {
      this._notifierService.open({
        type: NotifierType.success,
        message: this._translateService.instant('auth.resetedPasswordSuccessfully')
      });
      this._router.navigateByUrl('/');
    });
  }

  ngOnDestroy(): void { }

}
