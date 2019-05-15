import { Component, OnInit, ChangeDetectionStrategy, Injector } from '@angular/core';
import { maxLengthLargeSize, maxLengthSmallSize, maxLengthPassword } from '@redux/user/user.const';
import { FormGroup, Validators } from '@angular/forms';
import { FormBase } from 'src/app/shared/forms/form-base';
import {
  selectProfileLoadingAction,
  selectProfileActionState,
  selectProfile,
  selectProfileLoading
} from '@redux/profile/selectors/profile.selector';
import { ProfileActionComplete, LoadProfile, UpdateProfile } from '@redux/profile/actions/profile.actions';
import { UtilValidation } from 'src/app/shared/utils/util-validation';
import { SingleSourceBase } from 'src/app/shared/services/single-soruce-base';
import { tap, takeUntil } from 'rxjs/operators';
import { componentDestroyed } from 'src/app/shared/utils/component-destroyed';
import { ActionType } from '@redux/shared/models/action-type.model';
import { AppSessionService } from '@addapptable/components/addapptables-boilerplate/services/app-session.service';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileFormComponent extends FormBase implements OnInit {

  maxLengthLargeSize = maxLengthLargeSize;

  maxLengthSmallSize = maxLengthSmallSize;

  maxLengthPassword = maxLengthPassword;

  formGroup: FormGroup;

  constructor(
    injector: Injector,
    private _sessionService: AppSessionService
  ) {
    super(injector, selectProfileLoadingAction, selectProfileActionState, new ProfileActionComplete());
  }

  ngOnInit() {
    super.ngOnInit();
    this.formGroup = this._fb.group({
      userName: [null, [UtilValidation.required, Validators.maxLength(this.maxLengthLargeSize)]],
      name: [null, [UtilValidation.required, Validators.maxLength(this.maxLengthSmallSize)]],
      surname: [null, [UtilValidation.required, Validators.maxLength(this.maxLengthSmallSize)]],
      emailAddress: [null, [UtilValidation.required, Validators.email, Validators.maxLength(this.maxLengthLargeSize)]],
      profilePictureBase64: [null]
    });
    this._loadCurrentUser();
    this._hearActionSuccess();
  }

  private _loadCurrentUser() {
    const sourceBase = new SingleSourceBase(this._store, selectProfile, new LoadProfile(), selectProfileLoading);
    sourceBase.ngOnInit();
    sourceBase.result$.pipe(
      takeUntil(componentDestroyed(this)),
      tap(user => {
        this.formGroup.patchValue(user);
      })
    ).subscribe();
  }

  private _hearActionSuccess() {
    this.actionState$.pipe(
      takeUntil(componentDestroyed(this)),
      tap((result) => {
        if (result === ActionType.success) {
          this._sessionService.init().pipe(
            takeUntil(componentDestroyed(this))
          ).subscribe();
        }
      })
    ).subscribe();
  }

  submit() {
    if (this.formGroup.invalid) { return; }
    this._store.dispatch(new UpdateProfile({ profile: this.formGroup.value }));
  }
}
