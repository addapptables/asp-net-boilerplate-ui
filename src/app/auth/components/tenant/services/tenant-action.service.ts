import { Injectable } from '@angular/core';
import { NotifierService, NotifierType } from '@addapptables/notifier';
import { TranslateService } from '@ngx-translate/core';
import { TenantAvailable } from '@redux/account/models/tenant-available.model';
import { TenantAvailabilityState } from '@redux/account/models/tenant-available-enum';
import { UtilsService } from '@addapptable/components/addapptables-boilerplate/services/util.service';

@Injectable()
export class TenantActionService {

  constructor(
    private _notifierService: NotifierService,
    private _translateService: TranslateService,
    private _utilsService: UtilsService
  ) { }

  changeTenant(tenant: TenantAvailable, tenancyName: string): boolean {
    switch (tenant.state) {
      case TenantAvailabilityState.Available:
        this.setTenantCookie(tenant.tenantId);
        return true;
      case TenantAvailabilityState.InActive:
        this.notifierWarning(this._translateService.instant('tenant.tenantIsNotActive', { x: tenancyName }));
        break;
      case TenantAvailabilityState.NotFound:
        this.notifierWarning(this._translateService.instant('tenant.thereIsNoTenantDefinedWithName', { x: tenancyName }));
        break;
    }
    return false;
  }

  private notifierWarning(message: string) {
    this._notifierService.open({
      message,
      type: NotifierType.warning
    });
  }

  private setTenantCookie(tenantId: number) {
    if (tenantId) {
      this._utilsService.setCookieValue('Abp.TenantId', tenantId.toString(), new Date(new Date().getTime() + 5 * 365 * 86400000));
    } else {
      this._utilsService.deleteCookie('Abp.TenantId');
    }
  }
}
