import { OnInit } from '@angular/core';
import { Store, select, MemoizedSelector, Action } from '@ngrx/store';
import { AddapptableState } from 'src/app/reducres';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { isEmpty } from 'lodash';

export class SingleSourceBase<T> implements OnInit {

    result$: Observable<T>;

    loading$: Observable<boolean>;

    constructor(
        protected _store: Store<AddapptableState>,
        protected selectSingle: MemoizedSelector<any, T>,
        protected actionLoad: Action,
        protected selectLoading: MemoizedSelector<any, boolean>
    ) { }

    ngOnInit(): void {
        this.result$ = this._store.pipe(
            select(this.selectSingle),
            tap((result) => {
                if (isEmpty(result)) {
                    this._store.dispatch(this.actionLoad);
                }
            })
        );
        this.loading$ = this._store.pipe(
            select(this.selectLoading)
        );
    }

}
