import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ListComponentBase } from 'src/app/shared/list/list-component-base';
import { GetTenantDto } from '@redux/tenant/models/get-tenant-dto.model';
import { TenantDataSourceService } from '../../services/tenant-data-source.service';
import { TenantDto } from '@redux/tenant/models/tenant-dto.model';
import { TenantActionService } from '../../services/tenant-action.service';
import { TenantClearStore } from '@redux/tenant/actions/tenant.actions';
import { Store } from '@ngrx/store';
import { AddapptableState } from 'src/app/reducres';

@Component({
  selector: 'app-tenant-list',
  templateUrl: './tenant-list.component.html',
  styleUrls: ['./tenant-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    TenantDataSourceService,
    TenantActionService
  ]
})
export class TenantListComponent extends ListComponentBase<GetTenantDto> implements OnInit {

  constructor(
    private _store: Store<AddapptableState>,
    tenantDataSourceService: TenantDataSourceService,
    private _tenantActionService: TenantActionService
  ) {
    super(tenantDataSourceService);
  }

  search(filter: GetTenantDto) {
    this.filter.next(filter);
    this._store.dispatch(new TenantClearStore());
  }

  editTenant(tenant: TenantDto) {
    this._tenantActionService.openModalUpsert(tenant);
  }

  deleteTenant(tenant: TenantDto) {
    this._tenantActionService.deleteTenant(tenant);
  }

  openModalImpersonation(tenantId: number) {
    this._tenantActionService.openModalImpersonation(tenantId);
  }
}
