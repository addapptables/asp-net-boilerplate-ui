import { Injectable } from '@angular/core';
import { DataSourceBase } from 'src/app/shared/services/data-source-base';
import { RoleDto } from '@redux/role/models/role-dto.model';
import { Store } from '@ngrx/store';
import { AddapptableState } from 'src/app/reducres';
import { selectRoleLoading, selectRoleTotal, selectRolesPage } from '@redux/role/selectors/role.selector';
import { LoadRoles, CancelRoleRequest } from '@redux/role/actions/role.actions';
import { RoleInputModel } from '@redux/role/models/role-input.model';
import { Observable } from 'rxjs';
import { IDatasource } from 'src/app/shared/list/datasource.interface';
import { map } from 'rxjs/operators';
import { PageQueryModel } from '@redux/shared/models/page-query.model';

@Injectable()
export class RoleDataSourceService extends DataSourceBase<RoleDto> implements IDatasource<RoleInputModel> {

  public displayedColumns: string[] = ['actions', 'normalizedName', 'description'];

  constructor(_store: Store<AddapptableState>) {
    super(_store, selectRoleLoading, selectRoleTotal, new CancelRoleRequest());
  }

  load(pageQuery: PageQueryModel, roleInput$: Observable<RoleInputModel>, hasNext$: Observable<boolean>) {
    return this.loadData(
      pageQuery,
      hasNext$,
      selectRolesPage,
      roleInput$.pipe(
        map((roleInput) => new LoadRoles({
          params: {
            ...roleInput,
            skipCount: pageQuery.index * pageQuery.size,
            maxResultCount: pageQuery.size
          }
        }))
      ));
  }
}
