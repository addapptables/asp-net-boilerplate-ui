import { GetPaginated } from '@redux/shared/models/get-paginated.model';

export class FindOrganizationUnitUsersDto extends GetPaginated {
    organizationUnitId: number;
    filter: string;
}
