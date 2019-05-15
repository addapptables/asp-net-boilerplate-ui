import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { LoadLanguages } from './stores/translate.actions';
import { LanguageModel } from './models/language.model';
import { Observable, of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { selectLanguage, selectAllLanguages, selectLoading } from './selectors/translate.selector';
import { AddapptableState } from 'src/app/reducres';
import * as moment from 'moment';
@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TranslateComponent implements OnInit {

  languages$: Observable<LanguageModel[]>;

  loadingLanguage$: Observable<boolean>;

  selectLanguage$: Observable<LanguageModel>;

  constructor(
    readonly _store: Store<AddapptableState>,
    private readonly _translateService: TranslateService
  ) {
    _store.dispatch(new LoadLanguages());
  }

  ngOnInit() {
    this.languages$ = this._store.pipe(
      select(selectAllLanguages)
    );
    this.loadingLanguage$ = this._store.pipe(
      select(selectLoading)
    );
    this.selectLanguage$ = this._store.pipe(
      select(selectLanguage(this._translateService.currentLang))
    );
  }

  changeLanguage(language: LanguageModel) {
    this._translateService.use(language.id);
    this.selectLanguage$ = of(language);
    moment.locale(language.id);
  }

}
