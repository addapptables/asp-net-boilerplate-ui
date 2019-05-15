import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, Input } from '@angular/core';
import { ListComponentBase } from 'src/app/shared/list/list-component-base';
import { RoleOrganizationUnitClearStore } from '@redux/organization-unit/actions/role-organization-unit.actions';
import { GetOrganizationUnitRolesDto } from '@redux/organization-unit/models/role/get-organization-unit-roles-dto';
import { Store } from '@ngrx/store';
import { AddapptableState } from 'src/app/reducres';
import { RoleOrganizationUnitDataSourceService } from 'src/app/admin/organization-unit/services/role-organization-unit-data-source.service';
import { RoleOrganizationUnitActionService } from 'src/app/admin/organization-unit/services/role-organization-unit-action.service';
import { OrganizationUnitRolesListDto } from '@redux/organization-unit/models/role/organization-unit-roles-list-dto';
import { AssociateRoleOrganizationUnitClearStore } from '@redux/organization-unit/actions/associate-role-organization-unit.actions';

@Component({
  selector: 'app-role-organization-unit-list',
  templateUrl: './role-organization-unit-list.component.html',
  styleUrls: ['./role-organization-unit-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    RoleOrganizationUnitDataSourceService,
    RoleOrganizationUnitActionService
  ]
})
export class RoleOrganizationUnitListComponent extends ListComponentBase<GetOrganizationUnitRolesDto> implements OnInit, OnDestroy {

  organizationUnitId: number;

  size = 5;

  @Input()
  set setOrganizationUnitId(organizationUnitId: number) {
    this.organizationUnitId = organizationUnitId;
    if (this.organizationUnitId) {
      this.subscriptionList && this.subscriptionList.unsubscribe();
      this._store.dispatch(new RoleOrganizationUnitClearStore());
      this.paginator && this.paginator.firstPage();
      this.filter.next(<GetOrganizationUnitRolesDto>{ id: organizationUnitId });
      this.loadDataSource();
    }
  }

  constructor(
    private _store: Store<AddapptableState>,
    roleOrganizationUnitDataSourceService: RoleOrganizationUnitDataSourceService,
    private _roleOrganizationUnitActionService: RoleOrganizationUnitActionService,
  ) {
    super(roleOrganizationUnitDataSourceService);
  }

  ngOnInit(): void {
    if (this.organizationUnitId) {
      this.loadDataSource();
    }
  }

  associateRoles() {
    this._roleOrganizationUnitActionService.openModalUpsert(this.organizationUnitId);
  }

  removeRole(roleOrganizationUnit: OrganizationUnitRolesListDto) {
    this._roleOrganizationUnitActionService.deleteRoleOrganizationUnit(roleOrganizationUnit);
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this._store.dispatch(new AssociateRoleOrganizationUnitClearStore());
  }
}
