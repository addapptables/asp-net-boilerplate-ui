import { Observable, ReplaySubject } from 'rxjs';

export function componentDestroyed(component: { ngOnDestroy(): void }): Observable<true> {
    const modifiedComponent = component as { __componentDestroyed$?: Observable<true>, ngOnDestroy(): void };
    if (modifiedComponent.__componentDestroyed$) {
        return modifiedComponent.__componentDestroyed$;
    }
    const oldNgOnDestroy = component.ngOnDestroy;
    const stop$ = new ReplaySubject<true>();
    modifiedComponent.ngOnDestroy = function () {
        oldNgOnDestroy && oldNgOnDestroy.apply(component);
        stop$.next(true);
        stop$.complete();
    };
    return modifiedComponent.__componentDestroyed$ = stop$.asObservable();
}
