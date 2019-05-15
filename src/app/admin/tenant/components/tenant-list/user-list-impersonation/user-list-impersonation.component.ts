import { Component, ChangeDetectionStrategy, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserDto } from '@redux/user/models/user-dto.model';
import { AccountService } from '@redux/account/services/account.service';
import { switchMap, tap, takeUntil } from 'rxjs/operators';
import { AuthService } from '@redux/auth/services/auth.service';
import { AppSessionService } from '@addapptable/components/addapptables-boilerplate/services/app-session.service';
import { Router } from '@angular/router';
import { componentDestroyed } from 'src/app/shared/utils/component-destroyed';
import { BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { AddapptableState } from 'src/app/reducres';
import { UserClearStore } from '@redux/user/actions/user.actions';

@Component({
  selector: 'app-user-list-impersonation',
  templateUrl: './user-list-impersonation.component.html',
  styleUrls: ['./user-list-impersonation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListImpersonationComponent implements OnDestroy {

  saveSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

  saving$ = this.saveSubject.asObservable();

  constructor(
    private _dialogRef: MatDialogRef<UserListImpersonationComponent>,
    private _store: Store<AddapptableState>,
    @Inject(MAT_DIALOG_DATA) public tenantId: number,
    private _accountService: AccountService,
    private _authService: AuthService,
    private _sessionService: AppSessionService,
    private _router: Router
  ) { }

  close() {
    this._dialogRef.close();
  }

  impersonation(user: UserDto) {
    this.saveSubject.next(true);
    this._accountService.impersonate({ UserId: user.id, tenantId: this.tenantId }).pipe(
      takeUntil(componentDestroyed(this)),
      switchMap((result) => {
        this._authService.setTenantCookie(this.tenantId);
        return this._authService.impersonatedAuthenticate(result.impersonationToken).pipe(
          switchMap(() => {
            return this._sessionService.init().pipe(
              tap(() => {
                this.saveSubject.next(false);
                this.close();
                this._router.navigate(['admin/profile']);
              })
            );
          })
        );
      }
      )
    ).subscribe();
  }

  ngOnDestroy(): void {
    this._store.dispatch(new UserClearStore());
  }

}
