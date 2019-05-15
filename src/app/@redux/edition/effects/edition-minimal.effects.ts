import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { EditionService } from '../services/edition.service';
import { ofAction } from '@addapptables/ngrx-actions';
import { LoadEditionMinimals, CancelEditionMinimalsRequest, EditionMinimalsLoaded } from '../actions/edition-minimal.actions';
import { switchMap, takeUntil, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class EditionMinimalEffects {

  constructor(
    private _actions$: Actions,
    private _editionService: EditionService
  ) { }

  @Effect()
  $load = this._actions$.pipe(
    ofAction(LoadEditionMinimals),
    switchMap(() =>
      this._editionService.getAllMinimal().pipe(
        takeUntil(this._actions$.pipe(ofAction(CancelEditionMinimalsRequest))),
        map(result => new EditionMinimalsLoaded({ editions: result })),
        catchError(() => of(new CancelEditionMinimalsRequest()))
      )
    )
  );

}
