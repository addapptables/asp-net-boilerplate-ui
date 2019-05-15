import { Action } from '@ngrx/store';
import { EditionMinimalDto } from '../models/edition-minimal-dto.model';

export enum EditionMinimalActionTypes {
  LoadEditionMinimals = '[EditionMinimal] Load EditionMinimals',
  EditionMinimalsLoaded = '[EditionMinimal] EditionMinimals Loaded',
  CancelEditionMinimalsRequest = '[Edition] Cancel EditionMinimals Request',
  EditionMinimalClearStore = '[Edition] Edition Minimal Clear Store'
}

export class LoadEditionMinimals implements Action {
  readonly type = EditionMinimalActionTypes.LoadEditionMinimals;
}

export class EditionMinimalsLoaded implements Action {
  readonly type = EditionMinimalActionTypes.EditionMinimalsLoaded;
  constructor(public payload: { editions: EditionMinimalDto[] }) { }
}

export class CancelEditionMinimalsRequest implements Action {
  readonly type = EditionMinimalActionTypes.CancelEditionMinimalsRequest;
}

export class EditionMinimalClearStore implements Action {
  readonly type = EditionMinimalActionTypes.EditionMinimalClearStore;
}
