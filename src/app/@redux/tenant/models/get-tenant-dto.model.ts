import { GetPaginated } from '@redux/shared/models/get-paginated.model';

export class GetTenantDto extends GetPaginated {
    keyword: string;
    isActive: boolean;
}
