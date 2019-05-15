import { Component, ChangeDetectionStrategy, Input, ContentChild, TemplateRef } from '@angular/core';
import { UserDataSourceService } from '../../services/user-data-source.service';
import { ListComponentBase } from 'src/app/shared/list/list-component-base';
import { GetUserDto } from '@redux/user/models/get-user-dto.model';
import { Store } from '@ngrx/store';
import { AddapptableState } from 'src/app/reducres';
import { UserClearStore } from '@redux/user/actions/user.actions';
import { UserDto } from '@redux/user/models/user-dto.model';
import { UserActionService } from '../../services/user-action.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    UserDataSourceService,
    UserActionService
  ]
})
export class UserListComponent extends ListComponentBase<GetUserDto> {

  @ContentChild(TemplateRef) templateRef: TemplateRef<any>;

  @Input()
  tenantId: number;

  @Input()
  displayedColumns: string[];

  constructor(
    private _store: Store<AddapptableState>,
    private _userActionService: UserActionService,
    userDataSourceService: UserDataSourceService
  ) {
    super(userDataSourceService);
    this.displayedColumns = userDataSourceService.displayedColumns;
  }

  search(filter: GetUserDto) {
    this.filter.next({ ...filter, tenantId: this.tenantId });
    this._store.dispatch(new UserClearStore());
  }

  getParams() {
    if (this.tenantId) {
      const filter = this.filter.getValue();
      this.filter.next({ ...filter, tenantId: this.tenantId });
    }
    return super.getParams();
  }

  getRolesNames(roleNames: string[]) {
    return roleNames.join(',');
  }

  editUser(user: UserDto) {
    this._userActionService.openModalUpsert(user);
  }

  deleteUser(user: UserDto) {
    this._userActionService.deleteUser(user);
  }
}
