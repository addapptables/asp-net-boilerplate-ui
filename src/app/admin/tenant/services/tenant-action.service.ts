import { Injectable, Injector } from '@angular/core';
import { ActionBaseService } from 'src/app/shared/services/action-base.service';
import { TenantActionComplete, DeleteTenant } from '@redux/tenant/actions/tenant.actions';
import { selectTenantActionState } from '@redux/tenant/selectors/tenant.selector';
import { TenantDto } from '@redux/tenant/models/tenant-dto.model';
import { ModalService } from '@addapptables/modal';
import { TenantFormModalComponent } from '../components/tenant-form-modal/tenant-form-modal.component';
import { UserListImpersonationComponent } from '../components/tenant-list/user-list-impersonation/user-list-impersonation.component';

@Injectable()
export class TenantActionService extends ActionBaseService {

  constructor(
    injector: Injector,
    private _modalService: ModalService
  ) {
    super(injector, new TenantActionComplete(), selectTenantActionState);
  }

  openModalUpsert(tenant: TenantDto) {
    this._modalService.show(TenantFormModalComponent, tenant);
  }

  openModalImpersonation(tenantId: number) {
    this._modalService.show(UserListImpersonationComponent, tenantId);
  }

  deleteTenant(tenant: TenantDto) {
    this.delete(
      this._translateService.instant('general.delete'),
      this._translateService.instant('tenant.areYouSure', { title: tenant.name }),
      new DeleteTenant({ id: tenant.id })
    );
  }
}
