import { IErrorInfo } from './error-info.model';

export interface IAjaxResponse<T = any> {
    success: boolean;
    result?: T;
    targetUrl?: string;
    error?: IErrorInfo;
    unAuthorizedRequest: boolean;
    __abp: boolean;
}
