import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { AddapptableState } from 'src/app/reducres';
import { UserClearStore } from '@redux/user/actions/user.actions';
import { UserActionService } from '../../services/user-action.service';
import { UserDto } from '@redux/user/models/user-dto.model';
import { CancelRoleMinimalsRequest, RoleMinimalClearStore } from '@redux/role/actions/role-minimal.actions';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserLayoutComponent implements OnDestroy {

  private _actionsDestroy: Action[];

  constructor(
    private _store: Store<AddapptableState>,
    private _userActionService: UserActionService
  ) {
    this._actionsDestroy = [
      new UserClearStore(),
      new CancelRoleMinimalsRequest(),
      new RoleMinimalClearStore()
    ];
  }

  createUser() {
    this._userActionService.openModalUpsert(<UserDto>{});
  }

  ngOnDestroy(): void {
    this._actionsDestroy.forEach(x => this._store.dispatch(x));
  }

}
