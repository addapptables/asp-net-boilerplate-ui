import { Action } from '@ngrx/store';
import { EditionDto } from '../models/edition-dto.model';
import { GetEditionDto } from '../models/get-edition-dto.model';
import { CreateEditionDto } from '../models/create-edition-dto.model';
import { UpdateEditionDto } from '../models/update-edition-dto.model';

export enum EditionActionTypes {
  LoadEditions = '[Edition] Load Editions',
  EditionsLoaded = '[Edition] Editions Loaded',
  CreateEdition = '[Edition] Create Edition',
  EditionCreated = '[Edition] Edition Created',
  UpdateEdition = '[Edition] Update Edition',
  EditionUpdated = '[Edition] Edition Updated',
  DeleteEdition = '[Edition] Delete Edition',
  EditionDeleted = '[Edition] Edition Deleted',
  EditionActionComplete = '[Edition] Edition Action Complete',
  EditionActionError = '[Edition] Edition Action Error',
  editionClearStore = '[Edition] Edition Clear Store',
  CancelEditionRequest = '[Edition] Cancel Edition Request',
}

export class CancelEditionRequest implements Action {
  readonly type = EditionActionTypes.CancelEditionRequest;
}

export class EditionClearStore implements Action {
  readonly type = EditionActionTypes.editionClearStore;
}

export class EditionActionError implements Action {
  readonly type = EditionActionTypes.EditionActionError;
}

export class EditionActionComplete implements Action {
  readonly type = EditionActionTypes.EditionActionComplete;
}

export class EditionDeleted implements Action {
  readonly type = EditionActionTypes.EditionDeleted;
  constructor(public payload: { id: number }) { }
}

export class DeleteEdition implements Action {
  readonly type = EditionActionTypes.DeleteEdition;
  constructor(public payload: { id: number }) { }
}

export class EditionUpdated implements Action {
  readonly type = EditionActionTypes.EditionUpdated;
  constructor(public payload: { edition: EditionDto }) { }
}

export class UpdateEdition implements Action {
  readonly type = EditionActionTypes.UpdateEdition;
  constructor(public payload: { edition: UpdateEditionDto }) { }
}

export class EditionCreated implements Action {
  readonly type = EditionActionTypes.EditionCreated;
  constructor(public payload: { edition: EditionDto }) { }
}

export class CreateEdition implements Action {
  readonly type = EditionActionTypes.CreateEdition;
  constructor(public payload: { edition: CreateEditionDto }) { }
}

export class EditionsLoaded implements Action {
  readonly type = EditionActionTypes.EditionsLoaded;
  constructor(public payload: { editions: EditionDto[], total: number }) { }
}

export class LoadEditions implements Action {
  readonly type = EditionActionTypes.LoadEditions;
  constructor(public payload: { filter: GetEditionDto }) { }
}

export type EditionActions = LoadEditions;
