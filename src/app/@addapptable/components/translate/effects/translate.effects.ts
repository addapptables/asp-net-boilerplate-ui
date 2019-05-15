import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { ofAction } from '@addapptables/ngrx-actions';
import { LoadLanguages, LanguagesLoaded } from '../stores/translate.actions';
import { map, switchMap } from 'rxjs/operators';
import { TranslateService } from '../services/translate.service';
import { TranslateModule } from '@ngx-translate/core';

@Injectable({
  providedIn: TranslateModule
})
export class TranslateEffect {

  constructor(private _actions$: Actions, private _translateServiceService: TranslateService) { }

  @Effect()
  $loadLanguages = this._actions$.pipe(
    ofAction(LoadLanguages),
    switchMap(() => this._translateServiceService.getAllLanguages()),
    map(languages => new LanguagesLoaded({ languages }))
  );

}
