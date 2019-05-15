import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { EditionService } from '../services/edition.service';
import { ofAction } from '@addapptables/ngrx-actions';
import {
  LoadEditions, CancelEditionRequest,
  EditionsLoaded, CreateEdition, EditionCreated, EditionActionError,
  UpdateEdition, EditionUpdated, DeleteEdition, EditionDeleted
} from '../actions/edition.actions';
import { switchMap, takeUntil, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { PaginatedModel } from '@redux/shared/models/paginated.model';
import { EditionDto } from '../models/edition-dto.model';

@Injectable()
export class EditionEffects {

  constructor(
    private _actions$: Actions,
    private _editionService: EditionService
  ) { }

  @Effect()
  loadData$ = this._actions$.pipe(
    ofAction(LoadEditions),
    switchMap((action) =>
      this._editionService.getAll(action.payload.filter).pipe(
        takeUntil(this._actions$.pipe(ofAction(CancelEditionRequest))),
        catchError(() => of(<PaginatedModel<EditionDto>>{ totalCount: 0, items: [] }))
      )
    ),
    map((result) => new EditionsLoaded({ editions: result.items, total: result.totalCount }))
  );

  @Effect()
  $create = this._actions$.pipe(
    ofAction(CreateEdition),
    switchMap((action) =>
      this._editionService.create(action.payload.edition).pipe(
        takeUntil(this._actions$.pipe(ofAction(CancelEditionRequest))),
        map((edition) => new EditionCreated({ edition })),
        catchError(() => of(new EditionActionError()))
      )
    )
  );

  @Effect()
  $update = this._actions$.pipe(
    ofAction(UpdateEdition),
    switchMap((action) =>
      this._editionService.update(action.payload.edition).pipe(
        takeUntil(this._actions$.pipe(ofAction(CancelEditionRequest))),
        map((edition) => new EditionUpdated({ edition })),
        catchError(() => of(new EditionActionError()))
      )
    )
  );

  @Effect()
  $delete = this._actions$.pipe(
    ofAction(DeleteEdition),
    switchMap((action) =>
      this._editionService.deleteEdition(action.payload.id).pipe(
        takeUntil(this._actions$.pipe(ofAction(CancelEditionRequest))),
        map(() => new EditionDeleted({ id: action.payload.id })),
        catchError(() => of(new EditionActionError()))
      )
    )
  );

}
