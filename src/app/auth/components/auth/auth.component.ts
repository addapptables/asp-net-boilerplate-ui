import { Component, ChangeDetectionStrategy, OnInit, Inject } from '@angular/core';
import { AppSessionService } from '@addapptable/components/addapptables-boilerplate/services/app-session.service';
import { ITenantLoginInfoDto } from '@addapptable/components/addapptables-boilerplate/models/tenant-login.model';
import { Observable } from 'rxjs';
import { ConfigurationModel } from '@addapptable/components/addapptables-boilerplate/models/configuration.model';
import { CONFIGURATION_BOILERPLATE } from '@addapptable/components/addapptables-boilerplate/tokens';
import { ModalService } from '@addapptables/modal';
import { TenantFormModalComponent } from '../tenant/tenant-form-modal/tenant-form-modal.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnInit {

  tenant$: Observable<ITenantLoginInfoDto>;
  enabledTenancy = false;

  constructor(
    private _sessionService: AppSessionService,
    @Inject(CONFIGURATION_BOILERPLATE) private _configuration: ConfigurationModel,
    private _modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.tenant$ = this._sessionService.tenantObservable;
    this.enabledTenancy = this._configuration.enabledTenancy;
  }

  showTenantChange(): boolean {
    return this._configuration.enabledTenancy && !this.supportsTenancyNameInUrl();
  }

  openModalTenant() {
    this._modalService.show(TenantFormModalComponent);
  }

  private supportsTenancyNameInUrl() {
    return (
      this._configuration.appBaseUrlFormat &&
      this._configuration.appBaseUrlFormat.indexOf(
        this._configuration.tenancyNamePlaceHolderInUrl,
      ) >= 0
    );
  }
}
