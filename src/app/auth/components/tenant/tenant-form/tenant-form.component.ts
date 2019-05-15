import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AccountService } from '@redux/account/services/account.service';
import { finalize, tap, takeUntil } from 'rxjs/operators';
import { componentDestroyed } from 'src/app/shared/utils/component-destroyed';
import { TenantActionService } from '../services/tenant-action.service';
import { AppSessionService } from '@addapptable/components/addapptables-boilerplate/services/app-session.service';
import { TenantAvailabilityState } from '@redux/account/models/tenant-available-enum';

@Component({
  selector: 'app-tenant-form',
  templateUrl: './tenant-form.component.html',
  styleUrls: ['./tenant-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TenantFormComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;

  savingSubject = new BehaviorSubject<boolean>(false);

  saving$ = this.savingSubject.asObservable();

  @Output()
  save = new EventEmitter();

  constructor(
    private _fb: FormBuilder,
    private _accountService: AccountService,
    private _tenantActionService: TenantActionService,
    private _sessionService: AppSessionService
  ) { }

  ngOnInit() {
    this.formGroup = this._fb.group({
      tenancyName: [null, [Validators.maxLength(64)]]
    });
  }

  changeTenant() {
    if (this.formGroup.invalid) { return; }
    this.savingSubject.next(true);
    if (!this.formGroup.value.tenancyName) {
      this.changeToHost();
      return;
    }
    this.changeToTenant();
  }

  changeToTenant() {
    this._accountService.isTenantAvailable(this.formGroup.value).pipe(
      takeUntil(componentDestroyed(this)),
      finalize(() => this.savingSubject.next(false)),
      tap(tenant => {
        const isChanged = this._tenantActionService.changeTenant(tenant, this.formGroup.value.tenancyName);
        if (isChanged) {
          this.initSession();
        }
      })
    ).subscribe();
  }

  changeToHost() {
    this._tenantActionService.changeTenant({
      state: TenantAvailabilityState.Available,
      tenantId: undefined
    }, this.formGroup.value.tenancyName);
    this.initSession();
  }

  initSession() {
    this._sessionService.init().pipe(
      takeUntil(componentDestroyed(this)),
      finalize(() => this.savingSubject.next(false)),
      tap(() => this.save.emit())
    ).subscribe();
  }

  ngOnDestroy(): void { }
}
