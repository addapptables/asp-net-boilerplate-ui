import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { LocalizationService } from './localization/localization.service';
import { ReponsiveService } from '@addapptables/responsive';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnDestroy {

  _unsubscribeAll = new Subject<any>();

  constructor(
    readonly localizationService: LocalizationService,
    private readonly reponsiveService: ReponsiveService
  ) {
    this.localizationService.initDefaultLanguage();
  }

  ngAfterViewInit(): void {
    this.reponsiveService.resize$.pipe(
      takeUntil(this._unsubscribeAll)
    )
      .subscribe();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
