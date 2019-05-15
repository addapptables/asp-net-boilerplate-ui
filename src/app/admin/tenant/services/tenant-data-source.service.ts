import { Injectable } from '@angular/core';
import { DataSourceBase } from 'src/app/shared/services/data-source-base';
import { TenantDto } from '@redux/tenant/models/tenant-dto.model';
import { IDatasource } from 'src/app/shared/list/datasource.interface';
import { GetTenantDto } from '@redux/tenant/models/get-tenant-dto.model';
import { Store } from '@ngrx/store';
import { AddapptableState } from 'src/app/reducres';
import { selectTenantLoading, selectTenantTotal, selectTenantsPage } from '@redux/tenant/selectors/tenant.selector';
import { CancelTenantRequest, LoadTenants } from '@redux/tenant/actions/tenant.actions';
import { PageQueryModel } from '@redux/shared/models/page-query.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TenantDataSourceService extends DataSourceBase<TenantDto> implements IDatasource<GetTenantDto> {

  public displayedColumns: string[] = ['actions', 'name', 'tenancyName', 'isActive',
    'edition', 'subscriptionEndDate', 'isInTrialPeriod', 'isSubscriptionExpired', 'nextPrice'];

  constructor(_store: Store<AddapptableState>) {
    super(_store, selectTenantLoading, selectTenantTotal, new CancelTenantRequest());
  }

  load(pageQuery: PageQueryModel, getTenantDto$: Observable<GetTenantDto>, hasNext$: Observable<boolean>) {
    return this.loadData(
      pageQuery,
      hasNext$,
      selectTenantsPage,
      getTenantDto$.pipe(
        map((getUserDto) => new LoadTenants({
          filter: {
            ...getUserDto,
            skipCount: pageQuery.index * pageQuery.size,
            maxResultCount: pageQuery.size
          }
        }))
      ));
  }
}
