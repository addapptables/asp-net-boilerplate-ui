import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { ProfileService } from '../services/profile.service';
import { ofAction } from '@addapptables/ngrx-actions';
import {
  LoadProfile,
  CancelProfileRequest, ProfileLoaded,
  UpdateProfile, ProfileActionError, ProfileUpdated
} from '../actions/profile.actions';
import { switchMap, takeUntil, catchError, map, filter, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ProfileEffects {

  loading: boolean;

  constructor(
    private _actions$: Actions,
    private _profileService: ProfileService
  ) { }

  @Effect()
  loadProfile$ = this._actions$.pipe(
    ofAction(LoadProfile),
    filter(() => !this.loading),
    switchMap(() => {
      this.loading = true;
      return this._profileService.getProfile().pipe(
        takeUntil(this._actions$.pipe(ofAction(CancelProfileRequest))),
        finalize(() => this.loading = false),
        map((profile) => {
          return new ProfileLoaded({ profile });
        }),
        catchError(() => of(new CancelProfileRequest()))
      );
    }));

  @Effect()
  updateProfile$ = this._actions$.pipe(
    ofAction(UpdateProfile),
    switchMap((action) =>
      this._profileService.update(action.payload.profile).pipe(
        takeUntil(this._actions$.pipe(ofAction(CancelProfileRequest))),
        map((profile) => {
          return new ProfileUpdated({ profile });
        }),
        catchError(() => of(new ProfileActionError()))
      )
    )
  );

}
