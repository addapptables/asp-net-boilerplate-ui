import { IdentificationTypeEnum } from './identification-type-enum';

export class ContactDto {
    id: number;
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
