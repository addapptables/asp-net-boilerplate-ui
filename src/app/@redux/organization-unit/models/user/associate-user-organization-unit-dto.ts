import { UserMinimalDto } from '@redux/user/models/user-minimal-dto';

export class AssociateUserOrganizationUnitDto extends UserMinimalDto {
    organizationUnitId: number;
}
