import { IErrorInfo } from '../models/error-info.model';
import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { HttpResponse } from '@angular/common/http';
import { IAjaxResponse } from '../models/ajax-response.model';
import { Observable } from 'rxjs';
import { AddapptableDialogAlertComponent, AlertService } from '@addapptables/alert';

@Injectable()
export class AddapptableHttpConfiguration {

    constructor(
        private _alertService: AlertService
    ) { }

    dialog: MatDialogRef<AddapptableDialogAlertComponent>;

    defaultError = <IErrorInfo>{
        message: 'Error en petición',
        details: 'Error no se ha obtenido respuesta del servidor'
    };

    defaultError401 = <IErrorInfo>{
        message: 'You are not authenticated!',
        details: 'You should be authenticated (sign in) in order to perform this operation.'
    };

    defaultError403 = <IErrorInfo>{
        message: 'You are not authorized!',
        details: 'You are not allowed to perform this operation.'
    };

    defaultError404 = <IErrorInfo>{
        message: 'Resource not found!',
        details: 'The resource requested could not be found on the server.'
    };

    showError(error: IErrorInfo): any {
        if (error.code > 0) { return; }
        let message = '';
        if (error.details) {
            message = error.details, error.message || this.defaultError.message;
        } else {
            message = error.message || this.defaultError.message;
        }
        this.dialog && this.dialog.close();
        this.dialog = this._alertService.showError('Error', message);
    }

    handleTargetUrl(targetUrl: string): void {
        if (!targetUrl) {
            location.href = '/';
        } else {
            location.href = targetUrl;
        }
    }

    handleUnAuthorizedRequest(messagePromise: any, targetUrl?: string) {
        const self = this;

        if (messagePromise) {
            messagePromise.done(() => {
                this.handleTargetUrl(targetUrl || '/');
            });
        } else {
            self.handleTargetUrl(targetUrl || '/');
        }
    }

    handleNonAbpErrorResponse(response: HttpResponse<any>) {
        const self = this;

        switch (response.status) {
            case 401:
                self.handleUnAuthorizedRequest(
                    self.showError(self.defaultError401),
                    '/'
                );
                break;
            case 403:
                self.showError(self.defaultError403);
                break;
            case 404:
                self.showError(self.defaultError404);
                break;
            default:
                self.showError(self.defaultError);
                break;
        }
    }

    handleAbpResponse(response: HttpResponse<any>, ajaxResponse: IAjaxResponse): HttpResponse<any> {
        let newResponse: HttpResponse<any>;

        if (ajaxResponse.success) {

            newResponse = response.clone({
                body: ajaxResponse.result
            });

            if (ajaxResponse.targetUrl) {
                this.handleTargetUrl(ajaxResponse.targetUrl);
            }
        } else {

            newResponse = response.clone({
                body: ajaxResponse.result
            });

            if (!ajaxResponse.error) {
                ajaxResponse.error = this.defaultError;
            }
            this.showError(ajaxResponse.error);
            if (response.status === 401) {
                this.handleUnAuthorizedRequest(null, ajaxResponse.targetUrl);
            }
        }

        return newResponse;
    }

    getAbpAjaxResponseOrNull(response: HttpResponse<any>): IAjaxResponse | null {
        if (!response || !response.headers) {
            return null;
        }

        const contentType = response.headers.get('Content-Type');
        if (!contentType) {
            return null;
        }

        if (contentType.indexOf('application/json') < 0) {
            return null;
        }

        const responseObj = JSON.parse(JSON.stringify(response.body));
        if (!responseObj.__abp) {
            return null;
        }

        return responseObj as IAjaxResponse;
    }

    handleResponse(response: HttpResponse<any>): HttpResponse<any> {
        const ajaxResponse = this.getAbpAjaxResponseOrNull(response);
        if (ajaxResponse == null) {
            return response;
        }

        return this.handleAbpResponse(response, ajaxResponse);
    }

    blobToText(blob: any): Observable<string> {
        return new Observable<string>((observer: any) => {
            if (!blob) {
                observer.next('');
                observer.complete();
            } else {
                const reader = new FileReader();
                reader.onload = function () {
                    observer.next(this.result);
                    observer.complete();
                };
                reader.readAsText(blob);
            }
        });
    }
}
