import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { AppSessionService } from '@addapptable/components/addapptables-boilerplate/services/app-session.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, takeUntil, switchMap, tap } from 'rxjs/operators';
import { AccountService } from '@redux/account/services/account.service';
import { AuthService } from '@redux/auth/services/auth.service';
import { componentDestroyed } from 'src/app/shared/utils/component-destroyed';
import { Router } from '@angular/router';
import { AddapptableState } from 'src/app/reducres';
import { Store } from '@ngrx/store';
import { ProfileClearStore } from '@redux/profile/actions/profile.actions';
import { ITenantLoginInfoDto } from '@addapptable/components/addapptables-boilerplate/models/tenant-login.model';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent implements OnInit, OnDestroy {

  isImpersonatedLogin$: Observable<boolean>;

  saveSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

  saving$ = this.saveSubject.asObservable();

  tenant$: Observable<ITenantLoginInfoDto>;

  constructor(
    private _store: Store<AddapptableState>,
    private _sessionService: AppSessionService,
    private _accountService: AccountService,
    private _authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.tenant$ = this._sessionService.tenantObservable;
    this.isImpersonatedLogin$ = this._sessionService.loginInformationObservable.pipe(
      map((result) => result.impersonatorUserId > 0)
    );
  }

  backToMyAccount() {
    this.saveSubject.next(true);
    this._accountService.backToImpersonator().pipe(
      takeUntil(componentDestroyed(this)),
      switchMap((result) => {
        this._authService.setTenantCookie(this._sessionService.loginInformation.impersonatorTenantId);
        return this._authService.impersonatedAuthenticate(result.impersonationToken).pipe(
          switchMap(() => {
            return this._sessionService.init().pipe(
              tap(() => {
                this._store.dispatch(new ProfileClearStore());
                this.saveSubject.next(false);
                this._router.navigate(['admin/profile']);
              })
            );
          })
        );
      })
    ).subscribe();
  }

  ngOnDestroy(): void { }

}
