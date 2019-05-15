import { Injectable } from '@angular/core';
import { DataSourceBase } from 'src/app/shared/services/data-source-base';
import { IDatasource } from 'src/app/shared/list/datasource.interface';
import { OrganizationUnitRolesListDto } from '@redux/organization-unit/models/role/organization-unit-roles-list-dto';
import { GetOrganizationUnitRolesDto } from '@redux/organization-unit/models/role/get-organization-unit-roles-dto';
import { Store } from '@ngrx/store';
import { AddapptableState } from 'src/app/reducres';
import { selectRoleOrganizationUnitLoading, selectRoleOrganizationUnitTotal, selectRoleOrganizationUnitsPage } from '@redux/organization-unit/selectors/role-organization-unit.selector';
import { CancelRoleOrganizationUnitRequest, LoadRoleOrganizationUnits } from '@redux/organization-unit/actions/role-organization-unit.actions';
import { PageQueryModel } from '@redux/shared/models/page-query.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class RoleOrganizationUnitDataSourceService extends DataSourceBase<OrganizationUnitRolesListDto>
  implements IDatasource<GetOrganizationUnitRolesDto, OrganizationUnitRolesListDto> {

  public displayedColumns: string[] = ['actions', 'roleName', 'addedTime'];

  constructor(_store: Store<AddapptableState>) {
    super(_store, selectRoleOrganizationUnitLoading, selectRoleOrganizationUnitTotal, new CancelRoleOrganizationUnitRequest());
  }

  load(
    pageQuery: PageQueryModel,
    getRoleOrganizationUnitDto$: Observable<GetOrganizationUnitRolesDto>,
    hasNext$: Observable<boolean>,
    filter?: GetOrganizationUnitRolesDto
  ) {
    return this.loadData(
      pageQuery,
      hasNext$,
      selectRoleOrganizationUnitsPage(filter.id),
      getRoleOrganizationUnitDto$.pipe(
        map((getRoleOrganizationUnitDto) => new LoadRoleOrganizationUnits({
          filter: {
            ...getRoleOrganizationUnitDto,
            skipCount: pageQuery.index * pageQuery.size,
            maxResultCount: pageQuery.size
          }
        }))
      ));
  }
}
