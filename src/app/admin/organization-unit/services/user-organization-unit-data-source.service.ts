import { Injectable } from '@angular/core';
import { DataSourceBase } from 'src/app/shared/services/data-source-base';
import { UserOrganizationUnitDto } from '@redux/organization-unit/models/user/user-organization-unit-dto';
import { IDatasource } from 'src/app/shared/list/datasource.interface';
import { GetUserOrganizationUnitDto } from '@redux/organization-unit/models/user/get-user-organization-unit-dto';
import { Store } from '@ngrx/store';
import { AddapptableState } from 'src/app/reducres';
import {
  CancelUserOrganizationUnitRequest,
  LoadUserOrganizationUnits
} from '@redux/organization-unit/actions/user-organization-unit.actions';
import {
  selectUserOrganizationUnitLoading,
  selectUserOrganizationUnitTotal,
  selectUserOrganizationUnitsPage
} from '@redux/organization-unit/selectors/user-organization-unit.selector';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PageQueryModel } from '@redux/shared/models/page-query.model';

@Injectable()
export class UserOrganizationUnitDataSourceService extends DataSourceBase<UserOrganizationUnitDto>
  implements IDatasource<GetUserOrganizationUnitDto, UserOrganizationUnitDto> {

  public displayedColumns: string[] = ['actions', 'fullName', 'emailAddress', 'addedTime'];

  constructor(_store: Store<AddapptableState>) {
    super(_store, selectUserOrganizationUnitLoading, selectUserOrganizationUnitTotal, new CancelUserOrganizationUnitRequest());
  }

  load(
    pageQuery: PageQueryModel,
    getUserOrganizationUnitDto$: Observable<GetUserOrganizationUnitDto>,
    hasNext$: Observable<boolean>,
    filter?: GetUserOrganizationUnitDto
  ) {
    return this.loadData(
      pageQuery,
      hasNext$,
      selectUserOrganizationUnitsPage(filter.id),
      getUserOrganizationUnitDto$.pipe(
        map((getUserOrganizationUnitDto) => new LoadUserOrganizationUnits({
          filter: {
            ...getUserOrganizationUnitDto,
            skipCount: pageQuery.index * pageQuery.size,
            maxResultCount: pageQuery.size
          }
        }))
      ));
  }
}
