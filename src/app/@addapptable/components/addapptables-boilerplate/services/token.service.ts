import { Injectable } from '@angular/core';
import { UtilsService } from './util.service';

@Injectable()
export class TokenService {

    readonly tokenCookieName = 'XSRF-TOKEN-ADMIN-ADDAPPTABLES';

    constructor(private _utilsService: UtilsService) { }

    getToken(): string {
        return this._utilsService.getCookieValue(this.tokenCookieName);
    }

    getTokenCookieName(): string {
        return this.tokenCookieName;
    }

    clearToken(): void {
        this.setToken(undefined, undefined);
    }

    setToken(authToken: string, expireDate?: Date): void {
        this._utilsService.setCookieValue(this.tokenCookieName, authToken, expireDate, '/', undefined);
    }
}
