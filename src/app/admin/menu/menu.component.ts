import { Component, ViewEncapsulation, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { MenuModel, MenuHeaderModel, MenuUserModel } from '@addapptables/menu';
import { AddapptableState } from 'src/app/reducres';
import { LoadMenus } from 'src/app/@redux/menu/actions/menu.actions';
import { selectAllMenus } from 'src/app/@redux/menu/selectors/menu.selector';
import { AppSessionService } from '@addapptable/components/addapptables-boilerplate/services/app-session.service';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit {

    menus$: Observable<MenuModel[]>;

    header$: Observable<MenuHeaderModel>;

    user$: Observable<MenuUserModel>;

    constructor(
        private readonly _store: Store<AddapptableState>,
        private _appSessionService: AppSessionService
    ) {
        _store.dispatch(new LoadMenus());
    }

    ngOnInit() {
        const menus$ = this._store.pipe(
            select(selectAllMenus),
        );
        const user$ = this._appSessionService.userObservable;
        this.menus$ = combineLatest(menus$, user$).pipe(
            map(([menus, user]) => {
                const permissions = user !== undefined ? user.permissions : [];
                return this._filterMenu(menus, permissions);
            })
        );
        this._initUser();
        this._initHeader();
    }

    private _filterMenu(menus: MenuModel[], allPermissions: string[]) {
        return menus
            .filter(x => allPermissions.find(y => y === x.permission))
            .map(x => <MenuModel>{
                ...x,
                children: x.multiOption && this._filterMenu(x.children, allPermissions)
            });
    }

    private _initUser() {
        const firstAndUpperCase = (name: string) => name.charAt(0).toUpperCase();
        const upperCaseFirstLetter = (name: string) => firstAndUpperCase(name) + name.slice(1).toLowerCase();
        this.user$ = this._appSessionService.userObservable.pipe(
            map((user) => {
                if (user != null) {
                    return {
                        avatarUrl: user.profilePictureBase64 ? user.profilePictureBase64 :
                            'assets/images/profile/default-profile-picture.png',
                        initialName: firstAndUpperCase(user.name) + firstAndUpperCase(user.surname),
                        fullName: `${upperCaseFirstLetter(user.name)} ${upperCaseFirstLetter(user.surname)}`,
                        email: user.emailAddress
                    };
                }
                return <MenuUserModel>{};
            })
        );
    }

    private _initHeader() {
        this.header$ = this._appSessionService.tenantObservable.pipe(
            map(tenant => {
                if (tenant !== null) {
                    return {
                        companyName: tenant.tenancyName.toUpperCase(),
                        logoUrl: 'assets/images/logo/addaptables.svg'
                    };
                }
                return {
                    companyName: 'ADDAPPTABLES',
                    logoUrl: 'assets/images/logo/addaptables.svg'
                };
            })
        );
    }
}
