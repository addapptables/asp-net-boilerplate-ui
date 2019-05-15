import { OnDestroy, Injector, Type } from '@angular/core';
import { AlertService } from '@addapptables/alert';
import { TranslateService } from '@ngx-translate/core';
import { Store, Action, select, MemoizedSelector } from '@ngrx/store';
import { AddapptableState } from 'src/app/reducres';
import { takeUntil, tap } from 'rxjs/operators';
import { componentDestroyed } from '../utils/component-destroyed';
import { ActionType } from '@redux/shared/models/action-type.model';
import { NotifierService, NotifierType } from '@addapptables/notifier';

export class ActionBaseService implements OnDestroy {

    protected _store: Store<AddapptableState>;
    protected _notifierService: NotifierService;
    protected _alertService: AlertService;
    protected _translateService: TranslateService;
    protected _actionComplete: Action;
    protected _selectRoleActionState: MemoizedSelector<any, ActionType>;

    constructor(injector: Injector, _actionComplete: Action, _selectRoleActionState: MemoizedSelector<any, ActionType>) {
        this._store = injector.get(Store as Type<Store<AddapptableState>>);
        this._alertService = injector.get(AlertService as Type<AlertService>);
        this._translateService = injector.get(TranslateService as Type<TranslateService>);
        this._notifierService = injector.get(NotifierService as Type<NotifierService>);
        this._actionComplete = _actionComplete;
        this._selectRoleActionState = _selectRoleActionState;
    }

    protected delete(title: string, message: string, actionDelete: Action) {
        const dialog = this._alertService.showConfirmation(title, message);
        dialog.beforeClose().pipe(
            takeUntil(componentDestroyed(this)),
        ).subscribe((decision) => {
            if (decision && decision.result === 'ok') {
                this._store.dispatch(actionDelete);
                this._hearDeleteSuccess();
            }
        });
    }

    private _hearDeleteSuccess() {
        const subscription = this._store.pipe(
            select(this._selectRoleActionState),
            takeUntil(componentDestroyed(this)),
            tap((result) => {
                if (result === ActionType.success) {
                    this._notifierService.open({
                        message: this._translateService.instant('general.deletesuccessfully'),
                        type: NotifierType.success
                    });
                    this._store.dispatch(this._actionComplete);
                    subscription.unsubscribe();
                } else if (result === ActionType.error) {
                    this._store.dispatch(this._actionComplete);
                    subscription.unsubscribe();
                }
            })
        ).subscribe();
    }

    ngOnDestroy(): void { }

}
