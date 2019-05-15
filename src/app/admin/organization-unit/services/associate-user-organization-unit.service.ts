import { Injectable } from '@angular/core';
import { DataSourceBase } from 'src/app/shared/services/data-source-base';
import { IDatasource } from 'src/app/shared/list/datasource.interface';
import { FindOrganizationUnitUsersDto } from '@redux/organization-unit/models/user/find-organization-unit-users-dto';
import { Store } from '@ngrx/store';
import { AddapptableState } from 'src/app/reducres';
import {
  selectAssociateUserOrganizationUnitLoading,
  selectAssociateUserOrganizationUnitTotal,
  selectAssociateUserOrganizationUnitsPage
} from '@redux/organization-unit/selectors/associate-user-organization-unit.selector';
import {
  CancelAssociateUserOrganizationUnitRequest,
  LoadAssociateUserOrganizationUnits
} from '@redux/organization-unit/actions/associate-user-organization-unit.actions';
import { PageQueryModel } from '@redux/shared/models/page-query.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AssociateUserOrganizationUnitDto } from '@redux/organization-unit/models/user/associate-user-organization-unit-dto';

@Injectable()
export class AssociateUserOrganizationUnitService extends DataSourceBase<AssociateUserOrganizationUnitDto>
  implements IDatasource<FindOrganizationUnitUsersDto, AssociateUserOrganizationUnitDto> {

  public displayedColumns: string[] = ['actions', 'fullName', 'emailAddress'];

  constructor(_store: Store<AddapptableState>) {
    super(_store, selectAssociateUserOrganizationUnitLoading,
      selectAssociateUserOrganizationUnitTotal, new CancelAssociateUserOrganizationUnitRequest());
  }

  load(
    pageQuery: PageQueryModel,
    getAssociateUserOrganizationUnitDto$: Observable<FindOrganizationUnitUsersDto>,
    hasNext$: Observable<boolean>,
    filter: FindOrganizationUnitUsersDto
  ) {
    return this.loadData(
      pageQuery,
      hasNext$,
      selectAssociateUserOrganizationUnitsPage(filter.organizationUnitId),
      getAssociateUserOrganizationUnitDto$.pipe(
        map((getAssociateUserOrganizationUnitDto) => new LoadAssociateUserOrganizationUnits({
          filter: {
            ...getAssociateUserOrganizationUnitDto,
            skipCount: pageQuery.index * pageQuery.size,
            maxResultCount: pageQuery.size
          }
        }))
      ));
  }
}
