import { Injectable, Injector } from '@angular/core';
import { TenantAvailableInput } from '../models/tenant-available-input.model';
import { Observable } from 'rxjs';
import { ServiceApiBase } from '@redux/services/service-base';
import { TenantAvailable } from '../models/tenant-available.model';
import { ImpersonateInput } from '../models/impersonate-input.model';
import { ImpersonateOutput } from '../models/impersonate-output.model';
import { SendPasswordResetCodeDto } from '../models/send-password-reset-code.model';
import { IAjaxResponse } from '@addapptable/components/addapptables-boilerplate/models/ajax-response.model';
import { ResetPassword } from '../models/reset-password.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends ServiceApiBase {

  constructor(
    injector: Injector
  ) {
    super(injector, 'api/services/app/Account');
  }

  isTenantAvailable(tenantAvailableInput: TenantAvailableInput): Observable<TenantAvailable> {
    return this.post<TenantAvailableInput, TenantAvailable>('IsTenantAvailable', tenantAvailableInput);
  }

  impersonate(impersonateInput: ImpersonateInput) {
    return this.post<ImpersonateInput, ImpersonateOutput>('Impersonate', impersonateInput);
  }

  backToImpersonator() {
    return this.post<ImpersonateOutput>('BackToImpersonator');
  }

  sendPasswordResetCode(input: SendPasswordResetCodeDto) {
    const urlSend = this._url + '/' + 'SendPasswordResetCode';
    return this._http.post<IAjaxResponse>(urlSend, input);
  }

  accountResetPassword(input: ResetPassword) {
    const urlSend = this._url + '/' + 'AccountResetPassword';
    return this._http.post<IAjaxResponse>(urlSend, input);
  }
}
