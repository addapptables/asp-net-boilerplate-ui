import { Store, Action } from '@addapptables/ngrx-actions';
import { TranslateStoreModel } from '../models/translate-store.model';
import { LoadLanguages, LanguagesLoaded } from './translate.actions';
import { Injectable } from '@angular/core';

@Injectable()
@Store<TranslateStoreModel>({
    loading: false,
    languages: []
})
export class TranslateStore {

    @Action(LoadLanguages)
    loadLanguages(state: TranslateStoreModel) {
        return { ...state, loading: true };
    }

    @Action(LanguagesLoaded)
    languageLoaded(state: TranslateStoreModel, { payload: { languages } }: LanguagesLoaded) {
        return { ...state, loading: false, languages };
    }

}
