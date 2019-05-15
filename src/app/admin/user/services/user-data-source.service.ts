import { Injectable } from '@angular/core';
import { DataSourceBase } from 'src/app/shared/services/data-source-base';
import { UserDto } from '@redux/user/models/user-dto.model';
import { IDatasource } from 'src/app/shared/list/datasource.interface';
import { GetUserDto } from '@redux/user/models/get-user-dto.model';
import { Store } from '@ngrx/store';
import { AddapptableState } from 'src/app/reducres';
import { selectUserLoading, selectUserTotal, selectUsersPage } from '@redux/user/selectors/user.selector';
import { Observable } from 'rxjs';
import { LoadUsers, CancelUserRequest } from '@redux/user/actions/user.actions';
import { map } from 'rxjs/operators';
import { PageQueryModel } from '@redux/shared/models/page-query.model';

@Injectable()
export class UserDataSourceService extends DataSourceBase<UserDto> implements IDatasource<GetUserDto> {

  public displayedColumns: string[] = ['actions', 'userName', 'fullName', 'emailAddress', 'roleNames', 'isActive', 'lastLoginTime'];

  constructor(_store: Store<AddapptableState>) {
    super(_store, selectUserLoading, selectUserTotal, new CancelUserRequest());
  }

  load(pageQuery: PageQueryModel, getUserDto$: Observable<GetUserDto>, hasNext$: Observable<boolean>) {
    return this.loadData(
      pageQuery,
      hasNext$,
      selectUsersPage,
      getUserDto$.pipe(
        map((getUserDto) => new LoadUsers({
          params: {
            ...getUserDto,
            skipCount: pageQuery.index * pageQuery.size,
            maxResultCount: pageQuery.size
          }
        }))
      ));
  }
}
