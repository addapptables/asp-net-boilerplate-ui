import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@redux/auth/services/auth.service';
import { switchMap, finalize, tap, takeUntil } from 'rxjs/operators';
import { AppSessionService } from '@addapptable/components/addapptables-boilerplate/services/app-session.service';
import { BehaviorSubject } from 'rxjs';
import { componentDestroyed } from 'src/app/shared/utils/component-destroyed';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent implements OnDestroy {

  form: FormGroup;

  saveSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

  saving$ = this.saveSubject.asObservable();

  constructor(
    _fb: FormBuilder,
    private readonly _router: Router,
    private _authService: AuthService,
    private _sessionService: AppSessionService
  ) {
    this.form = _fb.group({
      userNameOrEmailAddress: [null, [Validators.required]],
      password: [null, [Validators.required]],
      rememberClient: [false]
    });
  }

  login() {
    if (this.form.invalid) { return; }
    this.saveSubject.next(true);
    this._authService.authenticate(this.form.value).pipe(
      takeUntil(componentDestroyed(this)),
      switchMap(() => this._sessionService.init()),
      finalize(() => this.saveSubject.next(false)),
      tap(() => this._router.navigate(['/admin']))
    ).subscribe();
  }

  ngOnDestroy(): void { }
}
