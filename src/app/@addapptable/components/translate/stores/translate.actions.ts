import { Action } from '@ngrx/store';
import { LanguageModel } from '../models/language.model';

export enum TranslateActionTypes {
  LoadLanguage = '[Translate] Load languages',
  LanguageLoaded = '[Translate] Language loaded'
}

export class LoadLanguages implements Action {
  readonly type = TranslateActionTypes.LoadLanguage;
}

export class LanguagesLoaded implements Action {
  readonly type = TranslateActionTypes.LanguageLoaded;

  constructor(public payload: { languages: LanguageModel[] }) { }
}

export type TranslateActions = LoadLanguages | LanguagesLoaded;
