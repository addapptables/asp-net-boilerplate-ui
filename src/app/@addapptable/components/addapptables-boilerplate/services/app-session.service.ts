import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { TokenService } from './token.service';
import { UserLoginInfoDto } from '../models/user-login.model';
import { ITenantLoginInfoDto } from '../models/tenant-login.model';
import { IApplicationInfoDto } from '../models/application.model';
import { ILoginInformation } from '../models/login-information';
import { IAjaxResponse } from '../models/ajax-response.model';
import { InitialConfigurationService } from './initial-configuration.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class AppSessionService {

    private _user = new BehaviorSubject<UserLoginInfoDto>(<UserLoginInfoDto>{});
    private _tenant = new BehaviorSubject<ITenantLoginInfoDto>(<ITenantLoginInfoDto>{});
    private _application = new BehaviorSubject<IApplicationInfoDto>(<IApplicationInfoDto>{});
    private _loginInformation = new BehaviorSubject<ILoginInformation>(<ILoginInformation>{});
    private _url: string;

    constructor(private _http: HttpClient,
        private _tokenService: TokenService,
        initialConfigurationService: InitialConfigurationService) {
        const remoteServiceBaseUrl = initialConfigurationService.configuration.remoteServiceBaseUrl;
        this._url = `${remoteServiceBaseUrl}/api/services/app/Session/GetCurrentLoginInformations`;
    }

    get loginInformation(): ILoginInformation {
        return this._loginInformation.getValue();
    }

    get loginInformationObservable(): Observable<ILoginInformation> {
        return this._loginInformation.asObservable();
    }

    get application(): IApplicationInfoDto {
        return this._application.getValue();
    }

    get applicationObservable(): Observable<IApplicationInfoDto> {
        return this._application.asObservable();
    }

    get user(): UserLoginInfoDto {
        return this._user.getValue();
    }

    get userObservable(): Observable<UserLoginInfoDto> {
        return this._user.asObservable();
    }

    get userId(): number {
        return this.user ? this.user.id : null;
    }

    get tenant(): ITenantLoginInfoDto {
        return this._tenant.getValue();
    }

    get tenantObservable(): Observable<ITenantLoginInfoDto> {
        return this._tenant.asObservable();
    }

    get tenantId(): number {
        return this.tenant ? this.tenant.id : null;
    }

    logout() {
        this._tokenService.clearToken();
        this._user.next(undefined);
    }

    init() {
        return this._http.get<IAjaxResponse<ILoginInformation>>(this._url, { responseType: 'json' })
            .pipe(
                map(x => x.result),
                tap((result: ILoginInformation) => {
                    this._loginInformation.next(result);
                    this._application.next(result.application);
                    this._user.next(result.user);
                    this._tenant.next(result.tenant);
                })
            );
    }
}
