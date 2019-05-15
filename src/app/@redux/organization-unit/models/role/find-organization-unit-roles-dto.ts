import { GetPaginated } from '@redux/shared/models/get-paginated.model';

export class FindOrganizationUnitRolesDto extends GetPaginated {
    organizationUnitId: number;
    filter: string;
}
