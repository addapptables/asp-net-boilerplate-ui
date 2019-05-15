import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';
import { UtilsService } from './util.service';
import { AddapptableHttpConfiguration } from './http-configuration.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AddapptableHttpInterceptor implements HttpInterceptor {

    constructor(
        private _tokenService: TokenService,
        private _utilsService: UtilsService,
        private _configuration: AddapptableHttpConfiguration) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
        const modifiedRequest = this.normalizeRequestHeaders(request);
        return next.handle(modifiedRequest).pipe(
            catchError((error) => {
                this.handleErrorResponse(error);
                throw error;
            })
        );
    }

    protected normalizeRequestHeaders(request: HttpRequest<any>): HttpRequest<any> {
        let modifiedHeaders = new HttpHeaders();
        modifiedHeaders = request.headers.set('Pragma', 'no-cache')
            .set('Cache-Control', 'no-cache')
            .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT');
        modifiedHeaders = this.addXRequestedWithHeader(modifiedHeaders);
        modifiedHeaders = this.addAuthorizationHeaders(modifiedHeaders);
        modifiedHeaders = this.addAspNetCoreCultureHeader(modifiedHeaders);
        modifiedHeaders = this.addAcceptLanguageHeader(modifiedHeaders);
        modifiedHeaders = this.addTenantIdHeader(modifiedHeaders);

        return request.clone({
            headers: modifiedHeaders
        });
    }

    protected addXRequestedWithHeader(headers: HttpHeaders): HttpHeaders {
        if (headers) {
            headers = headers.set('X-Requested-With', 'XMLHttpRequest');
        }

        return headers;
    }

    protected addAspNetCoreCultureHeader(headers: HttpHeaders): HttpHeaders {
        const cookieLangValue = this._utilsService.getCookieValue('Abp.Localization.CultureName');
        if (!cookieLangValue) {
            this._utilsService.setCookieValue('Abp.Localization.CultureName', 'es', new Date(new Date().getTime() + 5 * 365 * 86400000));
        }
        if (cookieLangValue && headers && !headers.has('.AspNetCore.Culture')) {
            headers = headers.set('.AspNetCore.Culture', cookieLangValue);
        }
        return headers;
    }

    protected addAcceptLanguageHeader(headers: HttpHeaders): HttpHeaders {
        const cookieLangValue = this._utilsService.getCookieValue('Abp.Localization.CultureName');
        if (cookieLangValue && headers && !headers.has('Accept-Language')) {
            headers = headers.set('Accept-Language', cookieLangValue);
        }

        return headers;
    }

    protected addTenantIdHeader(headers: HttpHeaders): HttpHeaders {
        const cookieTenantIdValue = this._utilsService.getCookieValue('Abp.TenantId');
        if (cookieTenantIdValue && headers && !headers.has('Abp.TenantId')) {
            headers = headers.set('Abp.TenantId', cookieTenantIdValue);
        }

        return headers;
    }

    protected addAuthorizationHeaders(headers: HttpHeaders): HttpHeaders {
        let authorizationHeaders = headers ? headers.getAll('Authorization') : null;
        if (!authorizationHeaders) {
            authorizationHeaders = [];
        }

        if (!this.itemExists(authorizationHeaders, (item: string) => item.indexOf('Bearer ') === 0)) {
            const token = this._tokenService.getToken();
            if (headers && token) {
                headers = headers.set('Authorization', 'Bearer ' + token);
            }
        }

        return headers;
    }

    protected handleErrorResponse(error: any) {
        const errorResponse = new HttpResponse({
            headers: error.headers,
            status: error.status,
            body: error.error
        });
        const ajaxResponse = this._configuration.getAbpAjaxResponseOrNull(errorResponse);
        if (ajaxResponse != null) {
            this._configuration.handleAbpResponse(errorResponse, ajaxResponse);
        } else {
            this._configuration.handleNonAbpErrorResponse(errorResponse);
        }
    }

    private itemExists<T>(items: T[], predicate: (item: T) => boolean): boolean {
        for (let i = 0; i < items.length; i++) {
            if (predicate(items[i])) {
                return true;
            }
        }
        return false;
    }
}
