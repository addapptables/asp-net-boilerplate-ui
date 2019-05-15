import { IValidationErrorInfo } from './validation-error-info.model';

export interface IErrorInfo {
    code: number;
    message: string;
    details: string;
    validationErrors: IValidationErrorInfo[];
}
