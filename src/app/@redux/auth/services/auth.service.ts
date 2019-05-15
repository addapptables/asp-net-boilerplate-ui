import { Injectable, Injector } from '@angular/core';
import { ServiceApiBase } from '@redux/services/service-base';
import { AuthenticateInputModel } from '../models/authenticate-input.model';
import { AuthenticateModel } from '../models/authenticate.model';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UtilsService } from '@addapptable/components/addapptables-boilerplate/services/util.service';
import { TokenService } from '@addapptable/components/addapptables-boilerplate/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ServiceApiBase {

  constructor(
    injector: Injector,
    private _tokenService: TokenService,
    private _utilsService: UtilsService
  ) {
    super(injector, '/api/TokenAuth');
  }

  authenticate(input: AuthenticateInputModel): Observable<AuthenticateModel> {
    return this.post<AuthenticateInputModel, AuthenticateModel>('/Authenticate', input).pipe(
      tap(result => this.processAuthenticateResult(result))
    );
  }

  impersonatedAuthenticate(impersonationToken: string): Observable<AuthenticateModel> {
    return this.post<AuthenticateModel>(`/ImpersonatedAuthenticate?impersonationToken=${impersonationToken}`).pipe(
      tap(result => this.processAuthenticateResult(result))
    );
  }

  public processAuthenticateResult(authenticateResult: AuthenticateModel) {
    if (authenticateResult.accessToken) {
      this.login(authenticateResult.accessToken,
        authenticateResult.encryptedAccessToken,
        authenticateResult.expireInSeconds,
        false);
    } else {
      console.warn('Unexpected authenticateResult!');
    }
  }

  public setTenantCookie(tenantId: number) {
    if (tenantId) {
      this._utilsService.setCookieValue('Abp.TenantId', tenantId.toString(), new Date(new Date().getTime() + 5 * 365 * 86400000));
    } else {
      this._utilsService.deleteCookie('Abp.TenantId');
    }
  }

  private login(accessToken: string, encryptedAccessToken: string, expireInSeconds: number, rememberMe?: boolean): void {
    const tokenExpireDate = rememberMe ? (new Date(new Date().getTime() + 1000 * expireInSeconds)) : undefined;
    this._tokenService.setToken(
      accessToken,
      tokenExpireDate
    );
    this._utilsService.setCookieValue(
      'enc_auth_token',
      encryptedAccessToken,
      tokenExpireDate,
      '/'
    );
  }
}
