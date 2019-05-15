import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LanguageModel } from '../models/language.model';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  constructor() { }

  getAllLanguages(): Observable<LanguageModel[]> {
    const languages = <LanguageModel[]>[
      {
        id: 'en',
        title: 'translate.english',
        country: 'us'
      },
      {
        id: 'es',
        title: 'translate.spanish',
        country: 'es'
      }
    ];
    return of(languages);
  }
}
