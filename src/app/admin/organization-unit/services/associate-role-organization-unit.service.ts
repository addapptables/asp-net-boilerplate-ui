import { Injectable } from '@angular/core';
import { DataSourceBase } from 'src/app/shared/services/data-source-base';
import { AssociateRoleToOrganizationUnitDto } from '@redux/organization-unit/models/role/associate-role-to-organization-unit-dto';
import { FindOrganizationUnitRolesDto } from '@redux/organization-unit/models/role/find-organization-unit-roles-dto';
import { IDatasource } from 'src/app/shared/list/datasource.interface';
import { Store } from '@ngrx/store';
import { AddapptableState } from 'src/app/reducres';
import {
  selectAssociateRoleOrganizationUnitLoading,
  selectAssociateRoleOrganizationUnitTotal,
  selectAssociateRoleOrganizationUnitsPage
} from '@redux/organization-unit/selectors/associate-role-to-organization-unit.selector';
import { CancelAssociateRoleOrganizationUnitRequest, LoadAssociateRoleOrganizationUnits } from '@redux/organization-unit/actions/associate-role-organization-unit.actions';
import { PageQueryModel } from '@redux/shared/models/page-query.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AssociateRoleOrganizationUnitService extends DataSourceBase<AssociateRoleToOrganizationUnitDto>
  implements IDatasource<FindOrganizationUnitRolesDto, AssociateRoleToOrganizationUnitDto> {

  public displayedColumns: string[] = ['actions', 'name'];

  constructor(_store: Store<AddapptableState>) {
    super(_store, selectAssociateRoleOrganizationUnitLoading,
      selectAssociateRoleOrganizationUnitTotal, new CancelAssociateRoleOrganizationUnitRequest());
  }

  load(
    pageQuery: PageQueryModel,
    getAssociateRoleOrganizationUnitDto$: Observable<FindOrganizationUnitRolesDto>,
    hasNext$: Observable<boolean>,
    filter: FindOrganizationUnitRolesDto
  ) {
    return this.loadData(
      pageQuery,
      hasNext$,
      selectAssociateRoleOrganizationUnitsPage(filter.organizationUnitId),
      getAssociateRoleOrganizationUnitDto$.pipe(
        map((getAssociateRoleOrganizationUnitDto) => new LoadAssociateRoleOrganizationUnits({
          filter: {
            ...getAssociateRoleOrganizationUnitDto,
            skipCount: pageQuery.index * pageQuery.size,
            maxResultCount: pageQuery.size
          }
        }))
      ));
  }
}
