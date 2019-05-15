import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UtilValidation } from 'src/app/shared/utils/util-validation';
import { AccountService } from '@redux/account/services/account.service';
import { takeUntil, finalize } from 'rxjs/operators';
import { componentDestroyed } from 'src/app/shared/utils/component-destroyed';
import { NotifierService, NotifierType } from '@addapptables/notifier';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotPasswordComponent implements OnDestroy {

  form: FormGroup;

  savingSubject = new BehaviorSubject<boolean>(false);

  saving$ = this.savingSubject.asObservable();

  constructor(
    _fb: FormBuilder,
    private _accountService: AccountService,
    private _notifierService: NotifierService,
    private _translateService: TranslateService,
    private _router: Router
  ) {
    this.form = _fb.group({
      userNameOrEmail: ['', UtilValidation.required]
    });
  }

  sendPasswordResetCode() {
    if (this.form.invalid) { return; }
    this.savingSubject.next(true);
    this._accountService.sendPasswordResetCode(this.form.value).pipe(
      takeUntil(componentDestroyed(this)),
      finalize(() => this.savingSubject.next(false)),
    ).subscribe(() => {
      this._notifierService.open({
        type: NotifierType.success,
        message: this._translateService.instant('auth.sendEmailRecoverPassword')
      });
      this._router.navigateByUrl('/');
    });
  }

  ngOnDestroy(): void { }
}
