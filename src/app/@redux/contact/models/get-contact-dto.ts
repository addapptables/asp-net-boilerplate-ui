import { GetPaginated } from '@redux/shared/models/get-paginated.model';

export class GetContactDto extends GetPaginated {
    keyword: string;
    isClient: boolean;
    isSupplier: boolean;
}
