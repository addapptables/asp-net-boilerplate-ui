import { IdentificationTypeEnum } from './identification-type-enum';

export class CreateContactDto {
    identificationType: IdentificationTypeEnum;
    identification: string;
    names: string;
    address: string;
    email: string;
    phone: string;
    cellPhone: string;
    isClient: boolean;
    isSupplier: boolean;
}
