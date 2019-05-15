import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy } from '@angular/core';
import { ListComponentBase } from 'src/app/shared/list/list-component-base';
import { GetUserOrganizationUnitDto } from '@redux/organization-unit/models/user/get-user-organization-unit-dto';
import { UserOrganizationUnitDataSourceService } from 'src/app/admin/organization-unit/services/user-organization-unit-data-source.service';
import { AssociateUserOrganizationUnitClearStore } from '@redux/organization-unit/actions/associate-user-organization-unit.actions';
import { Store } from '@ngrx/store';
import { AddapptableState } from 'src/app/reducres';
import { UserOrganizationUnitActionService } from 'src/app/admin/organization-unit/services/user-organization-unit-action.service';
import { UserOrganizationUnitDto } from '@redux/organization-unit/models/user/user-organization-unit-dto';
import { UserOrganizationUnitClearStore } from '@redux/organization-unit/actions/user-organization-unit.actions';

@Component({
  selector: 'app-user-organization-unit-list',
  templateUrl: './user-organization-unit-list.component.html',
  styleUrls: ['./user-organization-unit-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    UserOrganizationUnitDataSourceService,
    UserOrganizationUnitActionService
  ]
})
export class UserOrganizationUnitListComponent extends ListComponentBase<GetUserOrganizationUnitDto> implements OnInit, OnDestroy {

  organizationUnitId: number;

  size = 5;

  @Input()
  set setOrganizationUnitId(organizationUnitId: number) {
    this.organizationUnitId = organizationUnitId;
    if (this.organizationUnitId) {
      this.subscriptionList && this.subscriptionList.unsubscribe();
      this._store.dispatch(new UserOrganizationUnitClearStore());
      this.paginator && this.paginator.firstPage();
      this.filter.next(<GetUserOrganizationUnitDto>{ id: organizationUnitId });
      this.loadDataSource();
    }
  }

  constructor(
    private _store: Store<AddapptableState>,
    userOrganizationUnitDataSourceService: UserOrganizationUnitDataSourceService,
    private _userOrganizationUnitActionService: UserOrganizationUnitActionService,
  ) {
    super(userOrganizationUnitDataSourceService);
  }

  ngOnInit(): void {
    if (this.organizationUnitId) {
      this.loadDataSource();
    }
  }

  associateUsers() {
    this._userOrganizationUnitActionService.openModalUpsert(this.organizationUnitId);
  }

  removeUser(userOrganizationUnit: UserOrganizationUnitDto) {
    this._userOrganizationUnitActionService.deleteUserOrganizationUnit(userOrganizationUnit);
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this._store.dispatch(new AssociateUserOrganizationUnitClearStore());
  }
}
