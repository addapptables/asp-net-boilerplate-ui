import { Store, MemoizedSelector, select, Action } from '@ngrx/store';
import { AddapptableState } from 'src/app/reducres';
import { Observable } from 'rxjs';
import { OnInit, Output, EventEmitter, OnDestroy, Injector, Type } from '@angular/core';
import { tap, takeUntil } from 'rxjs/operators';
import { componentDestroyed } from '../utils/component-destroyed';
import { FormBuilder } from '@angular/forms';
import { NotifierService, NotifierType } from '@addapptables/notifier';
import { TranslateService } from '@ngx-translate/core';
import { ActionType } from '@redux/shared/models/action-type.model';

export class FormBase implements OnInit, OnDestroy {

    loadingAction$: Observable<boolean>;

    protected _store: Store<AddapptableState>;

    protected _fb: FormBuilder;

    protected _notifierService: NotifierService;

    protected _translateService: TranslateService;

    protected actionState$: Observable<ActionType>;

    @Output()
    save = new EventEmitter();

    constructor(
        protected injector: Injector,
        protected selectorLoadingAction: MemoizedSelector<any, boolean>,
        protected selectorActionState: MemoizedSelector<any, ActionType>,
        protected actionComplete: Action
    ) {
        this._store = injector.get(Store as Type<Store<AddapptableState>>);
        this._fb = injector.get(FormBuilder as Type<FormBuilder>);
        this._notifierService = injector.get(NotifierService as Type<NotifierService>);
        this._translateService = injector.get(TranslateService as Type<TranslateService>);
    }

    ngOnInit(): void {
        this.loadingAction$ = this._store.pipe(
            select(this.selectorLoadingAction)
        );
        this._onActionSuccess();
    }

    private _onActionSuccess() {
        this.actionState$ = this._store.pipe(
            select(this.selectorActionState)
        );
        this.actionState$.pipe(
            takeUntil(componentDestroyed(this)),
            tap((result) => {
                if (result === ActionType.success) {
                    this.save.emit();
                    this._store.dispatch(this.actionComplete);
                    this._notifierService.open({
                        type: NotifierType.success,
                        message: this._translateService.instant('general.saveSuccessFully')
                    });
                } else if (result === ActionType.error) {
                    this._store.dispatch(this.actionComplete);
                }
            })
        ).subscribe();
    }

    ngOnDestroy(): void { }
}
