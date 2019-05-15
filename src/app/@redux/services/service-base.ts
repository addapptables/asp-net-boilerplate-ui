import { Injector } from '@angular/core';
import { ConfigurationModel } from '@addapptable/components/addapptables-boilerplate/models/configuration.model';
import { CONFIGURATION_BOILERPLATE } from '@addapptable/components/addapptables-boilerplate/tokens';
import { Observable } from 'rxjs';
import { IAjaxResponse } from '@addapptable/components/addapptables-boilerplate/models/ajax-response.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { removeEmptyOrNil } from 'src/app/shared/utils/utils';

export class ServiceApiBase {

    protected _http: HttpClient;
    protected _configuration: ConfigurationModel;
    protected _url: string;

    constructor(protected injector: Injector, apiUrl: string) {
        this._http = injector.get(HttpClient);
        this._configuration = injector.get(CONFIGURATION_BOILERPLATE);
        this._url = `${this._configuration.remoteServiceBaseUrl}/${apiUrl}`;
    }

    protected post<T>(url: string): Observable<T>;
    protected post<T, R>(url: string, params: T): Observable<R>;
    protected post<T, R>(url: string, params?: T): Observable<R> {
        const urlSend = this._url + '/' + url;
        return this._http.post<IAjaxResponse<R>>(urlSend, removeEmptyOrNil(params)).pipe(
            map(result => result.result)
        );
    }

    protected put<T>(url: string): Observable<T>;
    protected put<T, R>(url: string, params: T): Observable<R>;
    protected put<T, R>(url: string, params?: T): Observable<R> {
        const urlSend = this._url + '/' + url;
        return this._http.put<IAjaxResponse<R>>(urlSend, removeEmptyOrNil(params)).pipe(
            map(result => result.result)
        );
    }

    protected get<T>(url: string): Observable<T>;
    protected get<T, R>(url: string, params: T): Observable<R>;
    protected get<T, R>(url: string, params?: T): Observable<R> {
        const urlSend = this._url + '/' + url;
        let paramsSend;
        if (params) { paramsSend = removeEmptyOrNil(params); }
        return this._http.get<IAjaxResponse<R>>(urlSend, { params: paramsSend }).pipe(
            map(result => result.result)
        );
    }

    protected delete(url: string, id: number) {
        const urlSend = this._url + '/' + url;
        const params = { id: String(id) };
        return this._http.delete<IAjaxResponse<any>>(urlSend, { params });
    }
}
