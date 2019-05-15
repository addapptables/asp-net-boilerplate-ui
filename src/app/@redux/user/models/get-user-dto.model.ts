import { GetPaginated } from '@redux/shared/models/get-paginated.model';

export class GetUserDto extends GetPaginated {
    keyword?: string;
    isActive?: boolean;
    RoleId?: number;
    tenantId: number;
}
