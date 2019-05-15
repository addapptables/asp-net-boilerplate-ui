import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { AddapptableState } from 'src/app/reducres';
import { Store, Action } from '@ngrx/store';
import { TenantClearStore } from '@redux/tenant/actions/tenant.actions';
import { TenantActionService } from '../../services/tenant-action.service';
import { TenantDto } from '@redux/tenant/models/tenant-dto.model';
import { CancelEditionMinimalsRequest, EditionMinimalClearStore } from '@redux/edition/actions/edition-minimal.actions';
import { CancelRoleMinimalsRequest, RoleMinimalClearStore } from '@redux/role/actions/role-minimal.actions';

@Component({
  selector: 'app-tenant-layout',
  templateUrl: './tenant-layout.component.html',
  styleUrls: ['./tenant-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TenantLayoutComponent implements OnDestroy {

  private _actionsDestroy: Action[];

  constructor(
    private _store: Store<AddapptableState>,
    private _tenantActionService: TenantActionService
  ) {
    this._actionsDestroy = [
      new TenantClearStore(),
      new CancelRoleMinimalsRequest(),
      new RoleMinimalClearStore(),
      new CancelEditionMinimalsRequest(),
      new EditionMinimalClearStore()
    ];
  }

  createTenant() {
    this._tenantActionService.openModalUpsert(<TenantDto>{});
  }

  ngOnDestroy(): void {
    this._actionsDestroy.forEach(x => this._store.dispatch(x));
  }
}
